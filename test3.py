import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

FAN_PIN = 18  # Connected to the SIG pin on the MOSFET module

GPIO.setup(FAN_PIN, GPIO.OUT)

# Initialize PWM with a frequency of 100 Hz
pwm = GPIO.PWM(FAN_PIN, 100)

# Start PWM with a duty cycle of 0 (fan off)
pwm.start(0)

try:
    while True:
        # Set the fan speed to 50% duty cycle and run for 5 seconds
        pwm.ChangeDutyCycle(50)
        time.sleep(5)

        # Set the fan speed to 100% duty cycle and run for 5 seconds
        pwm.ChangeDutyCycle(100)
        time.sleep(5)

        # Turn off the fan and wait for 5 seconds
        pwm.ChangeDutyCycle(0)
        time.sleep(5)

except KeyboardInterrupt:
    # Stop PWM and clean up the GPIO
    pwm.stop()
    GPIO.cleanup()
