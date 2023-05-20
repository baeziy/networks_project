const express = require('express');
const app = express();
const http = require('http');
const mqtt = require('mqtt');
const WebSocket = require('ws');
const Gpio = require('pigpio').Gpio;

const client = mqtt.connect('mqtt://localhost');
if(client){
    console.log("MQTT connected");
}
let fanSpeed = 'off';
let ledState = 'off';
let temperature = '';
let humidity = '';
let connectedClients = [];

const fan = new Gpio(18, {mode: Gpio.OUTPUT}); 
const led = new Gpio(17, {mode: Gpio.OUTPUT});
fan.pwmWrite(0); 
led.digitalWrite(0);

client.on('connect', function () {
    client.subscribe('fan/speed');
    client.subscribe('led/state');
    client.subscribe('temperature');  // subscribe to temperature topic
    client.subscribe('humidity');     // subscribe to humidity topic
});

client.on('message', function (topic, message) {
    let msgString = message.toString();
    console.log(`Received MQTT message on topic "${topic}": ${msgString}`);
    switch (topic) {
        case 'fan/speed':
            fanSpeed = msgString;
            handleFanSpeed(fanSpeed);
            break;
        case 'led/state':
            ledState = msgString;
            handleLedState(ledState);
            break;
        case 'temperature':
            temperature = msgString;
            break;
        case 'humidity':
            humidity = msgString;
            break;

    }
});

function handleFanSpeed(speed) {
    let dutyCycle;
    switch (speed) {
        case 'off':
            dutyCycle = 0;
            break;
        case 'low':
            dutyCycle = 120; 
            break;
        case 'medium':
            dutyCycle = 160;
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

    // Only publish new state if it is different from current state
    if ((device === 'fan' && state !== fanSpeed) || (device === 'led' && state !== ledState)) {
        client.publish(device + '/' + (device === 'led' ? 'state' : 'speed'), state);
    }

    // Update the internal state variables
    if (device === 'fan') {
        fanSpeed = state;
    } else if (device === 'led') {
        ledState = state;
    }

    // Broadcast the new state to all connected WebSocket clients   
    broadcastMessage({fanSpeed, ledState, temperature, humidity}); // updated to include temperature and humidity

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
