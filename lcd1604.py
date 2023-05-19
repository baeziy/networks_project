from RPLCD.gpio import CharLCD
import RPi.GPIO as GPIO

# Define GPIO mode
GPIO.setmode(GPIO.BCM)

# Create an LCD object
lcd = CharLCD(pin_rs=26, pin_e=19, pins_data=[13, 6, 5, 11],
             numbering_mode=GPIO.BCM, cols=16, rows=4, dotsize=8,
             charmap='A02', auto_linebreaks=True)

# Write a string on the first line of the display
lcd.write_string('Hello, world!')
