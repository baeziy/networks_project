import RPi.GPIO as GPIO
import time

# Set the GPIO mode and warning settings
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Set the GPIO pin number for the LED
led_pin = 17

# Set up the GPIO pin as an output
GPIO.setup(led_pin, GPIO.OUT)

# Function to turn the LED on
def turn_on_led():
    GPIO.output(led_pin, GPIO.HIGH)
    print("LED is ON")

# Function to turn the LED off
def turn_off_led():
    GPIO.output(led_pin, GPIO.LOW)
    print("LED is OFF")

# Main program loop
while True:
    user_input = input("Enter 'on' to turn on the LED, 'off' to turn it off, or 'quit' to exit: ")

    if user_input == "on":
        turn_on_led()
    elif user_input == "off":
        turn_off_led()
    elif user_input == "quit":
        break
    else:
        print("Invalid input. Please try again.")

# Clean up GPIO settings
GPIO.cleanup()
