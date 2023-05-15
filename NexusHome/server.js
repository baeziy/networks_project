const express = require('express');
const app = express();
const mqtt = require('mqtt');
const WebSocket = require('ws');

const client = mqtt.connect('mqtt://localhost');
let fanSpeed = 'off';
let connectedClients = [];

client.on('connect', function () {
    client.subscribe('fan/speed');
});

client.on('message', function (topic, message) {
    if (topic === 'fan/speed') {
        fanSpeed = message.toString();
        console.log('Received fan speed: ' + fanSpeed);
        // Adjust the fan speed here based on the received message

        // Send the updated fan speed to connected WebSocket clients
        connectedClients.forEach((client) => {
            client.send(fanSpeed);
        });
    }
});

app.use(express.static('public'));

app.get('/state/:device/:state', function (req, res) {
    const device = req.params.device;
    const state = req.params.state;

    client.publish(device, state);
    res.send('Device ' + device + ' set to ' + state);
});

const server = app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('New WebSocket client connected');
    connectedClients.push(ws);

    ws.on('message', function incoming(message) {
        console.log('Received WebSocket message:', message);
        // Handle WebSocket messages if needed
    });

    ws.on('close', function close() {
        console.log('WebSocket client disconnected');
        connectedClients = connectedClients.filter((client) => client !== ws);
    });
});
