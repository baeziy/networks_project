const socket = new WebSocket('ws://192.168.18.70:3000');

socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);

    if (data.device === 'fan') {
        document.getElementById("mode").innerHTML = data.state.toUpperCase();
        console.log('New fan speed:', data.state);
    }
    else if (data.device === 'led') {
        const ledState = data.state === 'on' ? 'ON' : 'OFF';
        document.getElementById("switch").innerHTML = ledState;
        document.getElementById("light").className = data.state;
        console.log('New LED state:', data.state);
    }
});

var speed = 0;
var prev_speed = 0;
var currentScale = 1;

function state()
{
    let state = 'off'

    if (speed > 0 && speed <= 50) 
    {
        document.getElementById("mode").innerHTML = "LOW"
        state = 'low';
    }

    else if (speed > 50 && speed <= 120) 
    {
        document.getElementById("mode").innerHTML = "MED"
        state = 'medium';
    }

    else if (speed > 120) 
    {
        document.getElementById("mode").innerHTML = "HIGH"
        state = 'high';
    }

    else
    {
        document.getElementById("mode").innerHTML = "OFF"
    }

    sendFanSpeed(state);

}

function sendFanSpeed(speed) {
    fetch('/state/fan/' + speed)
        .then((response) => {
            return response.text();
        })
        .then((text) => console.log(text))
    }

function killswitch()
{
    if (speed > 0)
    {
        while (speed != 0) 
        {
            speed = speed - 10;
            addClass();
            changeActive();
            currentScale = currentScale - 1;
        }
        document.getElementById("state_off").innerHTML = "Fan Off"
        document.getElementById("mode").innerHTML = "OFF"
    }

    document.getElementById("switch").className = "red"
    document.getElementById("switch").innerHTML = "OFF"
    document.getElementById("light").className = "dark"

    sendFanSpeed('off');
    sendLedState('off');

}

function sendLedState(state) {
    fetch('/state/led/' + state)
        .then((response) => {
            return response.text();
        })
        .then((text) => console.log(text))
}

function increase()
{
    if (speed < 180)
    {
        if (speed == 0)
        {
            while (speed != 50) 
            {
                speed = speed + 10;
                addClass();
                currentScale = currentScale + 1;
                changeActive();
            }
        }

        else if (speed == 50)
        {
            while (speed != 120) 
            {
                speed = speed + 10;
                addClass();
                currentScale = currentScale + 1;
                changeActive();
            }
        }

        else if (speed == 120)
        {
            while (speed != 180) 
            {
                speed = speed + 10;
                addClass();
                currentScale = currentScale + 1;
                changeActive();
            }
        }

        if (speed > 0)
        {
            document.getElementById("state_off").innerHTML = "Decrease Speed"
        }

        state()

    }
}

function decrease()
{
    if (speed > 0)
    {
        if (speed == 50)
        {
            while (speed != 0) 
            {
                speed = speed - 10;
                addClass();
                changeActive();
                currentScale = currentScale - 1;
            }
        }

        else if (speed == 120)
        {
            while (speed != 50) 
            {
                speed = speed - 10;
                addClass();
                changeActive();
                currentScale = currentScale - 1;
            }
        }

        else if (speed == 180)
        {
            while (speed != 120) 
            {
                speed = speed - 10;
                addClass();
                changeActive();
                currentScale = currentScale - 1;
            }
        }
        
        if (speed == 0)
        {
            document.getElementById("state_off").innerHTML = "Fan Off"
        }

        state()
    }
}

function addClass()
{
    var newClass = "speed-" + speed;
    var prevClass = "speed-" + prev_speed;
    var el = document.getElementsByClassName("needle_wrapper")[0];

    if (el.classList.contains(prevClass))
    {
        el.classList.remove(prevClass);
        el.classList.add(newClass);
    }

    prev_speed = speed;
}

function changeActive()
{
    var tempClass = "speedscale-" + currentScale;
    var el = document.getElementsByClassName(tempClass)[0];
    el.classList.toggle("active");
}

function _switch()
{
    var state = document.getElementById("switch").innerHTML;
    
    if (state == "OFF")
    {
        document.getElementById("switch").className = "green"
        document.getElementById("switch").innerHTML = "ON"
        document.getElementById("light").className = "light"
        sendLedState('on');
    }

    else if (state == "ON")
    {
        document.getElementById("switch").className = "red"
        document.getElementById("switch").innerHTML = "OFF"
        document.getElementById("light").className = "dark"
        sendLedState('off');
    }

}
