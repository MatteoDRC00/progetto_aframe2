let client;

function connect_mqtt(HOST, PORT, CLIENT_ID) {
    client = new Paho.MQTT.Client(HOST, PORT, CLIENT_ID);
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    let options = {
        useSSL: true,
        onSuccess: onConnect
    }
    // connect the client
    client.connect(options);
}

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Connected to MQTT broker");
    client.subscribe("visore")
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection lost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    //
}