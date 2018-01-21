// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-osmosis/5334497800880128
// Created:  12/27/2015 08:48





/*********************************************************
*  Modelling osmosis.
*********************************************************/

// Physical variables to play with

var GRAVITY = 0;//0.001;    // Ignore this for now

// Determines initial speed of particles
var temperature = 3;

/***********************************************
 *  Simulation set-up
************************************************/

var totalParticles = 200;
var numberOfSoluteParticles1 = 0;   // Left side
var numberOfSoluteParticles2 = 20;   // Right side

var numberOfWaterParticles1 = totalParticles - numberOfSoluteParticles1;   // Left side
var numberOfWaterParticles2 = totalParticles - numberOfSoluteParticles2;   // Right side

var waterSize = 3;
var soluteSize = 6;

// Wall properties
var wallX = width / 2;

// Is the simulation running
var running = true;

// Difference in particles from one side to the other
// Use to calculate the average difference
var difference = 0;

// Number of iterations of simulation
var t = 0;

/***********************************************
 *  Display properties
************************************************/

var BACKGROUND = color(250, 250, 250);
var WATER_COLOUR = color(64, 95, 237);
var SOLUTE_COLOUR = color(250, 50, 190);

/***********************************************
 * Helper functions
************************************************/

var dotProduct = function(ax, ay, bx, by) {
    return ax * bx + ay * by;
};

