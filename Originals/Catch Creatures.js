// Link:  https://www.khanacademy.org/computer-programming/catch-creatures/5111555452174336
// Created:  01/07/2016 07:48





/**
 * Hi everyone! I made this game 4 months ago and I haven't changed much, so 
 * please know that the code is old and not current. If the game needs any improvements,
 * please let me know in the tips&thx. If you think the game could use something new,
 * please tell me and I might add it!
    
    @Controls: Push the UP arrow to move the net up.
**/

// Variables.
{
var x = 250;
var y = 350;
var pos = 0;
var bugsCaught = 0;
var timer = 0;
var a = 200;
var b = 393;
var Timer = 0;
var speed = 1;
frameRate(548);
var s = second();
}

// Draws the button, hence the name.
var drawButton = function() {
    background(101, 222, 235);
    cursor(ARROW);
    rectMode(CENTER);
    
    // PLAY BUTTON
    if (mouseX > 205 && mouseX < 295 && mouseY > 175 && mouseY < 225) {
        fill(0, 60, 255);
        cursor(HAND);
    } else {
        fill(0, 158, 250);
    }
    rect(250, 200, 90, 50, 5);
    
    fill(0);
    textSize(40);
    text("Play", 212, 185, 200, 200);
    
};

// Draws the first scene, or menu.
var drawMenu = function() {
    strokeWeight(2);
    image(getImage("avatars/piceratops-sapling"), 315, 183, 150, 150);
    textSize(50);
    text("Catch Creatures", 76, 18, 400, 400);
    textSize(30);
    text("THE GAME", 175, 76, 400, 400);
    
    noFill();
    stroke(0);
    beginShape();
    curveVertex(a+22, b-150);
    curveVertex(a-71, b-154);
    curveVertex(a-143, b-83);
    curveVertex(a-60, b-69);
    curveVertex(a+96, b+2);
    endShape();
    
    pushMatrix();
    translate(142, 282);
    rotate(-12);
    ellipse(0, 0, 50, 90);
    ellipse(-69, 4, 18, 33);
    ellipse(-55, 1, 22, 45);
    ellipse(-35, -2, 31, 62);
    ellipse(-18, -2, 40, 75);
    popMatrix();
    
    beginShape();
    curveVertex(a+111, b-191);
    curveVertex(a-51, b-150);
    curveVertex(a-143, b-82);
    curveVertex(a-50, b-114);
    endShape();
    
    beginShape();
    curveVertex(a+83, b-106);
    curveVertex(a-39, b-132);
    curveVertex(a-142, b-82);
    curveVertex(a-157, b-91);
    endShape();
    
    beginShape();
    curveVertex(a-166, b-107);
    curveVertex(a-142, b-80);
    curveVertex(a-33, b-115);
    curveVertex(a+5, b-97);
    endShape();
    
    beginShape();
    curveVertex(a-187, b-103);
    curveVertex(a-140, b-78);
    curveVertex(a-32, b-96);
    curveVertex(a-78, b-60);
    endShape();
    
    beginShape();
    curveVertex(a-166, b-108);
    curveVertex(a-136, b-78);
    curveVertex(a-35, b-79);
    curveVertex(a-66, b-46);
    endShape();
    
    fill(117, 103, 58);
    quad(127, 379, 136, 323, 126, 321, 118, 378);
};

// Draws the bakcground(tree, grass).
var drawBack = function() {
    var x = 100;
    var y = 275;

    // Tree
    fill(115, 101, 54);
    rect(x-24, y, 20, 150);
    for (var i = 0; i < 400; i+=27) {
        pushMatrix();
        strokeWeight(1);
        stroke(0, 0, 0);
        fill(16, 204, 16, 207); 
        translate(80, 200);
        rotate(i);
        ellipse(-20, 0, 60, 60);
        ellipse(-39, 0, 50, 50);
        ellipse(-31, -10, 50, 50);
        popMatrix();
    }
    
    // Grass
    for (var i = 0; i < 19; i++) {
        image(getImage("cute/GrassBlock"), i*31, 372, 32, 110);
    }
};

// Draws the net & restart screen.
var drawNet = function() {
    strokeWeight(1.5);
    ellipseMode(CORNER);
    
    // Net
    fill(148, 113, 56);
    rect(x+2, y+21, 10, 48);
    noFill();
    stroke(0);
    ellipse(x-5, y-52, 29, 50);
    ellipse(x-16, y-52, 29, 50);
    ellipse(x-25, y-49, 29, 44);
    arc(x-35, y-52, 83, 50, 87, 277);
    arc(x-34, y-43, 102, 32, 85, 276);
    arc(x-34, y-33, 101, 14, 84, 276);
    y = constrain(y, 50, 350);
    if (keyIsPressed && keyCode === UP) {
        y -=4;
    } else {
        y +=3;
    }
    if (this.bugsCaught >= 30) {
        background(101, 222, 235);
        fill(255, 241, 110);
        textSize(40);
        text("YOU WIN!!", 150, 50);
        textSize(30);
        text("You caught:\n       " + bugsCaught, 170, 248);
        image(getImage("seasonal/hopper-partying"), 250, 139, 100, 147);
        fill(0, 158, 250);
        if (mouseX > 210 && mouseX < 293 && mouseY < 354 && mouseY > 300) {
            fill(0, 60, 255);
        } if (mouseIsPressed && mouseX > 168 && mouseX < 253 && mouseY < 350 && mouseY > 300) {
            Program.restart();
        }
        rect(250, 326, 80, 50, 5);
        fill(0, 0, 0);
        textSize(22);
        text("Restart", 215, 334);
    }
};

// Draws the creatures, not bugs.
var drawBugs = function() {
    imageMode(CENTER);
    image(getImage("avatars/piceratops-sapling"), this.pos, this.r, 50, 50);
    if (this.pos < -50) {
       this.pos = 550;
       this.r = random(20, 290);
    }
    this.pos -=2.5;
    fill(0);
    textSize(17);
    text(bugsCaught + " Caught", 20, 23);
};

// Function for catching the creature.
var update = function() {
    if (dist(this.pos, this.r, x, y-40) < 20) {
        this.bugsCaught++;
        this.pos = -400;
    }
};

// Draws the mountins.
var drawRange = function() {
    noStroke();
    
    fill(135, 135, 135, 100);
    var incAmount = 0.01;
    for (var t = 0; t < incAmount*width; t += incAmount) {
        var n = noise(t);
        var y = map(n, 1, 0, 16, 261);
        rect(t*100, height-y+52, 2, y);
    }
};

// Puts everything together.
draw = function() {
    drawButton();
    drawMenu();
    if (mouseIsPressed && mouseX > 205 && mouseX < 295 && mouseY > 175 && mouseY < 229) {
        timer++;
    }

    if (timer > 0) {
        cursor(ARROW);
        background(101, 222, 235);
        drawRange();
        drawBack();
        drawBugs();
        drawNet();
        update();
    }
};
