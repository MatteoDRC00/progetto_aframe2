from bottle import run, template, Bottle, static_file
from yaml import load

try:
    from yaml import CLoader as Loader
except ImportError:
    from yaml import Loader
from html import unescape
import socket
import logging

PRIMITIVES = ["box", "sphere", "plane", "sky", "entity", "camera",
              "text", "torus-knot", "ring", "light", "torus", "cylinder"]

ASSET_TYPES = ["a-asset-item", "img"]

logging.basicConfig(  # filename='logs/server.log',
    format='%(asctime)s %(levelname)-8s %(funcName)-15.15s %(lineno)-4d %(message)s',
    level=logging.DEBUG,
    datefmt='%Y-%m-%d %H:%M:%S')

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
myip = s.getsockname()[0]
s.close()
try:
    fqdn = socket.gethostbyaddr(myip)[0]
except socket.error:
    fqdn = myip
PORT = 8080
APP = Bottle()

BODY = ""


@APP.route("/info")
def info():
    return template('<p>Server <b>{{host}}</b> dimostrativo ONLINE</p>',
                    host=fqdn)


@APP.route("/")
def index():
    global BODY
    return unescape(template('static/index.tpl', body=BODY))


@APP.route("/assets/<asset_name>")
def serve_assets(asset_name):
    return static_file(asset_name, root="static/assets/")


def get_attributes(d_prim):
    # extract attributes from the d_prim dict
    out = ""
    for k, v in d_prim.items():
        if k != "entities":
            if v == "":
                out += f" {k} "
            else:
                out += f' {k}="{v}"'
        if k == "components":
            entity_html(d_prim)
    return out


def asset_html(asset):
    """
    Convert an asset dictionary to A-Frame HTML
    :param asset: dict
    :return: HTML string
    """
    a_type = next(iter(asset))
    out = f"\t<{a_type} "
    if a_type in ASSET_TYPES:
        if a_type == "img":
            out += get_attributes(asset[a_type]) + f">\n"
        else:
            out += get_attributes(asset[a_type]) + f"></{a_type}>\n"
    else:
        logging.error(f"Asset type unknown: {a_type}")
        raise ValueError(f"Asset type unknown: {a_type}")
    return out


def entity_html(entity):
    prim = next(iter(entity))
    out = f"\t<a-{prim}"
    if prim in PRIMITIVES:
        out += get_attributes(entity[prim]) + ">"
        out += f"</a-{prim}>\n"
    else:
        logging.error(f"Prim type unknown: {prim}")
        raise ValueError(f"Prim type unknown: {prim}")
    return out


# to generate certificates to use with HTTPS:
# openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

if __name__ == '__main__':
    logging.info(f"Serving from https://{fqdn}:{PORT}")
    scene_base = "scenes/scene_base.yaml"
    scenes = [scene_base]
    try:
        for scene in scenes:
            scene_yaml = open(scene, "r", encoding="utf-8").read()
            s = load(scene_yaml, Loader=Loader)
            if s["Name"] == "scene_setRoom_and_Assets":
                if "assets" in s["scene"]:
                    BODY += "\t<a-assets>\n"
                    for asset_item in s["scene"]["assets"]:
                        BODY += "\t\t" + asset_html(asset_item)
                    BODY += "\t\t</a-assets>\n\n"
                for entity in s["scene"]["entities"]:
                    BODY += "\t" + entity_html(entity)
            else:
                BODY += "\n\t\t<a-entity " + "id=\"" + s["Name"] + "\"" + " visible=\"" + s["visible"] + "\"" + ">\n"
                for entity in s["scene"]["entities"]:
                    BODY += "\t\t" + entity_html(entity)
                BODY += "\t\t</a-entity>\n"
        test = unescape(template('static/index.tpl', body=BODY))
        fout = open("static/index.html", "w", encoding="utf-8")
        fout.write(test)
        fout.close()
        run(
            app=APP,
            host='0.0.0.0', port=PORT,
            server="gunicorn",
            certfile="cert.pem",
            keyfile="key.pem",
            reloader=1,
            debug=1,
            workers="3"
        )
    except KeyError as e:
        logging.exception(e)
        exit(-1)
