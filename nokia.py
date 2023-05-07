import RPi.GPIO as GPIO
import spidev
from PIL import Image, ImageDraw, ImageFont
import adafruit_pcd8544

# Parameters to Change
BORDER = 5
FONTSIZE = 10
#haha
# Use BCM pin numbering
GPIO.setmode(GPIO.BCM)

spi = spidev.SpiDev()
spi.open(0, 0)
spi.max_speed_hz = 4000000

dc = 24
cs = 8
reset_pin = 25
backlight_pin = 17

GPIO.setup(dc, GPIO.OUT)
GPIO.setup(cs, GPIO.OUT)
GPIO.setup(reset_pin, GPIO.OUT)
GPIO.setup(backlight_pin, GPIO.OUT)

display = adafruit_pcd8544.PCD8544(spi, dc, cs, reset_pin)

# Contrast and Brightness Settings
display.bias = 4
display.contrast = 60

# Turn on the Backlight LED
GPIO.output(backlight_pin, GPIO.HIGH)

# Clear display.
display.fill(0)
display.show()

# Create blank image for drawing.
# Make sure to create image with mode '1' for 1-bit color.
image = Image.new("1", (display.width, display.height))

# Get drawing object to draw on image.
draw = ImageDraw.Draw(image)

# Draw a black background
draw.rectangle((0, 0, display.width, display.height), outline=255, fill=255)

# Draw a smaller inner rectangle
draw.rectangle(
    (BORDER, BORDER, display.width - BORDER - 1, display.height - BORDER - 1),
    outline=0,
    fill=0,
)

# Load a TTF font.
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", FONTSIZE)

# Draw Some Text
text = "Hello World!"
(font_width, font_height) = font.getsize(text)
draw.text(
    (display.width // 2 - font_width // 2, display.height // 2 - font_height // 2),
    text,
    font=font,
    fill=255,
)

# Display image
display.image(image)
display.show()
