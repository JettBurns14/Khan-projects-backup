// Link:  https://www.khanacademy.org/cs/spin-off-of-bouncing-balls-addremove-buttons/6036700255092736
// Created:  08/03/2015 16:25




/*
 This program simulates bouncing balls. 
 The balls are assigned random colors and
 random locations.
*/

//////////////////////////////////////////////////////////////
//
//                     Ball 
//
// The Ball (class/type) describes the features of ball. Due to Ball class, we
// can create several bouncing balls. A draw method draws the ball.
//
//////////////////////////////////////////////////////////////

var balls = []; // to store all the balls

var Ball = function() {
    this.x = random(0,400); // x location of ball
    this.y = random(0,200); // y locaion of ball
    this.g = random(200,350); // level of ground
    this.t = random(0,200);   // t (time) to determine the location
    this.velocity = 0.02;     // velocity of ball
    this.acceleration = 3.5;  // acceleration of ball
    this.redColor = random(0,255);
    this.greenColor = random(0,255);
    this.blueColor = random(0,255);
};

// the draw method
Ball.prototype.draw = function() {
    fill(255, 0, 0);
    // Calculate y according to the path of a parabola with respect to "t":
    // y = (velocity)*t - (acceleration)*t^2;
    // We can tweak the velocity and acceleration constants for our fake world
    this.y = -this.velocity*this.t*this.t + this.acceleration*this.t;
    
    if (balls.length < 25){ // no shadow for large number of balls
        // We make the shadow lighter as we increase y
        var grey = 0.1 * this.y + 200;
        // We grow the shadow bigger as we increase y
        var shadowSize = 0.2 * this.y + 50;
        // Draw the shadow
        fill(grey, grey, grey);
        ellipse(this.x, this.g+50, shadowSize, 10);
    }else{
        textSize(14);
        text("Shadows are not shown when balls are greater than 24.", 10, 390);
    }
    
    // Since y is a positive height, we need to flip it
    // to look right on the inverted coordinate plane
    var correctedY = this.g - this.y;

    // Draw the ball
    fill(this.redColor, this.greenColor, this.blueColor);
    ellipse(this.x, correctedY, 40, 40);

    // If y becomes negative, the ball has hit the ground
    if (this.y < 0) {
        // Now we reset t to make it "bounce" up again
        this.t = 0;
    }
    
    this.t += 5;
};

//////////////////////////////////////////////////////////
//
//                Create Balls
//
//////////////////////////////////////////////////////////

var maxBalls = 5;
for(var i=0; i<maxBalls; i++){
    balls.push(new Ball());
}

///////////////////////////////////////////////////////////
//
//                Buttons Add/Remove
//
//////////////////////////////////////////////////////////


var addStartX = 120;
var addStartY = 5;
var addLength = 80;
var removeStartX = 220;
var removeStartY = 5;
var removeLength = 110;
var buttonHeight = 20;

var addButtons = function(){
    textSize(18);
    fill(255, 250, 0);
    rect(5,addStartY, 90,buttonHeight);
    fill(0, 0, 0);
    text("# Balls: " + balls.length ,5,20);
    fill(15, 55, 255);
    rect(addStartX,addStartY,addLength,buttonHeight);
  
    fill(255, 0, 0);
    text("add a ball", 120, 20);
    fill(250, 55, 155);
    rect(removeStartX,removeStartY,removeLength,buttonHeight);
    textSize(18);
    fill(15, 55, 255);
    text("remove a ball", 220, 20);

};

var mouseClicked = function(){
    if(mouseX > addStartX && mouseX < (addStartX + addLength) && mouseY > addStartY && mouseY < (addStartY + buttonHeight)){
        balls.push(new Ball());
    }
     if(mouseX > removeStartX && mouseX < (removeStartX + addLength) && mouseY > removeStartY && mouseY < (removeStartY + buttonHeight)){
        balls.pop(); // removes the last ball
    }
};

///////////////////////////////////////////////////////////
//
//                 Main Program Begins
//
///////////////////////////////////////////////////////////

noStroke();
var draw = function() {
    // Clear previous drawings and fill in a sky color
    background(214, 254, 255);
    addButtons();
    // draw sun
    fill(255, 250, 0);
    ellipse(100,80,60,60);
    
    // draw trees
    var img = getImage("cute/TreeTall");
    image(img, -25, 40, 50, 250);
    image(img, 50, 40, 50, 250);
    image(img, 150, 40, 50, 250);
    image(img, 250, 40, 50, 250);
    image(img, 350, 40, 50, 250);
    // Draw the ground
    fill(255, 255, 255);
    rect(0, 250, 400, 150);
   
    // draw balls
    for(var i=0; i<balls.length; i++){
        balls[i].draw();
    }
};
