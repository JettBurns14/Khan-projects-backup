// Link:  https://www.khanacademy.org/cs/spin-off-of-contest-generative-art/6613356824887296
// Created:  07/28/2015 07:57




//Original here: https://www.khanacademy.org/computer-programming/strange-figure/1041461426

// number of points on the spiral
var N = 1840;

var maxRadius = 200;

// determines the initial spiral configuration
var angleChange = 360000;
var count = 0;
var da = 10;

// color of the spiral
var redValue = 255;
var greenValue = 0;
var blueValue = 0;

// how much each color component changes every time
var dRed = -1;
var dGreen = 2;
var dBlue = 3;

// strokeWeight < 1 makes the lines transparent
strokeWeight(0.1); 

var draw = function() {
    background(0, 0, 0);
    stroke(redValue, greenValue, blueValue);

    // coordinates of the current point
    var x = 200;
    var y = 200;

    // coordinates of the previous point
    var lastX = 200;
    var lastY = 200;

    for (var i = 0; i < N; i += 1) {
        // calculate position of current point
        var theta = angleChange * i;
        var radius = maxRadius * sqrt(i / N);
        x = 200 + radius * sin(theta*log(i)/(20025 + 25*sin(count/3)));
        y = 200 + radius * cos(theta*log(i)/(20000));
        
        // draw a line from the last point to the current point
        line(lastX, lastY, x, y);
        
        // update the previous point to be the current point
        lastX = x;
        lastY = y;
    }
    
    // if colors go out of range,
    // flip the direction of change
    if (redValue < 0 || redValue > 255) {
        dRed = -dRed;
    }
    if (blueValue < 0 || blueValue > 255) {
        dBlue = -dBlue;
    }
    if (greenValue < 0 || greenValue > 255) {
        dGreen = -dGreen;
    }
    
    // increment colors
    redValue += dRed;
    blueValue += dBlue;
    greenValue += dGreen;
    
    // increment angleChange to rotate the spiral
    da = 500*pow((1-abs(sin(count*0.7))), 2);
    angleChange += da/3;
    count++;
};
