import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)  # Use Broadcom SOC channel numbering
control_pin = 18  # Replace with the PWM-capable GPIO pin you've chosen

GPIO.setup(control_pin, GPIO.OUT)

pwm = GPIO.PWM(control_pin, 100)  # Create a PWM object with a frequency of 100 Hz
pwm.start(0)  # Start the PWM with a duty cycle of 0% (fan off)

try:
    while True:
        for duty_cycle in range(0, 101, 5):  # Ramp up from 0% to 100% in 5% increments
            pwm.ChangeDutyCycle(duty_cycle)
            time.sleep(0.5)
        for duty_cycle in range(100, -1, -5):  # Ramp down from 100% to 0% in 5% increments
            pwm.ChangeDutyCycle(duty_cycle)
            time.sleep(0.5)
except KeyboardInterrupt:
    pwm.stop()  # Stop the PWM
    GPIO.cleanup()  # Clean up the GPIO state when interrupted
