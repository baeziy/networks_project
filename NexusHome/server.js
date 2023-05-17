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

const fan = new Gpio(18, {mode: Gpio.OUTPUT}); // Create a new instance of Gpio for the fan
const led = new Gpio(17, {mode: Gpio.OUTPUT});
fan.pwmWrite(0); // Set the fan to off at startup
led.digitalWrite(0); // set the LED to off at startup

client.on('connect', function () {
    client.subscribe('fan/speed');
    client.subscribe('led/state'); // subscribe to LED state topic
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
                dutyCycle = 90; // 25% of 255
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
    else if (topic === 'led/state') { // new block to handle LED messages
        ledState = message.toString();
        console.log('Received LED state: ' + ledState);

        switch (ledState) {
            case 'off':
                led.digitalWrite(0);
                break;
            case 'on':
                led.digitalWrite(1);
                break;
            default:
                console.log(`Invalid LED state: ${ledState}`);
                return;
        }
         // Send the updated LED state to connected WebSocket clients
         connectedClients.forEach((client) => {
            client.send(JSON.stringify({device: 'led', state: ledState}));
        });
    }
});

app.use(express.static('public'));

app.get('/state/:device/:state', function (req, res) {
    const device = req.params.device;
    const state = req.params.state;

    if (device === 'led') {
        client.publish(device + '/state', state); // use '/state' for LED
    } else {
        client.publish(device + '/speed', state); // use '/speed' for fan
    }
    
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
