import RPi.GPIO as GPIO
import socket
import time

# GPIO setup
GPIO.setmode(GPIO.BCM)
control_pin = 18
GPIO.setup(control_pin, GPIO.OUT)
pwm = GPIO.PWM(control_pin, 100)
pwm.start(0)

# TCP server setup
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(('0.0.0.0', 12345))  # Replace 12345 with the desired port number
server_socket.listen(1)

def handle_client(client_socket):
    while True:
        data = client_socket.recv(1024)
        if not data:
            break

        duty_cycle = int(data)
        if 0 <= duty_cycle <= 100:
            pwm.ChangeDutyCycle(duty_cycle)
            client_socket.sendall(b'Speed changed')
        else:
            client_socket.sendall(b'Invalid duty cycle')

    client_socket.close()

try:
    while True:
        print('Waiting for connection...')
        client_socket, client_address = server_socket.accept()
        print(f'Connected to {client_address}')
        handle_client(client_socket)

except KeyboardInterrupt:
    pwm.stop()
    GPIO.cleanup()
    server_socket.close()
