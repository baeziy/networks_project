// Connect to WebSocket
const ws = new WebSocket('ws://raspberrypi.local:3000');

// Send fan speed to server when button is clicked
document.querySelectorAll('.fan-speed-button').forEach(button => {
    button.addEventListener('click', () => {
        const speed = button.dataset.speed;
        ws.send(speed);
    });
});
