from luma.core.interface.serial import spi
from luma.core.render import canvas
from luma.lcd.device import pcd8544

# Set up the SPI bus
serial = spi(port=0, device=0, gpio_DC=23, gpio_RST=24)

# Initialize the Nokia 5110 display
device = pcd8544(serial)

# Clear the display
device.clear()

# Display a text message
with canvas(device) as draw:
    draw.text((0, 0), "Hello, Nokia 5110!", fill="white")
