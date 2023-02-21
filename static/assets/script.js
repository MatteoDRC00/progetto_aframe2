//MQTT broker settings
const HOST = '192.168.0.106';
const PORT = 9001;
const CLIENT_ID = "vr_visor";
connect_mqtt(HOST, PORT, CLIENT_ID);


document.addEventListener('DOMContentLoaded', function() {

});

AFRAME.registerComponent('thumbstick-logging',{
  init: function () {
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
  },
  logThumbstick: function (evt) {
    if (evt.detail.y > 0.95) {
        document.getElementById("text1").setAttribute("value", "UP")
        var message = new Paho.MQTT.Message("down");
        message.destinationName = "visore";
        client.send(message);
    }
    if (evt.detail.y < -0.95) {
        var message = new Paho.MQTT.Message("up");
        message.destinationName = "visore";
        client.send(message);
    }
    if (evt.detail.x < -0.95) {
        var message = new Paho.MQTT.Message("left");
        message.destinationName = "visore";
        client.send(message);
    }
    if (evt.detail.x > 0.95) {
        var message = new Paho.MQTT.Message("right");
        message.destinationName = "visore";
        client.send(message);
    }
  }
});