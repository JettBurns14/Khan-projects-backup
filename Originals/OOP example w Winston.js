// Link:  https://www.khanacademy.org/computer-programming/oop-example-w-winston/5330018008170496
// Created:  01/12/2016 19:08





// This is the Winston constructor.
var Winston = function(x, y, c) {
    this.x = x;
    this.y = y;
    // This is the color property for Winston's yellow body.
    this.color = c;
};

// This method draws Winston.
Winston.prototype.draw = function() {
    noStroke();
    fill(194, 194, 194);
    ellipse(this.x-2, this.y+1, 195, 195);
    // Use "this.color" inside the fill that colors the body.
    fill(this.color);
    ellipse(this.x, this.y, 195, 195);
    fill(0);
    ellipse(this.x-26, this.y-39, 28, 28);
    ellipse(this.x+68, this.y-45, 28, 28);
    fill(255, 0, 0);
    ellipse(this.x+38, this.y+18, 77, 87);
};

/* 
 "this.color" just equals "c" which is nothing yet.
 So, pass a parameter that equals a color, which is yellow. 
*/
var winston = new Winston(202, 198, color(255, 255, 0));

// Call the winston function to draw Winston.
winston.draw();



















// Previous example program.
/*
// This is where the ball starts out.
var x = 50;
// This is the speed of the ball.
var speed = 5;

// It all needs to be in a draw function, or else it would move only one pixel.
draw = function() {
    // We need a background so the ball is drawn over every time it moves. 
    // If this wasn't here, the ball would smear over the canvas.
    background(255, 253, 235);
    
    fill(66, 66, 66); // Fills the ball with color.
    ellipse(x, 200, 30, 30); // Position the ball with the variable x so that it can move when x changes.
    
    // If the x position of the ball is greater than 400 (right side of canvas), 
    // move the ball negative 5 (to the left).
    if (x > 385) {
        speed = -5;
    }
    // If the x position of the ball is less than 0 (left side of canvas), 
    // move the ball positive 5 (to the right)
    if (x < 15) {
        speed = 5;
    }

    // This moves the ball no matter where it's going.
    x += speed;
};
*/
