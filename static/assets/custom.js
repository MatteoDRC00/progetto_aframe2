AFRAME.registerComponent("add_texture_objects", {
    init: function (){
        this.el.addEventListener("click", e =>{
            let entity = document.getElementById(this.el.getAttribute("id"))
            if (entity.getAttribute("id") === "vase" || entity.getAttribute("id") === "flower") {
                let fiori = document.getElementById("flower")
                let vaso = document.getElementById("vase")
                vaso.setAttribute("material", "src: #vaso")
                fiori.setAttribute("material", "src: #fiori")
            } else if (entity.getAttribute("id") === "tavolo_1" || entity.getAttribute("id") === "tavolo_2" || entity.getAttribute("id") === "tavolo_3") {
                let tavolo_1 = document.getElementById("tavolo_1")
                let tavolo_2 = document.getElementById("tavolo_2")
                let tavolo_3 = document.getElementById("tavolo_3")
                tavolo_1.setAttribute("material", "src: #table")
                tavolo_2.setAttribute("material", "src: #table")
                tavolo_3.setAttribute("material", "src: #table")
            } else if (entity.getAttribute("id") === "picture") {
                entity.setAttribute("material", "src: #quadro")
            } else if (entity.getAttribute("id") === "carpet") {
                entity.setAttribute("material", "src: #tappeto")
            } else if (entity.getAttribute("id") === "bookshelf" || entity.getAttribute("id") === "book") {
                let libreria = document.getElementById("bookshelf")
                let libri = document.getElementById("book")
                libreria.setAttribute("material", "src: #libreria")
                libri.setAttribute("material", "src: #libri")
            } else if (entity.getAttribute("id") === "poltrona_box") {
                let box = document.getElementById("poltrona_box")
                let poltrona = document.getElementById("poltrona")
                box.setAttribute("geometry", "primitive: box; width: 0; depth: 0; height: 0")
                poltrona.setAttribute("scale", "0.04 0.04 0.04")
            } else if (entity.getAttribute("id") === "window") {
                entity.setAttribute("material", "src: #finestra")
            } else if (entity.getAttribute("id") === "letto_box") {
                let box = document.getElementById("letto_box")
                let letto = document.getElementById("letto")
                box.setAttribute("geometry", "primitive: box; width: 0; depth: 0; height: 0")
                letto.setAttribute("scale", "0.04 0.04 0.04")
            } else if (entity.getAttribute("id") === "tv") {
                entity.setAttribute("material", "src: #televisione")
            } else if (entity.getAttribute("id") === "sedia_box") {
                let box = document.getElementById("sedia_box")
                let sedia = document.getElementById("sedia")
                box.setAttribute("geometry", "primitive: box; width: 0; depth: 0; height: 0")
                sedia.setAttribute("scale", "0.55 0.55 0.55")
            }
        })
    }
})

AFRAME.registerComponent("change_mesh", {
    init: function (){
        this.el.addEventListener("click", e =>{
            let entity = document.getElementById(this.el.getAttribute("id"))
            if (entity.getAttribute("id") === "person1"){
                let first = document.getElementById("person1")
                let eye1 = document.getElementById("eye1_person1")
                let eye2 = document.getElementById("eye2_person1")
                let face = document.getElementById("face_person1")
                let hair = document.getElementById("hair_person1")
                let mustache = document.getElementById("mustache_person1")
                let body = document.getElementById("person1_next")
                let tshirt = document.getElementById("tshirt_person1")
                let jeans = document.getElementById("jeans_person1")
                let shoes = document.getElementById("shoes_person1")
                let watch = document.getElementById("watch_person1")
                if (shoes.getAttribute("visible")){
                    watch.setAttribute("visible", "true")
                } else if (tshirt.getAttribute("visible")){
                    shoes.setAttribute("visible", "true")
                } else if (body.getAttribute("visible")){
                    tshirt.setAttribute("visible", "true")
                    jeans.setAttribute("visible", "true")
                } else if (mustache.getAttribute("visible")){
                    body.setAttribute("visible", "true")
                    first.setAttribute("visible", "false")
                } else if (hair.getAttribute("visible")){
                    mustache.setAttribute("visible", "true")
                } else if (eye1.getAttribute("visible")){
                    hair.setAttribute("visible", "true")
                } else if (face.getAttribute("visible")){
                    eye1.setAttribute("visible", "true")
                    eye2.setAttribute("visible", "true")
                } else {
                    face.setAttribute("visible", "true")
                }
            } else if(entity.getAttribute("id") === "person2"){
                let first = document.getElementById("person2")
                let eye1 = document.getElementById("eye1_person2")
                let eye2 = document.getElementById("eye2_person2")
                let face = document.getElementById("face_person2")
                let lips = document.getElementById("lips_person2")
                let body = document.getElementById("person2_next")
                let hair = document.getElementById("hair_person2")
                let dress = document.getElementById("dress_person2")
                let shoes = document.getElementById("shoes_person2")
                let glasses = document.getElementById("glasses_person2")
                if (shoes.getAttribute("visible")){
                    glasses.setAttribute("visible", "true")
                } else if (dress.getAttribute("visible")){
                    shoes.setAttribute("visible", "true")
                } else if (body.getAttribute("visible")){
                    dress.setAttribute("visible", "true")
                } else if (lips.getAttribute("visible")){
                    body.setAttribute("visible", "true")
                    first.setAttribute("visible", "false")
                } else if (hair.getAttribute("visible")){
                    lips.setAttribute("visible", "true")
                } else if (eye1.getAttribute("visible")){
                    hair.setAttribute("visible", "true")
                } else if (face.getAttribute("visible")){
                    eye1.setAttribute("visible", "true")
                    eye2.setAttribute("visible", "true")
                } else {
                    face.setAttribute("visible", "true")
                }
            }
        })
    }
})

