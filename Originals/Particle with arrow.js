// Link:  https://www.khanacademy.org/computer-programming/particle-with-arrow/4822601317351424
// Created:  11/09/2015 09:04




var Mover = function(x, y) {
    this.position = new PVector(x, y);
    this.velocity = new PVector(random(-3,3),random(-3,3));
    //this.acceleration = 0.5;
};

Mover.prototype.update = function () {
    this.position.add(this.velocity);
};

Mover.prototype.display = function () {
    var angle = this.velocity.heading();
    
    stroke(0, 0, 0);
    strokeWeight(2);
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(angle);
    line(0, 0, 30, 0);
    line(20, 5, 30, 0);
    line(20, -5, 30, 0);
    fill(255, 0, 0);
    ellipse(0, 0, 20, 20);
    fill(0);
    textSize(15);
    //text("H", -5, 5);
    popMatrix();
};

Mover.prototype.checkEdges = function () {
    if (this.position.x > width || this.position.x < 0) {
        this.velocity.x *= -1;
    }
    
    if (this.position.y > height || this.position.y < 0) {
        this.velocity.y *= -1;
    } 
    
};

Mover.prototype.collide = function(mover) {
    
};
var balls = [];

for (var i = 0; i < 20; i++) {
    balls.push(new Mover(random(5, 50), random(height)));
}

var draw = function() {
    background(169, 230, 232);
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < balls.length; j++) {
            balls[j].update();
            balls[j].checkEdges();
            balls[j].display();
            balls[j].collide(balls[i]);
        }
    }
    /*
    for (var i = 0; i < 20; i++) {
        balls[i].update();
        balls[i].checkEdges();
        balls[i].display();
    }
    
    var distance = dist(balls[j].position.x, balls[j].position.y, balls[i].position.x, balls[i].position.y);
    
    if (balls[j].position.x === balls[j].position.y) {
            this.velocity.y *= -1;   
            this.velocity.x *= -1;
            fill(0, 0, 255);
     
    }    
    */
};
