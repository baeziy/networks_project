# NexusHome Interface: Bridging the IoT & Networking Divide for Smarter Living

## Team Members

- Omair Ahmad
- Sarmad Sabir
- Muhammad Mustafa Kamal Malik

## Repository on GitHub (Including Code)

[https://github.com/baeziy/networks_project](https://github.com/baeziy/networks_project)

## Introduction

**(Embarking on a Journey of Advanced Home Automation)**

In a world where digitization has taken a dominant stride, the concept of a smart, interconnected home is no longer a futuristic aspiration, but a reality that we all embrace. It is in this light that we introduce the NexusHome Interface - a remarkable manifestation of advanced technology, the epitome of cutting-edge innovation, and a true companion in your home automation journey.

This breakthrough solution transcends the conventional boundaries of smart home systems, infusing the power of sophisticated protocols, state-of-the-art microcontrollers, and intuitive web interfaces into one cohesive ecosystem. Built with the potent combination of Node.js, MQTT, WebSockets, Raspberry Pi GPIO, ESP32, and BS170 N-Channel MOSFET, the NexusHome Interface redefines real-time IoT ecosystems.

This pioneering venture into home automation seamlessly merges ambient monitoring with device control, presenting users with a unique interface to modulate their surroundings according to their preference. From adjusting fan speed in sync with ambient temperature to toggling LED states to match your mood, NexusHome Interface hands the power of control back to the user.

Harness the capability to control your environment, no matter where you are within your local Wi-Fi network, with NexusHome Interface. Experience a new dimension of comfort, control, and customization, as you step into the future of home automation with us. Welcome to NexusHome Interface – a perfect harmony between advanced technology and everyday convenience.

## **System Architecture**

NexusHome Interface integrates two primary components:

1. **Raspberry Pi-Based Server Application**
2. **ESP32 IoT Device**

### **Hardware Components**

The NexusHome Interface is built upon an array of carefully selected hardware components that make the project possible. The hardware component list includes:

- **Raspberry Pi:** Serves as the primary server, hosting the application and controlling the peripherals.
- **ESP32 Microcontroller:** A powerful, Wi-Fi enabled microcontroller that captures the environmental data.
- **BS170 N-Channel MOSFET:** Used to control the fan's speed through PWM signals.
- **DHT22 Sensor:** Integrated with the ESP32 for capturing the ambient temperature and humidity.
- **Fan and LED:** The primary devices controlled by the NexusHome Interface.
- **LCD Display:** Provides real-time display of the sensor data.
- **Jumper Wires:** Used for making connections between the various hardware components.
- **Resistors:** Used to limit the current to components like LEDs.
- **Breadboards:** Serves as the platform for the temporary construction and testing of the circuit.
- **Battery:** Provides power to the fan connected in the circuit.

These components work together in harmony, creating a reliable, responsive, and efficient smart home solution that stands as a testament to the power and flexibility of IoT technology.

### **The Fan Control Mechanism: MOSFET and PWM**

In the NexusHome Interface, the fan control circuit leverages a BS170 N-Channel MOSFET in conjunction with a Raspberry Pi GPIO pin. The setup provides an efficient way to control the fan speed using PWM (Pulse Width Modulation) signals.

The drain of the MOSFET is connected to the negative terminal of the fan, forming the initial part of the low side switch configuration. The source is grounded to the negative terminal of the 9V battery, completing the switch. A resistor is connected between the MOSFET gate and the ground to protect the GPIO pin and to ensure the MOSFET switches off properly.

When a GPIO pin on the Raspberry Pi sends a PWM signal to the gate of the MOSFET, it switches on, allowing current to flow from the source (ground) to the drain (the fan's negative terminal). The duty cycle of the PWM signal determines the average voltage supplied to the fan, effectively controlling the speed of the fan.

This configuration gives the NexusHome Interface the capability to vary the fan's speed in real-time, responding to user commands or environmental changes.

### **Languages Utilized**

In the development of the NexusHome Interface, several programming languages were employed, each bringing unique capabilities to the project.

- **Node.js:** The primary language used for developing the server application. Node.js, a runtime environment, allows JavaScript to be executed server-side. Chosen for its event-driven, non-blocking I/O model, Node.js is ideal for data-intensive real-time applications running across distributed devices.
- **JavaScript:** The backbone of modern web development, JavaScript was extensively utilized on both server and client sides. On the server side, JavaScript powered the Express.js framework and managed MQTT and WebSocket connections. On the client side, JavaScript drove the dynamic web interface, enabling user interaction and real-time updates.
- **Python:** Used for initial device testing due to its simplicity and robust library support. Python's GPIO library facilitated quick tests on the Raspberry Pi. Although not part of the final application, Python's contribution to the initial development and testing stages was instrumental.
- **HTML & CSS:** The client-side interface was built with HTML and CSS. HTML, the standard markup language for creating web pages, structured the content of the web interface. CSS, the language for describing the look and formatting of a document written in HTML, styled the web interface to ensure it was user-friendly and aesthetically pleasing.
- **C++:** On the ESP32 IoT device, C++ was utilized. Known for its efficiency and control, C++ is commonly used in embedded systems like the ESP32. It was responsible for the sensor data capture and the MQTT communication in the NexusHome Interface.

By leveraging each of these languages in their appropriate contexts, we have created a robust, real-time, and user-friendly NexusHome Interface.

### **Raspberry Pi-Based Server Application**

The server application, hosted on a Raspberry Pi, is the central nexus of the NexusHome Interface. Utilizing the powerful Node.js runtime environment and Express.js framework, it provides a dynamic web interface and RESTful API, thus enabling the control of peripherals such as a fan, an LED, and an LCD display.

Key elements of the Raspberry Pi-based server application include:

- **HTTP and RESTful API:** The server employs HTTP to handle incoming requests and a RESTful API for device control, with endpoints like '/state/:device/:state' for updating the states of connected devices.
- **WebSocket Upgrade:** For real-time, bidirectional communication, HTTP connections are upgraded to WebSocket connections, keeping all connected clients synchronized with the changes in device states and sensor data.
- **MQTT and WebSockets:** MQTT provides a reliable mechanism for IoT devices, ensuring robust real-time data transmission The MQTT client at server side publishes the changed states of fan and led to the MQTT broker under the `fan/speed` and `led/state` topics. WebSockets help maintain synchronization across all user interfaces.
- **Device Control Mechanism:** The server application uses BS170 N-Channel MOSFET to control the fan's speed. It sends PWM signals to the MOSFET, which adjusts the voltage supplied to the fan, enabling multiple levels of control - off, low, medium, and high.
- **Real-Time Updates on LCD Display:** The server application dynamically displays environmental parameters on the LCD display, offering a physical, real-time update of sensor data.

### E**SP32 IoT Device**

The ESP32, a potent, feature-rich microcontroller with Wi-Fi and dual-mode Bluetooth integration, plays an instrumental role in environment sensing within the NexusHome Interface. It's outfitted with a DHT22 sensor to continuously monitor ambient temperature and humidity.

Key attributes of the ESP32 IoT device include:

- **Wi-Fi and MQTT Integration:** The ESP32 is a crucial node in the IoT network, connecting to the Wi-Fi network and interfacing with the MQTT broker for real-time data transmission.
- **Continuous Environment Monitoring:** The DHT22 sensor frequently captures the ambient temperature and humidity, relaying this data back to the server application.
- **Reliable Data Transmission:** The ESP32 publishes the captured sensor readings to the MQTT broker under the `temperature` and `humidity` topics.

## **Working Flow of the NexusHome Interface Project**

Here's the detailed sequence of operations in the NexusHome Interface project:

1. **User Interaction:** Users access the NexusHome Interface through a web browser on their device (e.g., a smartphone, tablet, or computer) by entering the IP address of the Raspberry Pi and the port number on which the server is running. The interface provides controls for adjusting the fan speed and the LED light state.
2. **HTTP Requests and WebSocket Upgrade:** Upon a user interaction with the interface (e.g., to adjust the fan speed or change the LED state), the client-side JavaScript sends an HTTP request to the server with the desired device state. The server then upgrades the HTTP connection to a WebSocket connection to enable real-time, bidirectional communication.
3. **Server Processing and MQTT Messaging:** The server, hosted on a Raspberry Pi, receives the request, processes it, and subsequently publishes an MQTT message with the updated device state to the MQTT broker.
4. **MQTT Messaging and Physical Device Control:** An MQTT client running on the server, subscribed to the relevant MQTT topics, receives the message and makes the physical changes. If the request pertains to the fan speed, the server generates a PWM signal and sends it to the MOSFET controlling the fan. For a change in LED state, the server actuates the connected LED.
5. **ESP32 Environmental Sensing and MQTT Messaging:** Concurrently, the ESP32 IoT device continuously monitors the ambient temperature and humidity using the DHT22 sensor. It publishes these sensor readings to the MQTT broker under the 'temperature' and 'humidity' topics at regular intervals.
6. **Server Updates and Real-Time Display:** The server, also subscribed to these MQTT topics, receives the environmental data and updates the interface. The server also updates the LCD display connected to the Raspberry Pi to reflect the real-time ambient conditions and device states.
7. **WebSocket Communication:** Through the WebSocket connection, the server sends the environmental data and device states to all connected clients, ensuring that all users have access to real-time, synchronized updates.
8. **User Interface Updates:** The client-side JavaScript on each connected device receives these WebSocket messages and updates the interface in real time, giving users instant feedback on their actions and the current state of the environment.

This workflow sequence repeats as long as the system is operational, ensuring a seamless, real-time, and interactive home automation experience for users.

## Concepts Applied

In the development of the NexusHome Interface project, a broad array of computing and networking concepts were applied to maximize system performance, responsiveness, and user satisfaction. Here's an overview of the key concepts employed in the NexusHome Interface project:

1. **Distributed Computing:** The NexusHome Interface uses a distributed computing approach to create a robust and scalable IoT network. By distributing processing tasks among multiple devices (the Raspberry Pi and the ESP32), the system can handle more simultaneous user interactions and sensor data streams, improving performance and responsiveness. This model also enhances reliability as the failure of one device does not halt the entire system.
2. **Parallel Computing:** The NexusHome Interface benefits from parallel computing to perform multiple tasks simultaneously, further improving system responsiveness. This concept is employed in several ways:
    - The event-driven architecture of Node.js enables it to handle numerous user requests in a non-blocking, concurrent manner.
    - The ESP32 microcontroller's dual-core processor efficiently handles both environment sensing and MQTT communication tasks, using an event-driven model to process these tasks in an interleaved manner.
3. **Internet of Things (IoT):** The foundation of the NexusHome Interface lies in IoT. The system connects various devices and sensors over the network, allowing them to communicate and work together seamlessly, providing a unified user interface.
4. **Networking:** The NexusHome Interface employs various networking protocols, like HTTP, MQTT, and WebSockets, for effective communication between devices and user interfaces. HTTP provides the basis for RESTful API and WebSocket upgrade, MQTT manages real-time IoT data transmission, and WebSockets ensure real-time, bidirectional communication between server and clients.
5. **Real-Time Systems:** The NexusHome Interface operates in real-time, continuously updating sensor data and device states on the user interface and the physical LCD display. This demands efficient task scheduling and prompt execution, crucial aspects of real-time computing.
6. **Embedded Systems:** The use of Raspberry Pi and ESP32, both of which are embedded systems, is central to the NexusHome Interface. Embedded systems provide the computational power needed for processing tasks and controlling peripherals, like the fan and LED.
7. **Web Development:** The NexusHome Interface makes use of modern web development techniques, such as JavaScript, HTML, and CSS, to provide an intuitive and user-friendly interface for controlling the smart home system.
8. **PWM and Hardware Control:** The NexusHome Interface controls the fan's speed using Pulse Width Modulation (PWM), a technique commonly used in embedded systems for controlling hardware peripherals. The use of the MOSFET to facilitate this control is a testament to effective hardware manipulation.

By incorporating these varied and complex concepts, the NexusHome Interface provides a holistic, advanced, and high-performing solution for home automation, proving that the application of advanced computing and networking concepts can yield tangible, user-friendly results in everyday life.

## **The NexusHome Experience**

NexusHome Interface elevates the smart home experience. It's more than a system—it's a custom-tailored environment at your fingertips. Whether it's adjusting the fan's speed in response to room temperature or controlling the LED's state according to your schedule, NexusHome empowers you.

With the aid of BS170 N-Channel MOSFET, you have multiple fan speed settings to ensure optimal air circulation catered to your comfort. The real-time updates of ambient conditions and state changes of your devices are not only reflected across all connected clients but also displayed on a physical LCD, keeping you informed and in control at all times.

In the realm of IoT, interconnectivity is paramount. NexusHome Interface shines in this aspect by maintaining real-time synchronization across all devices and interfaces, illustrating the power of WebSockets and MQTT in managing real-time states across multiple clients.

Overall, NexusHome Interface sets a new standard in home automation, blending the power of various technologies into a cohesive, intuitive, and responsive smart home solution. Its innovative design allows you to control the fan speed and LED light from anywhere within your local Wi-Fi network. This level of flexibility makes it a convenient and effective solution, shaping a seamless smart home experience adapted to your personal preferences. With NexusHome Interface, the control is truly in your hands, wherever you are in your home.

## Pictures (Hardare Components)

![IMG_0389.jpg](NexusHome%20Interface%20Bridging%20the%20IoT%20&%20Networking%20%202ca35d9d6faf42cc8eb88041e8164ca4/IMG_0389.jpg)

![IMG_0390.jpg](NexusHome%20Interface%20Bridging%20the%20IoT%20&%20Networking%20%202ca35d9d6faf42cc8eb88041e8164ca4/IMG_0390.jpg)

![IMG_0391.jpg](NexusHome%20Interface%20Bridging%20the%20IoT%20&%20Networking%20%202ca35d9d6faf42cc8eb88041e8164ca4/IMG_0391.jpg)

![IMG_0393.jpg](NexusHome%20Interface%20Bridging%20the%20IoT%20&%20Networking%20%202ca35d9d6faf42cc8eb88041e8164ca4/IMG_0393.jpg)

![IMG_0398.jpg](NexusHome%20Interface%20Bridging%20the%20IoT%20&%20Networking%20%202ca35d9d6faf42cc8eb88041e8164ca4/IMG_0398.jpg)

## UI (Desktop + Mob)

![Untitled](NexusHome%20Interface%20Bridging%20the%20IoT%20&%20Networking%20%202ca35d9d6faf42cc8eb88041e8164ca4/Untitled.png)

![Untitled](NexusHome%20Interface%20Bridging%20the%20IoT%20&%20Networking%20%202ca35d9d6faf42cc8eb88041e8164ca4/Untitled%201.png)

# End.
