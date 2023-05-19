const socket = new WebSocket('ws://172.30.68.118:3000');

socket.addEventListener('message', function (event) 
{
    const data = JSON.parse(event.data);

    if (data.fanSpeed !== undefined) 
    {
        document.getElementById("mode").innerHTML = data.fanSpeed.toUpperCase();
        fanspeed = data.fanSpeed.toUpperCase();

        if (fanspeed === "OFF"){
            console.log(`in OFF of ws: ${speed}"}`)
            if(speed > 0){
               decrease();
            }
        }
        else if (fanspeed === "LOW"){
            console.log(`in LOW of ws: ${speed}"}`)
            if(speed == 0){
                increase();
            }
            else if(speed > 50){
                decrease();
            }
            else if(speed < 50){
                increase();
            }
        }
        else if (fanspeed === "MEDIUM"){
            if(speed == 0){
                increase();
            }
            else if(speed > 120){
                decrease();
            }
            else if(speed < 120){
                increase();
            }
        }
        else if (fanspeed === "HIGH"){
            console.log(`Changing on other device: ${speed}"}`)
            if(speed == 0){
                increase();
            }
            else if(speed < 180){
                increase();
            }
        }
        console.log('New fan speed:', data.fanSpeed);
    }

    if (data.ledState !== undefined) {
        const ledState = data.ledState === 'on' ? 'ON' : 'OFF';
        document.getElementById("buttonswitch").innerHTML = ledState;

        if(data.ledState === 'on')
        {
            document.getElementById("light").className = "light";
            document.getElementById("buttonswitch").className = "green"
        }

        else if(data.ledState === 'off')
        {
            document.getElementById("light").className = "dark";
            document.getElementById("buttonswitch").className = "red"
        }

        console.log('New LED state:', data.ledState);
    }
});

var test = 0;
var speed = 0;
var prev_speed = 0;
var currentScale = 1;

function state()
{
    console.log(`entered state(): ${speed}}`)
    let state = 'off'

    if (speed > 0 && speed <= 50) 
    {
        document.getElementById("mode").innerHTML = "LOW"
        state = 'low';
    }

    else if (speed > 50 && speed <= 120) 
    {
        document.getElementById("mode").innerHTML = "MEDIUM"
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

    console.log(`exited state(): ${speed}}`)
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
    console.log(`entered killswitch(): ${speed}}`)
    if (speed > 0)
    {
        while (speed != 0) 
        {
            decrease();
        }
        document.getElementById("state_off").innerHTML = "Fan Off"
        document.getElementById("mode").innerHTML = "OFF"
    }

    sendFanSpeed('off');
    // sendLedState('off'); //produces error (flickering in all connected clients)

    document.getElementById("buttonswitch").className = "red"
    document.getElementById("buttonswitch").innerHTML = "OFF"
    document.getElementById("light").className = "dark"
    sendLedState('off');

    console.log(`exited killswitch(): ${speed}}`)   
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
    console.log(`entered increase(): ${speed}"}`)
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
        console.log(`exited increase(): ${speed}"}`)
        state()

    }
}

function decrease()
{
    console.log(`entered decrease(): ${speed}"}`);
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

        console.log(`exited decrease(): ${speed}"}`);
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
    var state = document.getElementById("buttonswitch").innerHTML;
    
    if (state == "OFF")
    {
        document.getElementById("buttonswitch").className = "green"
        document.getElementById("buttonswitch").innerHTML = "ON"
        document.getElementById("light").className = "light"
        sendLedState('on');
    }

    else if (state == "ON")
    {
        document.getElementById("buttonswitch").className = "red"
        document.getElementById("buttonswitch").innerHTML = "OFF"
        document.getElementById("light").className = "dark"
        sendLedState('off');
    }

}
