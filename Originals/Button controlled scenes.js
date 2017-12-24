// Link:  https://www.khanacademy.org/computer-programming/button-controlled-scenes/5708373868806144
// Created:  09/04/2015 14:33




var Scene = 1;
var Color = 0;
    
mouseMoved = function() {
    noStroke();
    fill(255, 166, 0);
    ellipse(mouseX, mouseY, 10, 10);
};

stroke(0);
draw = function() {
    Scene = 1;
    fill(176);
    if (mouseX > 13 && mouseX < 72 && mouseY > 350 && mouseY < 387) {
        fill(150);
        cursor(HAND);
    } if (mouseIsPressed && mouseX < 72 && mouseY > 350 && mouseY < 387) {
        Scene = 2;
        rect(30, 30, 340, 340, 10);
        fill(0);
        text("To paint, just move your mouse over the canvas.", 80, 100, 300, 200); fill(150);
        fill(179, 179, 179);
    if (mouseX > 57 && mouseX < 125 && mouseY > 50 && mouseY < 70) {
        fill(150);
        Scene = 1;
    }
    }
    
    rect(13, 352, 55, 34, 4);
    fill(0);
    textSize(20);
    text("Help", 20, 362, 200, 200);
    
};
