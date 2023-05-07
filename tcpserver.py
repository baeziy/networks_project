import socket
import RPi.GPIO as GPIO

# Set up the GPIO pin for the LED
LED_PIN = 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_PIN, GPIO.OUT)

# Set up the server
TCP_IP = '0.0.0.0'
TCP_PORT = 5005
BUFFER_SIZE = 1024

# Create a socket and bind it to the IP and port
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((TCP_IP, TCP_PORT))

# Start listening for connections
server_socket.listen(1)

print("Server is ready to receive connections...")

while True:
    # Accept a connection from a client
    conn, addr = server_socket.accept()
    print("Connection from:", addr)

    while True:
        # Receive a message from the client
        data = conn.recv(BUFFER_SIZE)
        if not data:
            break

        message = data.decode('utf-8')
        print("Received message:", message)

        if message == "ON":
            GPIO.output(LED_PIN, GPIO.HIGH)
        elif message == "OFF":
            GPIO.output(LED_PIN, GPIO.LOW)

    # Close the connection
    conn.close()

# Clean up GPIO and close the socket (unreachable in this example)
GPIO.cleanup()
server_socket.close()

