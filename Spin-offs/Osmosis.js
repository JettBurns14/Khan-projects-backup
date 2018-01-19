// Link:  https://www.khanacademy.org/computer-programming/osmosis/5105400304762880
// Created:  11/28/2015 12:51





/*******************************************************************
 * This is a simulation of some particles spreading out over time,
 * demonstrating diffusion.
 *
 * It starts off with twenty particles on the left side of the box,
 * or a high concentration on the left.
 * When you click, the program starts and diffusion begins.
 * The particles go down their concentration gradient,
 * until the system reaches a equilibrium.
 *
 * Sal said "I'd love if any of y'all could maybe create a simulation here on KA to show this.", 
 * so here it is Sal!
 * 
 * For Osmosis
 * 
 * 
 * Work on ballSize and edges
 * Work on collisions
 * Work on wall
********************************************************************/

// You can change this to affect the time before it stops.
var time = 30; 
// No need to change these.
var running = false;
var timer = 0;
var numBalls = 10;
var particleSize = 15;
var noArrows = false;
var lostVelocity = 1;

mouseClicked = function() {
    running = true;  
    
};

var Mover = function(x, y) {
    this.pos = new PVector(x, y);
    this.velocity = new PVector(random(-0.3,0.3),random(-0.3,0.3));
};

Mover.prototype.update = function() {
    this.pos.add(this.velocity);
};

Mover.prototype.display = function() {
    var angle = this.velocity.heading();
    
    stroke(255, 0, 251);
    strokeWeight(2);
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    if (noArrows !== true) {
        line(particleSize-8, 0, particleSize+5, 0);
        line(particleSize, 5, particleSize+7, 0);
        line(particleSize, -5, particleSize+7, 0);
    }
    noFill();
    ellipse(0, 0, particleSize, particleSize);
    popMatrix();
};

Mover.prototype.checkEdges = function() {
    if (this.pos.x > 370-particleSize || this.pos.x < 30+particleSize) {
        this.velocity.x *= -lostVelocity;
    }
    
    if (this.pos.y > 370-particleSize || this.pos.y < 30+particleSize) {
        this.velocity.y *= -lostVelocity;
    } 
};

Mover.prototype.checkForCollision = function(mover) {
    
    var D = PVector.sub(this.pos, mover.pos);
    var d = D.mag();
    
    if (d < particleSize) {
        this.velocity.x *= -1;
        this.velocity.y *= -1;
    }
};


var Wall = function(x, y) {
    this.Pos = new PVector(x, y);
};

Wall.prototype.display = function() {
    rectMode(CENTER);
    stroke(255);
    rect(this.Pos.x, this.Pos.y, 40, 40);
};

Wall.prototype.checkForCollision = function(mover) {
    
    var D = PVector.sub(this.Pos, mover.pos);
    var d = D.mag();
    
    if (d < 24) {
        mover.velocity.x *= -1;
        mover.velocity.y *= -1;
    }
};

var particles = [];
var wall = new Wall(200, 93);

for (var i = 0; i < 10; i++) {
    
    // I like this, it detirmines where to draw the particles based on probability.
    var r = random(1);
    
    if (r < 0.85) {
        particles[i] = (new Mover(random(50, 100), random(60, 345)));
    } else {
        particles[i] = (new Mover(random(300, 350), random(60, 345)));  
    }
}

var draw = function() {
    background(0);
    stroke(255);
    noFill();
    rect(200, 200, 320, 320, 5);
    line(200, 41, 200, 359);
    
    // This draws the text
    {
        textSize(12);
    if (running === true) {
        fill(255);
        text(timer/100, 180, 25);
        text("Seconds", 227, 25);
    }
    
    if (running !== true) {
        fill(255);
        textAlign(CENTER, CENTER);
        text("Click to start", 200, 200);
    }
        fill(242, 0, 255);
        text("High\nConcentration", 60, 23);
        text("Low\nConcentration", 340, 23);
        
        fill(255, 255, 0);
        //text("Low\nConcentration", 60, 375);
        //text("High\nConcentration", 340, 375);
        
    }
    
    for (var i = 0; i < particles.length; i++) {
        if (running === true && timer < time*100) {
            timer+=0.1;   
        }
        for (var j = 0; j < particles.length; j++) {
            if (i !== j) {
                if (running === true && timer < time*100) {
                    particles[i].checkForCollision(particles[j]);
                    particles[i].update();
                    particles[i].checkEdges();
                    wall.checkForCollision(particles[i]);
                }
            }
        }
        particles[i].display();
        wall.display();
    }
    
    if (timer >= time*100) {
            timer = time*100;
            fill(255);
            textSize(18);
            text("See how this system has spread out? \n This is diffusion!", 200, 196);
        }
};
