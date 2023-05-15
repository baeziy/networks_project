const express = require('express');
const app = express();
const http = require('http');
const mqtt = require('mqtt');
const WebSocket = require('ws');
const Gpio = require('pigpio').Gpio;

const client = mqtt.connect('mqtt://localhost');
let fanSpeed = 'off';
let connectedClients = [];

const fan = new Gpio(18, {mode: Gpio.OUTPUT}); // Create a new instance of Gpio for the fan
fan.pwmWrite(0); // Set the fan to off at startup

client.on('connect', function () {
    client.subscribe('fan/speed');
});

client.on('message', function (topic, message) {
    if (topic === 'fan/speed') {
        fanSpeed = message.toString();
        console.log('Received fan speed: ' + fanSpeed);

        let dutyCycle;
        switch (fanSpeed) {
            case 'off':
                dutyCycle = 0;
                break;
            case 'low':
                dutyCycle = 64; // 25% of 255
                break;
            case 'medium':
                dutyCycle = 128; // 50% of 255
                break;
            case 'high':
                dutyCycle = 255; // 100% of 255
                break;
            default:
                console.log(`Invalid fan speed: ${fanSpeed}`);
                return;
        }

        fan.pwmWrite(dutyCycle);

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

    client.publish(device + '/speed', state);
    res.send('Device ' + device + ' set to ' + state);
});

const server = http.createServer(app);
server.listen(3000, '0.0.0.0', function () {
    console.log('Server is running on http://0.0.0.0:3000');
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
