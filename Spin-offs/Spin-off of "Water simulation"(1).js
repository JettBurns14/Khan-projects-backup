// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-water-simulation/5050617244024832
// Created:  12/16/2015 07:00





/*********************************************************
*   Simple simulation of water
* How well does it simulate water?
* What is the effect of changing particle size?
*********************************************************/

var BACKGROUND = color(230, 240, 250);

frameRate(50);
var sansFont = createFont("sans", 15);

// Physical variables to play with
var elasticity = 0.4; // Energy lost on collision

// Display variable
var waterColor = color(92, 87, 230);

// How many iterations before updating the display
var framesNotShown = 3;
var running = false;

// Particle properties
var waterSize = 15;
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
        resetMatrix();
    }
};

/*******************************************************
 *      Making particles
********************************************************/
var particles = [];

var addWater = function() {
    //if (!particles.length || particles[particles.length - 1].y > 0) {
    if (particles.length < 20) {
        var x = random(5, 50);
        var y = random(5, 395);
        particles.push(new Particle(x, y, 10));
    }
};

/*******************************************************
 *      Make Interface
********************************************************/

/*
var toolbar = new Toolbar(8, 8, 120);

//toolbar.add('Slider', {
    name: "Size of particle",
    min: 1, max: 10, now: waterSize,
    trigger: function() {
        waterSize = this.val;
        waterSize2 = waterSize * 2;
        waterSizeS = sq(waterSize2);
    }
});

//toolbar.add('Slider', {
    name: "Gravity",
    max: 2, now: 0.2,
    decimalPlaces: 1,
    //trigger: function() { gravity = this.val / 10; }
});

//toolbar.add('Slider', {
    name: "Elasticity",
    min: 0.1, max: 1, now: 0.5,
    decimalPlaces: 2,
    trigger: function() { elasticity = this.val; }
});

//toolbar.add(Slider, {
    name: "Color",
    min: 0.1, max: 1, now: col,
    decimalPlaces: 2,
    hideVal: true,
    trigger: function() {
        col = this.val;
        waterColor = lerpColor(BLUE, GREEN, col) + (opacity << 24);
        this.stroke = lerpColor(BLUE, GREEN, col);
        this.fill = lerpColor(BLUE, GREEN, col);
    }
});
*/

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
            if (p.pos.y < 0) {
                p.pos.y = 0;
                p.velocity.y *= -1;
            }
            // Bottom of canvas
            if (p.pos.y > height) {
                p.pos.y = 400;
                p.velocity.y *= -1;
            }
            // Left side of canvas
            if (p.pos.x < 0) {
                p.pos.x = 0;
                p.velocity.x *= -1;
            }
            // Right side of canvas
            if (p.pos.x > 400) {
                p.pos.x = 400;
                p.velocity.x *= -1;
            }
        }   
    }
};

var drawInfo = function() {
    textAlign(LEFT, BASELINE);
    textSize(15);
    fill(0);
    if (running !== true) {
        text("Click to start", 170, 200);   
    } else {
        text("Number of particles: " + particles.length, 5, 30);
    }
};

var draw = function() {
    background(BACKGROUND);
    if (running === true) {
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
        line(0, 0, 20, 0);
        line(20, 0, 15, 5);
        line(20, 0, 15, -5);
        el(0, 0, waterSize, waterSize);
        p.update();
        popMatrix();
    }
    
    update(framesNotShown);
    drawInfo();
};

mousePressed = function() {
    running = true;  
};
