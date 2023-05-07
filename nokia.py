import time
from pcd8544 import PCD8544

# Set up the Nokia 5110 display
display = PCD8544()

# Clear the display
display.clear()

# Display a text message
display.text("Hello, Nokia 5110!", 0, 0)
display.display()

time.sleep(5)  # Keep the message displayed for 5 seconds
