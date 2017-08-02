var readline = require('readline');
var gpio = require('rpi-gpio');

// initialize readline input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var allowBlink = false;
var on = false;

// setup GPIO port 15 to send power out
gpio.setup(15, gpio.DIR_OUT);

//setup GPIO 19 to read in
gpio.setup(19, gpio.DIR_IN);


// send power to GPIO 15
function startLight() {
    gpio.write(15, true);
}


setInterval(reado, 100);
//stop power output to GPIO 15
function stopLight() {
    gpio.write(15, false);
}
function reado() {
    gpio.read(19, function(err, value) {
         console.log('The value is ' + value);
        allowBlink = value;
     });
}


// gpio.on('change', function(channel, value) {
//     console.log('Channel ' + channel + ' value is now ' + value);
// });

// read line input from console
rl.on('line', (input) => {
    // console.log(`Received: ${input}`);
    switch (input) {
        case 'turnon':
            startLight();
            break;
        case 'turnoff':
            stopLight();
            break;

        default:
    }
});

setInterval(function() {
    if(allowBlink) {
        if(on) {
            stopLight();
        } else {
            startLight();
        }
        on = !on;
    }
}, 250);
