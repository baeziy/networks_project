import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)  # Use Broadcom SOC channel numbering
control_pin = 18  # Replace with the PWM-capable GPIO pin you've chosen

GPIO.setup(control_pin, GPIO.OUT)

pwm = GPIO.PWM(control_pin, 100)  # Create a PWM object with a frequency of 100 Hz
pwm.start(0)  # Start the PWM with a duty cycle of 0% (fan off)

try:
    while True:
        pwm.ChangeDutyCycle(0)  # 0% duty cycle (fan off)
        time.sleep(2)  # Wait for 2 seconds

        pwm.ChangeDutyCycle(50)  # 50% duty cycle (medium speed)
        time.sleep(2)  # Wait for 2 seconds

        pwm.ChangeDutyCycle(100)  # 100% duty cycle (full speed)
        time.sleep(2)  # Wait for 2 seconds
except KeyboardInterrupt:
    pwm.stop()  # Stop the PWM
    GPIO.cleanup()  # Clean up the GPIO state when interrupted
