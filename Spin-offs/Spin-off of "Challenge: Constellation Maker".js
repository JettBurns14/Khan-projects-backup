// Link:  https://www.khanacademy.org/cs/spin-off-of-challenge-constellation-maker/5851323561017344
// Created:  08/03/2015 15:53



var xPositions = [-10,-10];
var yPositions = [-10,-10];
background(9, 5, 59);

var drawStars = function() {
    imageMode(CENTER);
    for (var i = 0; i < yPositions.length; i++) {
        image(getImage("space/star"), xPositions[i], yPositions[i], 30, 30);
    }
};

var mouseClicked = function() {
    xPositions.push(mouseX);
    yPositions.push(mouseY);
    drawStars();
};
