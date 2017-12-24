// Link:  https://www.khanacademy.org/computer-programming/advanced-js-moving-ball/5892566577971200
// Created:  09/08/2015 11:43




var Mover = function(x, y) {
    this.mass = 1;
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
    // Now we make sure to clear acceleration each time
    this.acceleration.mult(0);
};

Mover.prototype.display = function() {
    stroke(0);
    fill(58, 255, 51, 127);
    ellipse(this.position.x, this.position.y, this.mass*50, this.mass*50);
};

Mover.prototype.checkEdges = function() {
    if (this.position.x > 385) {
        this.position.x = 385;
        this.velocity.x *= -1;
    } else if (this.position.x < 25) {
        this.velocity.x *= -1;
        this.position.x = 25;
    }
    if (this.position.y > 385) {
        this.velocity.y *= -1;
        this.position.y = 385;
    }
    
};

var m = new Mover(50, 50);

draw = function() {
    background(255);
    line(0, 30, 400, 30);
    var gravity = new PVector(0, 0.2 * m.mass);
    var wind = new PVector(0.002, 0);
    var c = 0.05;
    var normal = 1;
    var frictionMag = c*normal;
    var friction = m.velocity.get();
    friction.normalize();
    friction.mult(-1);
    friction.mult(frictionMag);
    m.applyForce(friction);
    m.applyForce(gravity);
    m.applyForce(wind);
    m.display();
    m.update();
    m.checkEdges();

};
