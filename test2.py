import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

red=12

GPIO.setup(red,GPIO.OUT)


my_pwm=GPIO.PWM(red,100)
my_pwm.start(0)

while(1):

    print ("\033c") # wis scherm
    print "\033[1;33;40mMOSFET IRF520 module aansturing dmv PWM"
    print "===========================================\033[0m"
    print ("\n\033[1;1;1mHoe snel wil je de ventilator laten draaien?")
    bright=input("Geef een (%) waarde (10-100) ")
    my_pwm.ChangeDutyCycle(bright)
my_pwm.stop()

GPIO.cleanup()

