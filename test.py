import RPi.GPIO as GPIO
import time

# Pin numbers for LED and fan
LED_PIN = 18
FAN_PIN = 12

GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_PIN, GPIO.OUT)
GPIO.setup(FAN_PIN, GPIO.OUT)

# PWM for controlling fan speed
pwm = GPIO.PWM(FAN_PIN, 100)
pwm.start(0)

def turn_on_led():
    GPIO.output(LED_PIN, GPIO.HIGH)

def turn_off_led():
    GPIO.output(LED_PIN, GPIO.LOW)

def set_fan_speed(speed):
    if speed == "low":
        pwm.ChangeDutyCycle(33)
    elif speed == "medium":
        pwm.ChangeDutyCycle(66)
    elif speed == "high":
        pwm.ChangeDutyCycle(100)

try:
    while True:
        # Test LED light and fan speed
        turn_on_led()
        set_fan_speed("low")
        time.sleep(5)
        turn_off_led()
        set_fan_speed("medium")
        time.sleep(5)
        turn_on_led()
        set_fan_speed("high")
        time.sleep(5)
        turn_off_led()
        set_fan_speed("low")
        time.sleep(5)

except KeyboardInterrupt:
    pwm.stop()
    GPIO.cleanup()