/***********************************************
 * Particles represent atoms or moleucles.
 * They have a position and speed in two dimension.
 * They have size and mass for collisions.
 * They have a container to determine boundaries.
************************************************/
{
var Particle = function(x, y, r, c, mass) {
    // Position
    this.x = x;
    this.y = y;
    
    // Radius
    this.r = r;
    
    // Mass is the square of the radius by default
    this.mass = mass || sq(this.r);
    
    // Colour
    this.c = c;
    
    // Velocity
    var angle = random(0, 360);
    this.dx = 3 * cos(angle) / this.mass;
    this.dy = 3 * sin(angle) / this.mass;
};

Particle.prototype.draw = function() {
    fill(this.c);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
};

Particle.prototype.setWalls = function(container) {
    // Walls, shrunk so they are the boundaries for the center of particles
    this.x1 = container.x1 + this.r;
    this.y1 = container.y1 + this.r;
    this.x2 = container.x2 - this.r;
    this.y2 = container.y2 - this.r;
    
    this.bounceFunctions = [
        this.bounceLeft.bind(this),
        this.bounceRight.bind(this),
        this.bounceUp.bind(this),
        this.bounceDown.bind(this),
    ];
    
    if (container.membrane && this.r <= container.membrane.size) {
        var toMove = container.toMove;
        var originalFunc = this.bounceFunctions[container.membrane.direction];
    
        var permeate = function() {
            //if (floor(this.y / 5) % 4 === 0) {
                toMove.push(this);
            //} else {
            //    originalFunc();
            //}
        };
        
        this.bounceFunctions[container.membrane.direction] = permeate.bind(this);
    }
};

// Move ball based on its velocity
Particle.prototype.move = function() {
    this.x += this.dx;
    this.y += this.dy;
};

Particle.prototype.collide = function(that) {
    var dx = this.x - that.x;
    var dy = this.y - that.y;
    var dr = this.r + that.r;
    var d = dx * dx + dy * dy;
    
    if (d < dr * dr) {
        // Particles collide
        var collisionDist = sqrt(d);
        
        // Find unit vector in direction of collision
        var collisionVi = dx / collisionDist;
        var collisionVj = dy / collisionDist;
        
        // Find velocity of particle projected on to collision vector
        var collisionV1 = dotProduct(this.dx, this.dy, dx, dy) / collisionDist;
        var collisionV2 = dotProduct(that.dx, that.dy, dx, dy) / collisionDist;
        
        // Find velocity of particle perpendicular to collision vector
        var perpV1 = dotProduct(this.dx, this.dy, -dy, dx) / collisionDist;
        var perpV2 = dotProduct(that.dx, that.dy, -dy, dx) / collisionDist;
        
        // Find movement in direction of collision
        var sumMass = this.mass + that.mass;
        var diffMass = this.mass - that.mass;
        var v1p = (diffMass * collisionV1 + 2 * that.mass * collisionV2) / sumMass;
        var v2p = (2 * this.mass * collisionV1 - diffMass * collisionV2) / sumMass;
        
        // Update velocities
        this.dx = v1p * collisionVi - perpV1 * collisionVj;
        this.dy = v1p * collisionVj + perpV1 * collisionVi;
        that.dx = v2p * collisionVi - perpV2 * collisionVj;
        that.dy = v2p * collisionVj + perpV2 * collisionVi;
        
        // Move to avoid overlap
        var overlap = dr - collisionDist;
        this.x += collisionVi * overlap;
        this.y += collisionVj * overlap;
        that.x -= collisionVi * overlap;
        that.y -= collisionVj * overlap;
    }
};

// Bounce off walls
Particle.prototype.bounce = function() {
    if (this.x < this.x1) {
        this.bounceFunctions[0]();
    } else if (this.x > this.x2) {
        this.bounceFunctions[1]();
    }
    
    if (this.y < this.y1) {
        this.bounceFunctions[2]();
    } else if (this.y > this.y2) {
        this.bounceFunctions[3]();
    }
};

Particle.prototype.bounceLeft = function() {
    this.x = 2 * this.x1 - this.x;
    this.dx *= -1;
};

Particle.prototype.bounceRight = function() {
    this.x = 2 * this.x2 - this.x;
    this.dx *= -1;
};

Particle.prototype.bounceUp = function() {
    this.y = 2 * this.y1 - this.y;
    this.dy *= -1;
};

Particle.prototype.bounceDown = function() {
    this.y = 2 * this.y2 - this.y;
    this.dy *= -1;
};
}
/***********************************************
 * Containers represent bounded areas,
 * containing particles.
************************************************/
{
var Container = function(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    
    // Particles in the container
    this.particles = [];
    
    // Particles to move to another container
    this.toMove = [];
};

Container.prototype.addParticles = function(n, size, colour) {
    // Shrink boundary to get boundary for centers of particles
    var x1 = this.x1 + size + 1;
    var y1 = this.y1 + size + 1;
    var x2 = this.x2 - size - 1;
    var y2 = this.y2 - size - 1;
    
    // Add particles
    while (n > 0) {
        var x = map(random(), 0, 1, x1, x2);
        var y = map(random(), 0, 1, y1, y2);
        if (!this.overlap(x, y, size)) {
            var p = new Particle(x, y, size, colour);
            p.setWalls(this);
            this.particles.push(p);
            n--;
        }
    }
};

Container.prototype.overlap = function(x, y, r) {
    for (var i = 0, len = this.particles.length; i < len; i++) {
        var p = this.particles[i];
        var dx = p.x - x;
        var dy = p.y - y;
        var dr = p.r + r;
        
        if (dx * dx + dy * dy < dr * dr) {
            return true;
        }
    }
};

Container.prototype.draw = function() {
    var n = this.particles.length;
    
    noStroke();
    for (var i = 0; i < n; i++) {
        this.particle[i].draw();
    }
};

Container.prototype.update = function() {
    var n = this.particles.length;
    
    // Calculate collisions
    for (var i = 0; i < n; i++) {
        this.particles[i].dy += GRAVITY;
        for (var j = i + 1; j < n; j++){
            this.particles[i].collide(this.particles[j]);
        }
    }
    
    // Move and draw balls
    noStroke();
    for (i = 0; i < n; i++) {
        var p = this.particles[i];
        p.move();
        p.bounce();
        p.draw();
    }
    
    this.permeate();
};

Container.prototype.addSemiPermeableMembrane = function(direction, size, container2) {
    // Add a semi-permeable membrane in the given direction
    // Lets through particles less than the given size into container2
    // directions: 0 = left, 1 = right, 2 = up, 3 = down
    
    this.membrane = {
        direction: direction,
        size: size,
        container2: container2,
    };
};

Container.prototype.permeate = function() {
    // Move particles from one container to another
    for (var i = 0; i < this.toMove.length; i++) {
        var p = this.toMove[i];
        var index = this.particles.indexOf(p);
        
        // Remove from this container
        this.particles.splice(index, 1);
        
        // Change boundary of particle to second container
        p.setWalls(this.membrane.container2);
        
        // Move particles to second container
        this.membrane.container2.particles.push(p);
    }
    this.toMove.length = 0;
};
}
/***********************************************
 *  Simulation set-up
************************************************/
// Create containers
var leftContainer = new Container(0, 0, wallX, height);
var rightContainer = new Container(wallX, 0, width, height);

