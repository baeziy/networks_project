import socket

# define the IP address and port number
SERVER_IP = '0.0.0.0'
SERVER_PORT = 1234

# create a socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# bind the socket object to the IP address and port number
server_socket.bind((SERVER_IP, SERVER_PORT))

# listen for incoming connections
server_socket.listen()

# accept the connection
client_socket, client_address = server_socket.accept()

# receive data from the client
data = client_socket.recv(1024)

# print the received data
print("Received data:", data.decode())

# close the connection
client_socket.close()
server_socket.close()
