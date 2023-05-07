import socket

# define the IP address and port number
SERVER_IP = '192.168.18.70'
SERVER_PORT = 1234

# create a socket object
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# connect to the server
client_socket.connect((SERVER_IP, SERVER_PORT))

# send data to the server
data = "Hello from PC".encode()
client_socket.sendall(data)

# close the connection
client_socket.close()
