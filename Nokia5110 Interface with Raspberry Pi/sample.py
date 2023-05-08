'''
	Nokia5110 LCD Display Interface with Raspberry Pi
	http://www.electronicwings.com
'''
import time
import Adafruit_Nokia_LCD as LCD
import Adafruit_GPIO.SPI as SPI

from PIL import ImageDraw
from PIL import Image
from PIL import ImageFont


# Raspberry Pi hardware SPI config:
DC = 23
RST = 24
SPI_PORT = 0
SPI_DEVICE = 0


# Hardware SPI usage:
disp = LCD.PCD8544(DC, RST, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=4000000))

# Initialize library.
disp.begin(contrast=40)

# Clear display.
disp.clear()
disp.display()

font = ImageFont.load_default()

# Load image and convert to 1 bit color.
image = Image.new('1', (LCD.LCDWIDTH, LCD.LCDHEIGHT))
draw = ImageDraw.Draw(image)
draw.rectangle((0,0,LCD.LCDWIDTH,LCD.LCDHEIGHT), outline=255, fill=255)
draw.text((3,24), 'Welcome to EW', font=font)

#Display Image
disp.image(image)
disp.display()
time.sleep(1.0)

image = Image.open('pi_logo.png').convert('1')

# Display image.
disp.image(image)
disp.display()
time.sleep(0.5)

print('Press Ctrl-C to quit.')
while True:
    
#Create animation of Flying Bird
    
    image2 = Image.open('bird_1.png').convert('1')
    # Display image.
    disp.image(image2)
    disp.display()
    time.sleep(0.1)
    
    image2 = Image.open('bird_2.png').convert('1')
    # Display image.
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_3.png').convert('1')
    # Display image.
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_4.png').convert('1')
    # Display image.
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_5.png').convert('1')
    # Display image.
    disp.image(image2)
    disp.display()

    image2 = Image.open('bird_4.png').convert('1')
    # Display image.
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_3.png').convert('1')
    # Display image.
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_2.png').convert('1')
    # Display image.
    disp.image(image2)
    disp.display()    
    time.sleep(0.1)
    



    
