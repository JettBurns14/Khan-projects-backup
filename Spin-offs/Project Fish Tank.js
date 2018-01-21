// Link:  https://www.khanacademy.org/computer-programming/project-fish-tank/6648193282080768
// Created:  01/07/2016 08:14





background(180);

// Tank, table, water, seaweed.
{
// The table
fill(74, 74, 74);
rect(55, 245, 290, 200);
fill(117, 100, 45);
rect(20, 250, 360, 30);
stroke(0);
rect(20, 280, 360, 10);

// The tank
fill(92, 239, 255);
rect(50, 150, 301, 120);
fill(82, 194, 255, 90);
rect(50, 150, 301, 120);
fill(0);
rect(50, 135, 301, 15);

// Seaweed

for (var i = 26; i < 110; i +=13) {
    fill(7, 74, 0);
    beginShape();
    curveVertex(246, 250);
    curveVertex(i*3, 215);
    curveVertex(i*3, 260);
    curveVertex(144, 260);
    endShape();
}
}

// Draws the fish
var drawFish = function(centerX, centerY) {
    var centerX = mouseX;
    var centerY = mouseY;
    var bodyLength = random(15, 25);
    var bodyHeight = random(10, 20);
    
    noStroke();
    fill(random(0,255), random(0,255), random(0,255));
    // body
    ellipse(centerX, centerY, bodyLength, bodyHeight);
    // tail
    var tailWidth = bodyLength/4;
    var tailHeight = bodyHeight/2;
    triangle(centerX-bodyLength/2, centerY,
             centerX-bodyLength/2-tailWidth, centerY-tailHeight,
             centerX-bodyLength/2-tailWidth, centerY+tailHeight);
    // eye
    fill(255);
    ellipse(centerX+bodyLength/5, centerY, bodyHeight/3, bodyHeight/3);
    fill(0);
    ellipse(centerX+bodyLength/4, centerY, bodyHeight/5, bodyHeight/5);
};

// Calls a new fish every time you click in the tank.
// This is a VERY efficient way of drawing infinite objects without using infinite code. A for loop can also be used.
mouseClicked = function() {
    if (mouseIsPressed && mouseX > 65 && mouseX < 340 && mouseY > 157 && mouseY < 260) {
        drawFish(mouseX, mouseY);
    }
};

// Dirt and rocks at bottom of tank
for (var i = 51; i < 345; i += 10) {
    var rock = getImage("cute/DirtBlock");
    image(rock, i, 250, 10, 20);
}
