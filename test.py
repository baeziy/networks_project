import RPi.GPIO as GPIO
import time

# Set the GPIO mode
GPIO.setmode(GPIO.BCM)

# Define the GPIO pins for the LED and fan
LED_PIN = 18
FAN_PIN = 12

# Set up the LED and fan pins as output
GPIO.setup(LED_PIN, GPIO.OUT)
GPIO.setup(FAN_PIN, GPIO.OUT)

# Set up PWM for the fan pin with a frequency of 25 kHz
fan_pwm = GPIO.PWM(FAN_PIN, 25000)

# Blink the LED and control the fan speed
try:
    while True:
        # Turn on the LED and set the fan speed to low (25% duty cycle)
        GPIO.output(LED_PIN, GPIO.HIGH)
        fan_pwm.start(25)
        time.sleep(2)

        # Turn off the LED and set the fan speed to medium (50% duty 
cycle)
        GPIO.output(LED_PIN, GPIO.LOW)
        fan_pwm.ChangeDutyCycle(50)
        time.sleep(2)

        # Turn on the LED and set the fan speed to high (75% duty cycle)
        GPIO.output(LED_PIN, GPIO.HIGH)
        fan_pwm.ChangeDutyCycle(75)
        time.sleep(2)

        # Turn off the LED and turn off the fan
        GPIO.output(LED_PIN, GPIO.LOW)
        fan_pwm.stop()
        time.sleep(2)

except KeyboardInterrupt:
    # Stop the fan and clean up the GPIO when the script is stopped
    fan_pwm.stop()
    GPIO.cleanup()

