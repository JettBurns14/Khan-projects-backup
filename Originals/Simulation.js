// Link:  https://www.khanacademy.org/computer-programming/simulation/5203715804495872
// Created:  09/28/2015 08:45




/*******************************************************************
 * A simulation of Jupiter colliding with the asteroid belt, 
 * throwing the individual asteroids in all directions.
 * 
 * If you move your mouse near the bottom of the canvas, 
 * you can restart the program, or just watch the counters update.
 * 
 * \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
 * This sim has alot of things going on, so it may lag or not even 
 * work for some computers with processors that can't handle it. If 
 * that happens, change the variable below. (The variable determines
 * if the asteroids have their own gravity, it's nearly the same if turned off) 
 * Look at line 28 below.
 * /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
 * 
 * The simulation starts with 200 asteroids (bodies). If a asteroid 
 * gets to close to Jupiter's center, it disappears. This simulates
 * a collision between the two. The same thing happens to earth.
 * 
 * Each body has its own gravity, I made it natural as possible 
 * in a computer sim. I hope you like it!
 *
********************************************************************/


// Here's the variable to change if it's lagging. Change "false" to "true",
// and make sure there is a semicolon after "true".
var lessLag = false;

// I wouldn't change these, the program might not work.
var myFont = textFont("times", 12);
var G = 0.0001;
var hits = 0;
var backgroundColor = (10, 10, 20);
var NumAsteroids = 200;


/*************************** Asteroids *****************************/

var Mover = function(m, x, y) {
    this.mass = m;
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};
  
Mover.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};
  
Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

Mover.prototype.display = function() {
    stroke(2);
    strokeWeight(0.3);
    fill(194, 194, 194);
    ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
};

Mover.prototype.calculateAttraction = function(m, i) {
    // Calculate direction of force
    var force = PVector.sub(this.position, m.position);
    // Distance between objects
    var distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = constrain(distance, 5, 25.0);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction                       
    force.normalize();
    // Calculate gravitional force magnitude
    var strength = (G * this.mass * m.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
};

/**************************** Jupiter ******************************/

var Attractor = function(x, y) {
    this.position = new PVector(x, y);
    this.mass = 18;
    this.velocity = new PVector(0.2, -0.3);
    this.acceleration = new PVector(0, 0);
    this.G = 0.0022;
};

Attractor.prototype.display = function() {
    ellipseMode(CENTER);
    noStroke();
    fill(204, 105, 0);
    ellipse(this.position.x, this.position.y, this.mass*2, this.mass*2);
    noFill();
    strokeWeight(1.2);
    stroke(255, 179, 0);
    arc(this.position.x, this.position.y+10, 28, 8, 28, 155);
    arc(this.position.x, this.position.y-10, 28, 5, 0, 180);
    strokeWeight(2);
    arc(this.position.x, this.position.y+2, 33, 5, 0, 180);
    strokeWeight(2.5);
    stroke(212, 156, 59);
    arc(this.position.x, this.position.y-5, 31, 5, 0, 180);
    noStroke();
    fill(214, 171, 30);
    ellipse(this.position.x-8, this.position.y+5, 10, 6);
};

Attractor.prototype.applyForce = function(force) {
    var f = PVector.div(force,this.mass);
    this.acceleration.add(f);
};
  
Attractor.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

Attractor.prototype.calculateAttraction = function(mover) {
    // Calculate direction of force
    var force = PVector.sub(this.position, mover.position);
    // Distance between objects       
    var distance = force.mag();
    // Limiting the distance to eliminate "extreme"
    // results for very close or very far objects                            
    distance = constrain(distance, 10, 250);
    if (distance <= 15) {
        mover.position.x = 3000;
        NumAsteroids -=1;
    }
    // Normalize vector                   
    force.normalize();
    // Calculate gravitional force magnitude  
    var strength = (this.G * this.mass * mover.mass) / (distance*distance*2);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
};

/***************************** Earth *******************************/

var Earth = function(x, y) {
    this.position = new PVector(x, y);
    this.mass = 18;
    this.velocity = new PVector(0.15, -0.25);
    this.acceleration = new PVector(0, 0);
    this.G = 0.0015;
};

Earth.prototype.display = function() {
    noStroke();
    fill(117, 112, 255);
    ellipse(this.position.x, this.position.y, 16, 16);
};

Earth.prototype.applyForce = function(force) {
    var f = PVector.div(force,this.mass);
    this.acceleration.add(f);
};
  
Earth.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

Earth.prototype.calculateAttraction = function(mover) {
    // Calculate direction of force
    var force = PVector.sub(this.position, mover.position);
    // Distance between objects       
    var distance = force.mag();
    // Limiting the distance to eliminate "extreme"
    // results for very close or very far objects                            
    distance = constrain(distance, 10, 200);
    if (distance <= 10) {
        mover.position.x = 3000;
        hits++;
        NumAsteroids -=1;
    }
    // Normalize vector                   
    force.normalize();
    // Calculate gravitional force magnitude  
    var strength = (this.G * this.mass * mover.mass) / (distance*distance*2);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
};

var movers = [];
    for (var i = 0; i < NumAsteroids; i++) {
        movers[i] = new Mover(random(0.15, 0.3), random(150, 600), random(-200, 600));
    }

var PopUp = function() {
    if (mouseX < 400 && mouseY > 340) {
    fill(179, 179, 179, 117);
    stroke(56, 56, 56, 117);
    strokeWeight(3);
    rect(-10, 340, 420, 60);
    fill(0, 0, 0, 180);
    textSize(17);
    text("Number of bodies: " + NumAsteroids, 10, 365);
    text("Collisions with earth: " + hits, 10, 385);
    fill(255, 74, 80, 117);
    if (mouseX > 320 && mouseX < 390 && mouseY > 370 && mouseY < 395) {
        fill(255, 0, 0, 117);
    } 
    if (mouseIsPressed && mouseX > 320 && mouseX < 390 && mouseY > 370 && mouseY < 395) {
        Program.restart();
    }
    noStroke();
    rect(320, 370, 70, 25, 3);
    fill(0);
    text("restart", 331, 386);
    }
};

    var attractor = new Attractor(150, 420);
    var earth = new Earth(40, 200);

var draw = function() {
    background(backgroundColor);
    attractor.display();
    earth.display();
    attractor.update();
for (var i = 0; i < movers.length; i++) {
        for (var j = 0; j < movers.length; j++) {
            if (i !== j) {
                var force = earth.calculateAttraction(movers[i]);
                movers[i].applyForce(force);
            }
        }
}
    for (var i = 0; i < movers.length; i++) {
        for (var j = 0; j < movers.length; j++) {
            if (i !== j) {
                if (lessLag !== true) {
                    var force = movers[j].calculateAttraction(movers[i]);
                    movers[i].applyForce(force);
                }
                var force = attractor.calculateAttraction(movers[i]);
                movers[i].applyForce(force);
            }
        }
        movers[i].update();
        movers[i].display();
    }

    PopUp();
};
