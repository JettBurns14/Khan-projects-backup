// Link:  https://www.khanacademy.org/computer-programming/spinners/6252976318840832
// Created:  01/25/2016 08:38





var r = 0;
noStroke();
var BluSpinner = function(x, y) {
    fill(87, 101, 255);
    pushMatrix();
    translate(x, y);
    rotate(r);
    rectMode(CENTER);
    rect(0, 0, 60, 20);
    rect(0, 0, 20, 60);
    popMatrix();
};
draw = function() {
    background(255);
    r+=0.4;
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        BluSpinner(i*60+20*j-90, 60*j+-20*i+30);
    }
}
};
