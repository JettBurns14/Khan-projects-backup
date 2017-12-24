// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-project-computational-creatures/4811741967024128
// Created:  09/06/2015 17:43




//This simulates dragonflys and tiny gerridae (water striders) randomely moving around.

// This is the dragonfly's constructor.
var Fly = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(-0.001, 0.01);
};

// This moves the dragonflies.
Fly.prototype.update = function() {
    this.acceleration = PVector.random2D();
    this.acceleration.mult(random(1));
    this.velocity.add(this.acceleration);
    this.velocity.limit(3);
    this.position.add(this.velocity);
};

// This displays (draws) the dragonflies.
Fly.prototype.display = function() {
    pushMatrix();
    var r = this.velocity.heading();
    translate(this.position.x, this.position.y);
    rotate(r);
    strokeWeight(0.5);
    fill(255, 255, 255, 127);
    ellipse(35, -14, 10, 15);
    ellipse(35, 14, 10, 15);
    fill(0, 99, 3);
    ellipse(40, 0, 24, 13);
    fill(224, 69, 69);
    ellipse(52, 4, 8, 8);
    ellipse(52, -4, 8, 8);
    popMatrix();
};

// This makes the dragonflies appear on one side if they reach another side.
Fly.prototype.checkEdges = function() {
    
  if (this.position.x > width) {
    this.position.x = 0;
  } 
  else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  } 
  else if (this.position.y < 0) {
    this.position.y = height;
  }
};

var Gerridae = function() {
    this.position = new PVector(random(width), random(height));
    this.velocity = new PVector(0, 0);
    this.accelertion = new PVector(-0.001, 0.01);
};

Gerridae.prototype.update = function() {
    this.acceleration = PVector.random2D();
    this.acceleration.mult(random(2));
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.position.add(this.velocity);
};

Gerridae.prototype.display = function() {
    fill(0);
    ellipse(this.position.x, this.position.y, 3, 3);
};

Gerridae.prototype.checkEdges = function() {
    if (this.position.x > width) {
    this.position.x = 0;
  } 
  else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  } 
  else if (this.position.y < 0) {
    this.position.y = height;
  }
};

var mover = [];
var gerridae = [];

for (var i = 0; i < 4; i++) {
    mover[i] = new Fly();
}
for (var i = 0; i < 8; i++) {
    gerridae[i] = new Gerridae();
}

draw = function() {
    
    for (var i = 0; i < gerridae.length; i++) {
    gerridae[i].display();
    gerridae[i].update();
    gerridae[i].checkEdges();
    }
    // The pond
    fill(163, 201, 255, 127);
    rect(-10, -10, width+20, height+20);
    
    // The dragonflys
    for (var i = 0; i < mover.length; i++) {
        mover[i].display();
        mover[i].update();
        mover[i].checkEdges();
    }
    
};
