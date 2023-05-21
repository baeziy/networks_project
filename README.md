# NexusHome Interface - Project Documentation

NexusHome Interface is a pioneering home automation and environment monitoring solution that merges advanced technologies including Node.js, MQTT, WebSockets, Raspberry Pi GPIO, ESP32, and BS170 N-Channel MOSFET. This blend crafts a real-time IoT ecosystem, offering robust control over a diverse range of devices and environmental monitoring capabilities.

## System Architecture 

NexusHome Interface integrates two primary components:

1. **Raspberry Pi-Based Server Application**
2. **ESP32 IoT Device**

### Hardware Components
The NexusHome Interface is built upon an array of carefully selected hardware components that make the project possible. The hardware component list includes:

1. Raspberry Pi: Serves as the primary server, hosting the application and controlling the peripherals.

2. ESP32 Microcontroller: A powerful, Wi-Fi enabled microcontroller that captures the environmental data.

3. BS170 N-Channel MOSFET: Used to control the fan's speed through PWM signals.

4. DHT22 Sensor: Integrated with the ESP32 for capturing the ambient temperature and humidity.

5. Fan and LED: The primary devices controlled by the NexusHome Interface.

6. LCD Display: Provides real-time display of the sensor data.

7. Jumper Wires: Used for making connections between the various hardware components.

8. Resistors: Used to limit the current to components like LEDs.

9. Breadboards: Serves as the platform for the temporary construction and testing of the circuit.

10. Battery: Provides power to the fan connected in the circuit.

These components work together in harmony, creating a reliable, responsive, and efficient smart home solution that stands as a testament to the power and flexibility of IoT technology.

### The Fan Control Mechanism: MOSFET and PWM

In the NexusHome Interface, the fan control circuit leverages a BS170 N-Channel MOSFET in conjunction with a Raspberry Pi GPIO pin. The setup provides an efficient way to control the fan speed using PWM (Pulse Width Modulation) signals.

The drain of the MOSFET is connected to the negative terminal of the fan, forming the initial part of the low side switch configuration. The source is grounded to the negative terminal of the 9V battery, completing the switch. A resistor is connected between the MOSFET gate and the ground to protect the GPIO pin and to ensure the MOSFET switches off properly.

When a GPIO pin on the Raspberry Pi sends a PWM signal to the gate of the MOSFET, it switches on, allowing current to flow from the source (ground) to the drain (the fan's negative terminal). The duty cycle of the PWM signal determines the average voltage supplied to the fan, effectively controlling the speed of the fan.

This configuration gives the NexusHome Interface the capability to vary the fan's speed in real-time, responding to user commands or environmental changes.

### Languages Utilized
In the development of the NexusHome Interface, several programming languages were employed, each bringing unique capabilities to the project.

1. Node.js: The primary language used for developing the server application. Node.js, a runtime environment, allows JavaScript to be executed server-side. Chosen for its event-driven, non-blocking I/O model, Node.js is ideal for data-intensive real-time applications running across distributed devices.

2. JavaScript: The backbone of modern web development, JavaScript was extensively utilized on both server and client sides. On the server side, JavaScript powered the Express.js framework and managed MQTT and WebSocket connections. On the client side, JavaScript drove the dynamic web interface, enabling user interaction and real-time updates.

3. Python: Used for initial device testing due to its simplicity and robust library support. Python's GPIO library facilitated quick tests on the Raspberry Pi. Although not part of the final application, Python's contribution to the initial development and testing stages was instrumental.

4. HTML & CSS: The client-side interface was built with HTML and CSS. HTML, the standard markup language for creating web pages, structured the content of the web interface. CSS, the language for describing the look and formatting of a document written in HTML, styled the web interface to ensure it was user-friendly and aesthetically pleasing.

5. C++: On the ESP32 IoT device, C++ was utilized. Known for its efficiency and control, C++ is commonly used in embedded systems like the ESP32. It was responsible for the sensor data capture and the MQTT communication in the NexusHome Interface.

By leveraging each of these languages in their appropriate contexts, we have created a robust, real-time, and user-friendly NexusHome Interface.

### Raspberry Pi-Based Server Application

The server application, hosted on a Raspberry Pi, is the central nexus of the NexusHome Interface. Utilizing the powerful Node.js runtime environment and Express.js framework, it provides a dynamic web interface and RESTful API, thus enabling the control of peripherals such as a fan, an LED, and an LCD display.

Key elements of the Raspberry Pi-based server application include:

* **HTTP and RESTful API:** The server employs HTTP to handle incoming requests and a RESTful API for device control, with endpoints like '/state/:device/:state' for updating the states of connected devices.

* **WebSocket Upgrade:** For real-time, bidirectional communication, HTTP connections are upgraded to WebSocket connections, keeping all connected clients synchronized with the changes in device states and sensor data.

* **MQTT and WebSockets:** MQTT provides a reliable mechanism for IoT devices, ensuring robust real-time data transmission. WebSockets help maintain synchronization across all user interfaces.

* **Device Control Mechanism:** The server application uses BS170 N-Channel MOSFET to control the fan's speed. It sends PWM signals to the MOSFET, which adjusts the voltage supplied to the fan, enabling multiple levels of control - off, low, medium, and high.

* **Real-Time Updates on LCD Display:** The server application dynamically displays environmental parameters on the LCD display, offering a physical, real-time update of sensor data.

### ESP32 IoT Device

The ESP32, a potent, feature-rich microcontroller with Wi-Fi and dual-mode Bluetooth integration, plays an instrumental role in environment sensing within the NexusHome Interface. It's outfitted with a DHT22 sensor to continuously monitor ambient temperature and humidity.

Key attributes of the ESP32 IoT device include:

* **Wi-Fi and MQTT Integration:** The ESP32 is a crucial node in the IoT network, connecting to the Wi-Fi network and interfacing with the MQTT broker for real-time data transmission.

* **Continuous Environment Monitoring:** The DHT22 sensor frequently captures the ambient temperature and humidity, relaying this data back to the server application.

* **Reliable Data Transmission:** The ESP32 publishes the captured sensor readings to the MQTT broker under the 'temperature' and 'humidity' topics.

## The NexusHome Experience

NexusHome Interface elevates the smart home experience. It's more than a system—it's a custom-tailored environment at your fingertips. Whether it's adjusting the fan's speed in response to room temperature or controlling the LED's state according to your schedule, NexusHome empowers you.

With the aid of BS170 N-Channel MOSFET, you have multiple fan speed settings to ensure optimal air circulation catered to your comfort. The real-time updates of ambient conditions and state changes of your devices are not only reflected across all connected clients but also displayed on a physical LCD, keeping you informed and in control at all times.

In the realm of IoT, interconnectivity is paramount. NexusHome Interface shines in this aspect by maintaining real-time synchronization across all devices and interfaces, illustrating the power of WebSockets and MQTT in managing real-time states across multiple clients.

Overall, NexusHome Interface sets a new standard in home automation, blending the power of various technologies into a cohesive, intuitive, and responsive smart home solution. Its innovative design allows you to control the fan speed and LED light from anywhere within your local Wi-Fi network. This level of flexibility makes it a convenient and effective solution, shaping a seamless smart home experience adapted to your personal preferences. With NexusHome Interface, the control is truly in your hands, wherever you are in your home.