// Add membrane
leftContainer.addSemiPermeableMembrane(1, 4, rightContainer);
rightContainer.addSemiPermeableMembrane(0, 4, leftContainer);

// Add particles
leftContainer.addParticles(numberOfWaterParticles1, waterSize, WATER_COLOUR);
leftContainer.addParticles(numberOfSoluteParticles1, soluteSize, SOLUTE_COLOUR);
rightContainer.addParticles(numberOfWaterParticles2, waterSize, WATER_COLOUR);
rightContainer.addParticles(numberOfSoluteParticles2, soluteSize, SOLUTE_COLOUR);

/***********************************************
 *  Draw function
************************************************/

var drawWall = function() {
    strokeWeight(3);
    stroke(80);
    line(wallX, 0, wallX, height);
};

var drawArrow = function(x, y, dir) {
    var arrow1 = 15;
    var arrow2 = 25;
    
    beginShape();
    if (dir > 0) {
        vertex(x + arrow2, y + 10);
        vertex(x - arrow1, y + 8);
        vertex(x - arrow1, y);
        vertex(x - arrow1 - 15, y + 19);
        vertex(x - arrow1, y + 37);
        vertex(x - arrow1, y + 30);
        vertex(x + arrow2, y + 28);
    } else {
        vertex(x - arrow2, y + 10);
        vertex(x + arrow1, y + 8);
        vertex(x + arrow1, y);
        vertex(x + arrow1 + 15, y + 19);
        vertex(x + arrow1, y + 37);
        vertex(x + arrow1, y + 30);
        vertex(x - arrow2, y + 28);
    }
    endShape(CLOSE);
};

var drawInfo = function() {
    var y = 5;
    var w = 120;
    var x1 = wallX - 120;
    var x2 = wallX + 120;
    var h = 36;
    
    var n1 = leftContainer.particles.length - totalParticles;
    var n2 = rightContainer.particles.length - totalParticles;
    
    difference += n1;
    var average = difference / t;
    
    n1 = n1 >= 0 ? "+" + n1: n1;
    n2 = n2 >= 0 ? "+" + n2: n2;
    
    noStroke();
    fill(0, 0, 0, 100);
    rect(x1 - w/2 + 2, y + 2, w, h, 10);
    rect(x2 - w/2 + 2, y + 2, w, h, 10);
    
    fill(BACKGROUND);
    strokeWeight(1);
    stroke(80);
    rect(x1 - w/2, y, w, h, 10);
    rect(x2 - w/2, y, w, h, 10);
    //rect(wallX - 50/2, y, 50, h, 10);
    
    // Arrow showing net movement of particle
    noStroke();
    fill(0, 0, 0, 100);
    drawArrow(wallX + 2, 6, difference);
    fill(WATER_COLOUR);
    drawArrow(wallX, 5, difference);
    
    fill(20);
    textAlign(CENTER, BASELINE);
    textSize(14);
    text("Total particles", x1, y + h/2 - 2);
    text("Total particles", x2, y + h/2 - 2);
    
    textAlign(CENTER, TOP);
    text(leftContainer.particles.length + " (" + n1 + ")", x1, y + h/2 + 1);
    text(rightContainer.particles.length + " (" + n2 + ")", x2, y + h/2 + 1);
    fill(255);
    text("" + abs(average.toFixed(2)), wallX, y + h/4 + 2);
};

/***********************************************
 *  Main loop
************************************************/

var draw = function() {
    background(BACKGROUND);

    if (running) {
        t++;
        leftContainer.update();
        rightContainer.update();
    }

    drawWall();
    drawInfo();
};

mouseClicked = function() {
    running = !running;
};