function goToSceneBase() {
    document.getElementById('scene_base').setAttribute('visible', 'true')
    document.getElementById('scene_objects').setAttribute('visible', 'false')
    document.getElementById('scene_people').setAttribute('visible', 'false')
    document.getElementById("prima").setAttribute("class", "clickable")
    document.getElementById("seconda").setAttribute("class", "clickable")
    document.getElementById("terza").setAttribute("class", "clickable")
    document.getElementById("camera").setAttribute("position", "0 0 40")
}

function goToSceneObjects() {
    document.getElementById('scene_base').setAttribute('visible', 'false')
    document.getElementById('scene_objects').setAttribute('visible', 'true')
    document.getElementById("seconda").setAttribute("class", "")
    document.getElementById("terza").setAttribute("class", "")
}

function goToSceneObjectsSettings() {
    document.getElementById('scene_base').setAttribute('visible', 'false')
}

function goToScenePeople() {
    document.getElementById('scene_base').setAttribute('visible', 'false')
    document.getElementById('scene_people').setAttribute('visible', 'true')
    document.getElementById("prima").setAttribute("class", "")
    document.getElementById("terza").setAttribute("class", "")
}

AFRAME.registerComponent("show_menu", {
    init: function (){
        this.el.addEventListener('click', (event) => {
            console.log(this.el.getAttribute("id"))
            let camera = document.getElementById("camera")
            let x = camera.getAttribute("position")["x"]
            let y = camera.getAttribute("position")["y"]
            let z = camera.getAttribute("position")["z"]
            let z_new = z - 6
            let menu_position = x + " " + y + " " + z_new
            let menu = document.getElementById("menu")
            let name = document.getElementById("name")
            menu.setAttribute("visible", "true")
            menu.setAttribute("position", menu_position)
            name.setAttribute("value", this.el.getAttribute("id"))
        })
    }
})

var livello = null;


AFRAME.registerComponent("selezionato", {
    init: function (){
        this.el.addEventListener("click", e =>{
            let livello1 = document.getElementById("livello1")
            let livello2 = document.getElementById("livello2")
            let livello3 = document.getElementById("livello3")
            let livello4 = document.getElementById("livello4")
            livello1.setAttribute("material", "color: blue")
            livello2.setAttribute("material", "color: blue")
            livello3.setAttribute("material", "color: blue")
            livello4.setAttribute("material", "color: blue")
            this.el.setAttribute("material", "color: yellow")
            console.log(livello)
            livello = this.el.getAttribute("id")

        })
    }
})


AFRAME.registerComponent("conferma", {
    init: function (){
        window.addEventListener('contextmenu', (event) => {

            alert('mouse right-clicked');

        });
    }
})

AFRAME.registerComponent('thumbstick-logging',{
  init: function () {
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
  },
  logThumbstick: function (evt) {
    if (evt.detail.y > 0.95) {}
    if (evt.detail.y < -0.95) { document.getElementById("text1").setAttribute("value", "UP")}
    if (evt.detail.x < -0.95) { document.getElementById("text1").setAttribute("value", "LEFT") }
    if (evt.detail.x > 0.95) { document.getElementById("text1").setAttribute("value", "RIGHT")}
  }
});

