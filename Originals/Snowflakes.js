// Link:  https://www.khanacademy.org/computer-programming/snowflakes/5920905195290624
// Created:  11/14/2015 13:46





var turn = 0;
var xFlakes = [];
var yFlakes = [];
var flakeRadius = [];

for(var i = 0; i < 50; i++){
        xFlakes.push(random(0, 400));
        yFlakes.push(random(-400, 10));
        flakeRadius.push(random(2, 15));
}

var drawBranches = function(x, y, radius) {
    rotate(turn);
    for (var i = 0; i < 6; i++) {
        line(0, 0, radius, 0);
        for (var j = 0; j < radius/8; j++) {
            line(j*5, 0, j*10, j*3);
            line(j*5, 0, j*10, j*-3); 
        }
        rotate(60);
    }
    resetMatrix();
    translate(x, y);
    stroke(224, 248, 255, 230);
    strokeWeight(1);
};

draw = function() {
    background(0, 0, 0);
    for (var i = 0; i < 150; i++) {
    drawBranches(xFlakes[i], yFlakes[i], flakeRadius[i]);
    yFlakes[i]+=1;
    if (yFlakes[i] > 410) {
        yFlakes[i] = -10;
    }
    }
    turn+=1;
    
};
