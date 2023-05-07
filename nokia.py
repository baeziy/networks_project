import board
import busio
import digitalio
from adafruit_pcd8544 import PCD8544

# Set up SPI and GPIO pins
spi = busio.SPI(board.SCK, MOSI=board.MOSI)
dc = digitalio.DigitalInOut(board.D5)
cs = digitalio.DigitalInOut(board.D6)
reset = digitalio.DigitalInOut(board.D13)

# Set up the display
display = PCD8544(spi, dc, cs, reset)

# Clear the display
display.fill(0)
display.show()

# Draw text
display.text("LED Status: ON", 0, 0, 1)

# Update the display
display.show()
