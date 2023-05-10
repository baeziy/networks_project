import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)  # Use Broadcom SOC channel numbering
control_pin = 18  # Replace with the GPIO pin you've chosen

GPIO.setup(control_pin, GPIO.OUT)

try:
    while True:
        GPIO.output(control_pin, GPIO.HIGH)  # Turn on the MOSFET
        time.sleep(1)  # Wait for 1 second
        GPIO.output(control_pin, GPIO.LOW)  # Turn off the MOSFET
        time.sleep(1)  # Wait for 1 second
except KeyboardInterrupt:
    GPIO.cleanup()  # Clean up the GPIO state when interrupted
