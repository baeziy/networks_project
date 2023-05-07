import socket

host = '192.168.18.70'  # IP address of machine B
port = 1234  # Port number to test the connection on

try:
    # create a socket object and connect to the server
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, port))
    print(f"Connection to {host}:{port} successful!")
    
    # send a test message to the server
    message = "Hello from machine A"
    sock.sendall(message.encode())
    print(f"Sent message: {message}")
    
    # receive the server's response and print it
    data = sock.recv(1024)
    print(f"Received response: {data.decode()}")
    
    # close the socket connection
    sock.close()
    
except ConnectionRefusedError:
    print(f"Connection to {host}:{port} refused.")
except Exception as e:
    print(f"An error occurred: {e}")
