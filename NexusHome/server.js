const express = require('express');
const app = express();
const http = require('http');
const mqtt = require('mqtt');
const WebSocket = require('ws');
const Gpio = require('pigpio').Gpio;

const client = mqtt.connect('mqtt://localhost');
let fanSpeed = 'off';
let ledState = 'off';
let connectedClients = [];

const fan = new Gpio(18, {mode: Gpio.OUTPUT}); 
const led = new Gpio(17, {mode: Gpio.OUTPUT});
fan.pwmWrite(0); 
led.digitalWrite(0);

client.on('connect', function () {
    client.subscribe('fan/speed');
    client.subscribe('led/state');
});

client.on('message', function (topic, message) {
    let msgString = message.toString();
    switch (topic) {
        case 'fan/speed':
            fanSpeed = msgString;
            handleFanSpeed(fanSpeed);
            break;
        case 'led/state':
            ledState = msgString;
            handleLedState(ledState);
            break;
    }

    broadcastMessage({fanSpeed, ledState});
});

function handleFanSpeed(speed) {
    let dutyCycle;
    switch (speed) {
        case 'off':
            dutyCycle = 0;
            break;
        case 'low':
            dutyCycle = 90; 
            break;
        case 'medium':
            dutyCycle = 128;
            break;
        case 'high':
            dutyCycle = 255; 
            break;
        default:
            console.log(`Invalid fan speed: ${speed}`);
            return;
    }
    fan.pwmWrite(dutyCycle);
}

function handleLedState(state) {
    led.digitalWrite(state === 'on' ? 1 : 0);
}

app.use(express.static('public'));

app.get('/state/:device/:state', function (req, res) {
    const device = req.params.device;
    const state = req.params.state;

    client.publish(device + '/' + (device === 'led' ? 'state' : 'speed'), state);
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
    });

    ws.on('close', function close() {
        console.log('WebSocket client disconnected');
        connectedClients = connectedClients.filter((client) => client !== ws);
    });
});

function broadcastMessage(message) {
    connectedClients.forEach((client) => {
        client.send(JSON.stringify(message));
    });
}
