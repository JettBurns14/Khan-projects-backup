// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-water-simulation/5230687166267392
// Created:  12/24/2015 07:06





/*********************************************************
*   Simple simulation of water
* How well does it simulate water?
* What is the effect of changing particle size?
*********************************************************/

// Feel free to change these!
var BACKGROUND = color(230, 240, 250);
var numParticles = 13;
var particleSize = 15;
var time = 20; // seconds

//frameRate(50);
var sansFont = createFont("sans", 15);

// Physical variables to play with
var elasticity = 0.4; // Energy lost on collision

// Display variable
var waterColor = color(92, 87, 230);

// How many iterations before updating the display
var framesNotShown = 3;
var running = false;
var timer = 0;

// Particle properties
var waterSize = particleSize;
var waterSize2 = waterSize * 1;
var waterSizeS = sq(waterSize2);

var initialSpeed = 0.4;

var dotProduct = function(ax, ay, bx, by) {
    return ax * bx + ay * by;
};

var forEach = function(arr, func) {
    var i, n = arr.length;
    for (i = 0; i < n; i++) {
        arr[i][func]();
    }
};

/*******************************************************
 *      Particle object
********************************************************/

var Particle = function(x, y, mass) {
    // Position
    this.pos = new PVector(x, y);
    this.mass = mass;
    this.velocity = new PVector(random(-2, 2), random(-2,2));
    
    // Velocity
    var speed = initialSpeed * random() / waterSize;
    var angle = 360 * random();
    this.d = speed * cos(angle);
};

Particle.prototype.update = function() {
    this.pos.add(this.velocity);  
};

Particle.prototype.collide = function(that) {
    
    var dx = this.pos.x - that.pos.x;
    if (dx > waterSize2) { return; }
    
    var dy = this.pos.y - that.pos.y;
    if (dy > waterSize2) { return; }
    
    var d = dx * dx + dy * dy;
    
    if (d < waterSizeS) {
        // Particles collide
        var collisionDist = sqrt(d + 0.1);
        var collisionDistI = 1 / sqrt(d + 0.1);
        
        // Find unit vector in direction of collision
        var collisionVi = dx * collisionDistI;
        var collisionVj = dy * collisionDistI;
        
        // Find velocity of particle projected on to collision vector
        var collisionV1 = dotProduct(this.d, this.d, dx, dx) * collisionDistI;
        var collisionV2 = dotProduct(that.d, that.d, dy, dy) * collisionDistI;
        
        // Find velocity of particle perpendicular to collision vector
        var perpV1 = dotProduct(this.d, this.d, dx, dx) * collisionDistI;
        var perpV2 = dotProduct(that.d, that.d, dy, dy) * collisionDistI;
        
        // Find movement in direction of collision
        var v1p = collisionV2 * -elasticity;
        var v2p = collisionV1 * -elasticity;
        
        // Update velocities
        this.d = v1p * collisionVi - perpV1 * collisionVi;
        this.d = v1p * collisionVi + perpV1 * collisionVi;
        that.d = v2p * collisionVi - perpV2 * collisionVi;
        that.d = v2p * collisionVi + perpV2 * collisionVi;
        
        // Move to avoid overlap
        var overlap = (waterSize - collisionDist + 0.5) * 0.5;
        this.pos.x += collisionVi * overlap;
        this.pos.y += collisionVj * overlap;
        that.pos.x -= collisionVi * overlap;
        that.pos.y -= collisionVj * overlap;
    }
};

Particle.prototype.collideWithWalls = function(x, y) {
    rectMode(CENTER);
    if (this.pos.x > x-20 && this.pos.x < x+20 && this.pos.y < y+20 && this.pos.y > y-20) {
        this.velocity.x *= -1;
    }
    
    rect(x, y, 30, 30);
    
};
/*******************************************************
 *      Making particles
********************************************************/
var particles = [];

var addWater = function() {
    if (particles.length < numParticles) {
        var r = random(1);
        
        if (r < 0.85) {
            particles.push(new Particle(random(50, 100), random(60, 345)));
        } else {
            particles.push(new Particle(random(300, 350), random(60, 345)));  
        }
    }
};

/*******************************************************
 *      Main loop
********************************************************/

var update = function(n) {
    var p, i, j, particleCount;
    
    for (var t = n; t--;) {
        particleCount = particles.length;
        
        for (i = particleCount; i--;) {
            p = particles[i];
            for (j = i + 1; j < particleCount; j++) {
                p.collide(particles[j]);
            }
            // Top of canvas
            if (p.pos.y < 50) {
                p.pos.y = 50;
                p.velocity.y *= -1;
            }
            // Bottom of canvas
            if (p.pos.y > 350) {
                p.pos.y = 350;
                p.velocity.y *= -1;
            }
            // Left side of canvas
            if (p.pos.x < 50) {
                p.pos.x = 50;
                p.velocity.x *= -1;
            }
            // Right side of canvas
            if (p.pos.x > 350) {
                p.pos.x = 350;
                p.velocity.x *= -1;
            }
            p.collideWithWalls(200, 65);
            p.collideWithWalls(200, 155);
            p.collideWithWalls(200, 245);
            p.collideWithWalls(200, 335);
        }   
    }
};

var drawInfo = function() {
    textAlign(LEFT, BASELINE);
    textSize(15);
    fill(0);
    if (running !== true) {
        text("Click to start", 170, 200);   
    }
    //text("Number of particles: " + particles.length, 122, 18);
    text("---------- Concentration gradient ---------->", 66, 40);
    text(timer/50, 155, 20);
    text("seconds", 204, 20);
    if (timer === time*50) {
        text("See how this system has spread out? \n                This is diffusion!", 78, 200);   
    }
};

var draw = function() {
    background(BACKGROUND);
    noFill();
    rectMode(CORNER);
    rect(50, 50, 300, 300);
    if (running && timer < time*50) {
        timer++;
        addWater();
    }
    
    var p;
    var el = ellipse;
    
    fill(waterColor);
    for (var i = 0; i < particles.length; i++) {
        p = particles[i];
        var v = p.velocity.heading();
        pushMatrix();
        translate(p.pos.x, p.pos.y);
        rotate(v);
        stroke(0);
        line(0, 0, waterSize*1.5, 0);
        line(waterSize*1.5, 0, waterSize*1, 5);
        line(waterSize*1.5, 0, waterSize*1, -5);
        el(0, 0, waterSize, waterSize);
        if (timer < time*50) {
            p.update();
        }
        popMatrix();
    }
    update(framesNotShown);
    drawInfo();
};

mousePressed = function() {
    running = true;  
};
