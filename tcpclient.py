import socket

# Set up the client
TCP_IP = 'your_raspberry_pi_ip_address'  # Replace with the actual IP 
address of your Raspberry Pi
TCP_PORT = 5005
BUFFER_SIZE = 1024

# Create a socket and connect to the server
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect((TCP_IP, TCP_PORT))

while True:
    # Read user input
    message = input("Enter 'ON' to turn the LED on or 'OFF' to turn it off 
(type 'exit' to quit): ")

    if message.lower() == 'exit':
        break

    # Send the message to the server
    client_socket.send(message.encode('utf-8'))

# Close the socket
client_socket.close()

