<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Room A-Frame</title>
    <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
    <!-- Mosquitto Connection -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
    <script src="assets/mqtt.js"></script>
    <script src="assets/script.js"></script>

</head>
<body>
    <a-scene>
    {{body}}
        <a-entity id="player" position="0 0 40">
            <a-camera ></a-camera>
            <a-entity oculus-touch-controls="hand: left" thumbstick-logging></a-entity>
            <a-entity oculus-touch-controls="hand: right" thumbstick-logging></a-entity>
        </a-entity>
    </a-scene>
</body>
</html>
