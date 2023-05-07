import board
import busio
import digitalio
from PIL import Image, ImageDraw, ImageFont
import adafruit_pcd8544

spi = busio.SPI(board.SCLK, MOSI=board.MOSI)
dc = digitalio.DigitalInOut(board.D18)  # data/command
cs = digitalio.DigitalInOut(board.CE0)  # Chip select
reset = digitalio.DigitalInOut(board.D22)  # reset

display = adafruit_pcd8544.PCD8544(spi, dc, cs, reset)

# Contrast and Brightness Settings
display.bias = 4
display.contrast = 60

# Turn on the Backlight LED
backlight = digitalio.DigitalInOut(board.D17)  # backlight
backlight.switch_to_output()
backlight.value = True

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
    (5, 5, display.width - 5 - 1, display.height - 5 - 1),
    outline=0,
    fill=0,
)

# Load a TTF font.
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 10)

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
