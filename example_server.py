import socket

host = '0.0.0.0'  # listen on all available network interfaces
port = 1234  # Port number to test the connection on

try:
    # create a socket object and bind it to the specified port
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((host, port))
    
    # listen for incoming connections (maximum 1 connection at a time)
    sock.listen(1)
    print(f"Server listening on {host}:{port}")
    
    # wait for a client to connect and accept the connection
    conn, addr = sock.accept()
    print(f"Connected by {addr}")
    
    # receive the client's message and print it
    data = conn.recv(1024)
    print(f"Received message: {data.decode()}")
    
    # send a response to the client
    response = "Hello from machine B"
    conn.sendall(response.encode())
    print(f"Sent response: {response}")
    
    # close the socket connection
    conn.close()
    
except Exception as e:
    print(f"An error occurred: {e}")
