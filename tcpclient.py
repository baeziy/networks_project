import socket

server_ip = '172.30.64.37'
server_port = 12346

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect((server_ip, server_port))

while True:
    try:
        duty_cycle = int(input('Enter duty cycle (0-100): '))
        if 0 <= duty_cycle <= 100:
            client_socket.sendall(str(duty_cycle).encode())
            response = client_socket.recv(1024)
            print(response.decode())
        else:
            print('Invalid duty cycle')
    except ValueError:
        print('Invalid input')
    except KeyboardInterrupt:
        break

client_socket.close()
