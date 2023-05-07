import board
import busio
import digitalio
from adafruit_pcd8544 import PCD8544

# Set up the SPI bus
spi = busio.SPI(board.SCLK, MOSI=board.MOSI)
cs = digitalio.DigitalInOut(board.CE0)  # Chip Select
dc = digitalio.DigitalInOut(board.D23)  # Data/Command
rst = digitalio.DigitalInOut(board.D24)  # Reset

# Initialize the Nokia 5110 display
display = PCD8544(spi, cs, dc, rst)

# Clear the display
display.fill(0)
display.show()

# Display a text message
display.text("Hello, Nokia 5110!", 0, 0, 1)
display.show()
