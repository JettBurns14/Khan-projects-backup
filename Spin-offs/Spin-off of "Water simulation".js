// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-water-simulation/5656260489379840
// Created:  12/11/2015 08:27





/*********************************************************
*   Simple simulation of water
* How well does it simulate water?
* What is the effect of changing particle size?
*********************************************************/

var BACKGROUND = color(230, 240, 250);
var RED = color(255, 0, 0);
var BLUE = color(0, 0, 255);
var GREEN = color(0, 255, 0);
var YELLOW = color(255, 255, 0);
    
frameRate(40);
noStroke();
var sansFont = createFont("sans", 15);

// Physical variables to play with
var gravity = 0.2; // Force due to gravity
var elasticity = 0.4; // Energy lost on collision

// Display variable
var col = 0.3;
var opacity = 200;
var waterColor = lerpColor(BLUE, GREEN, col) + (opacity << 24);

// How many iterations before updating the display
var framesNotShown = 3;

// Very rough estimation of number of computations done
var computations = 0;

// Particle properties
var waterSize = 7;
var waterSize2 = waterSize * 2;
var waterSizeS = sq(waterSize2);

var waterMass = 10;
var waterMass2 = 2 * waterMass;

var initialSpeed = 0.4;

var cupH = 69;
var cupW = 254;

var cupY1 = 190;
var cupY2 = cupY1 + cupH;

var cupX = 216;
var cupX1 = cupX - cupW / 2;
var cupX2 = cupX + cupW / 2;

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
 * Generic GUI component from which other elements inherit
 * The default object is basically a button
********************************************************/
{
var GUI_Component = function(x, y, w, h, name, updateFunction) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.name = name;
    
    if (updateFunction) {
        this.trigger = updateFunction.bind(this);
    }
    
    this.selected = false;
    this.disabled = false;
    this.transition = 0;
};

GUI_Component.prototype.draw = function() {
    if (this.mouseOver()) {
        fill(100);
    } else {
        fill(200);
    }
    
    noStroke();
    rect(this.x, this.y, this.w, this.h, 12);
    
    fill(20);
    textFont(sansFont, 15);
    textAlign(CENTER, CENTER);
    text(this.name, this.x + this.w / 2, this.y + this.h/2 + 1);
};

GUI_Component.prototype.mouseOver = function() {
    return (mouseX >= this.x && mouseX <= this.x + this.w &&
            mouseY >= this.y && mouseY <= this.y + this.h);
};

GUI_Component.prototype.mousePressed = function() {
    this.selected = this.mouseOver();
};

GUI_Component.prototype.mouseDragged = function() {};

GUI_Component.prototype.mouseReleased = function() {
    if (this.selected && !this.disabled && this.mouseOver()) {
        this.trigger();
    }
    this.selected = false;
};

GUI_Component.prototype.trigger = function() {
    // To be over-written
};

GUI_Component.prototype.fade = function() {
    if (this.selected || this.mouseOver()) {
        this.transition = min(10, this.transition + 1);
    } else {
        this.transition = max(0, this.transition - 1);
    }
};
}

/*******************************************************
 * GUI Slider
********************************************************/
{
var Slider = function(x, y, w, h, params) {
    // Size of ball
    this.ballR = params.ballR || h / 2;
    this.ballD = this.ballR * 2;
    
    x += this.ballR;
    w -= this.ballR * 2;
    
    var h = this.ballD + (params.name ? 16 : 0);
    y += h - this.ballR;
    
    GUI_Component.call(this, x, y, w, h, params.name, params.trigger);
    
    this.x2 = x + w;
    this.fill = params.fill || color(240);
    this.stroke = params.stroke || color(180);
    
    this.min = params.min || 0;
    this.max = params.max === undefined ? 1 : params.max;
    this.val = params.now === undefined ? this.min : params.now;
    this.decimalPlaces = params.decimalPlaces === undefined ? 0 : params.decimalPlaces;
    this.setValue(this.val);
    this.trigger();
    
    this.hideVal = params.hideVal || false;
};
Slider.prototype = Object.create(GUI_Component.prototype);

Slider.prototype.draw = function() {
    if (this.name) {
        fill(20);
        textSize(13);
        textAlign(CENTER, BASELINE);
        text(this.name,  this.x + this.w / 2, this.y - 14);
        //text(this.name + ": " + this.val,  this.x + this.w / 2, this.y - 14);
    }
    
    this.fade();
    fill(lerpColor(color(this.fill), color(this.stroke), this.transition / 10));
    stroke(this.stroke);
    strokeWeight(3);
    line(this.x, this.y, this.x2, this.y);
    ellipse(this.bx, this.y, this.ballD, this.ballD);
    
    if (!this.hideVal) {
        fill(20);
        textSize(11);
        textAlign(CENTER, CENTER);
        text("" + this.val, this.bx, this.y);
    }
};

Slider.prototype.mouseOver = function() {
    return dist(mouseX, mouseY, this.bx, this.y) < this.ballR;
};

Slider.prototype.mousePressed = function() {
    if (this.mouseOver()) {
        this.selected = true;
        return true;
    }
};

Slider.prototype.mouseDragged = function() {
    if (this.selected) {
        this.bx = constrain(mouseX, this.x, this.x2);
        var p = pow(10, this.decimalPlaces);
        this.val = round(map(this.bx, this.x, this.x2, this.min, this.max) * p) / p;
        this.trigger();
        return true;
    }
};

Slider.prototype.setValue = function(v) {
    this.val = constrain(v, this.min, this.max);
    this.bx = map(this.val, this.min, this.max, this.x, this.x2);
    this.trigger();
};
}

/*******************************************************
 *      Toolbar
 *  Like GUI but is displayed and has methods for adding
 * components like buttons and sliders.
********************************************************/
{
var Toolbar = function(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = 8;
    this.components = [];
};

Toolbar.prototype.draw = function() {
    if (!this.components.length) { return; }
    
    fill(250);
    strokeWeight(1);
    stroke(180);
    rect(this.x, this.y, this.w, this.h, 8);
    forEach(this.components, 'draw');
};

Toolbar.prototype.add = function(type, params) {
    params = params || {};
    var h = params.h || 20;
    var component;
    
    if (type === 'Slider') {
        component = new Slider(this.x + 5, this.y + this.h, this.w - 10, h, params);
    }
    
    if (component) {
        this.components.push(component);
        this.h += component.h + 12;
    }
    
};

Toolbar.prototype.mousePressed = function() {
    forEach(this.components, 'mousePressed');
};

Toolbar.prototype.mouseReleased = function() {
    forEach(this.components, 'mouseReleased');
};

Toolbar.prototype.mouseDragged = function() {
    forEach(this.components, 'mouseDragged');
};
}

/*******************************************************
 *      Particle object
********************************************************/
// Particles have a position, speed, colour and masss
var Particle = function(x, y, mass) {
    // Position
    this.x = x;
    this.y = y;
    this.mass = mass;
    
    // Velocity
    var speed = initialSpeed * random() / waterSize;
    var angle = 360 * random();
    this.dx = speed * cos(angle);
    this.dy = speed * sin(angle);
};

Particle.prototype.collide = function(that) {
    
    var dx = this.x - that.x;
    if (dx > waterSize2) { return; }
    
    var dy = this.y - that.y;
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
        var collisionV1 = dotProduct(this.dx, this.dy, dx, dy) * collisionDistI;
        var collisionV2 = dotProduct(that.dx, that.dy, dx, dy) * collisionDistI;
        
        // Find velocity of particle perpendicular to collision vector
        var perpV1 = dotProduct(this.dx, this.dy, -dy, dx) * collisionDistI;
        var perpV2 = dotProduct(that.dx, that.dy, -dy, dx) * collisionDistI;
        
        // Find movement in direction of collision
        var v1p = collisionV2 * elasticity;
        var v2p = collisionV1 * elasticity;
        
        // Update velocities
        this.dx = v1p * collisionVi - perpV1 * collisionVj;
        this.dy = v1p * collisionVj + perpV1 * collisionVi;
        that.dx = v2p * collisionVi - perpV2 * collisionVj;
        that.dy = v2p * collisionVj + perpV2 * collisionVi;
        
        // Move to avoid overlap
        var overlap = (waterSize2 - collisionDist + 0.5) * 0.5;
        this.x += collisionVi * overlap;
        this.y += collisionVj * overlap;
        that.x -= collisionVi * overlap;
        that.y -= collisionVj * overlap;
        computations++;
    }
};

/*******************************************************
 *      Making particles
********************************************************/
var particles = [];

var addWater = function() {
    if (!particles.length || particles[particles.length - 1].y > 0) {
        var x = cupX + random() - 0.5;
        var y = -waterSize2;
        particles.push(new Particle(x, y, waterMass));
    }
};

/*******************************************************
 *      Make Interface
********************************************************/

var toolbar = new Toolbar(8, 8, 120);

toolbar.add('Slider', {
    name: "Size of particle",
    min: 1, max: 10, now: waterSize,
    trigger: function() {
        waterSize = this.val;
        waterSize2 = waterSize * 2;
        waterSizeS = sq(waterSize2);
    }
});

toolbar.add('Slider', {
    name: "Gravity",
    max: 2, now: 0.2,
    decimalPlaces: 1,
    trigger: function() { gravity = this.val / 10; }
});

toolbar.add('Slider', {
    name: "Elasticity",
    min: 0.1, max: 1, now: 0.5,
    decimalPlaces: 2,
    trigger: function() { elasticity = this.val; }
});

toolbar.add(Slider, {
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

/*******************************************************
 *      Main loop
********************************************************/

var update = function(n) {
    var p, i, j, particleCount;
    computations = 0;
    
    for (var t = n; t--;) {
        particleCount = particles.length;
        computations = (particleCount * particleCount + 3 * particleCount) / 2;
        
        // Calculate acceleration
        /***************************************/
        for (i = particleCount; i--;) {
            p = particles[i];
            p.dy += gravity;
            for (j = i + 1; j < particleCount; j++) {
                p.collide(particles[j]);
            }
        }
        /***************************************/
        
        // Move particles
        var y = cupY2 - waterSize;
        var x1 = cupX1 + 6 + waterSize;
        var x2 = cupX2 - 6 - waterSize;
        
        for (i = particleCount; i--;) {
            p = particles[i];

            // Bounce off cup
            // Within cup
            if (p.y < y + 10 && p.x > cupX1 && p.x < cupX2) {
                p.y += p.dy;
                p.x += p.dx;
                
                if (p.y > cupY1) {
                    // Lower edge
                    if (p.y > y) {
                        p.y = y;
                        p.dy *= -elasticity;
                        computations++;
                    }
                    
                    if (p.x < x1) {
                        // Left edge
                        p.x = x1;
                        p.dx *= -elasticity;
                        computations++;
                    } else if (p.x > x2) {
                        // Right edge
                        p.x = x2;
                        p.dx *= -elasticity;
                        computations++;
                    }
                }
            } else {
                p.x += p.dx;
                p.y += p.dy;
            }
            
            if (p.y > height + waterSize) {
                particles.splice(i, 1);
            }
        }   
    }
};

var drawInfo = function() {
    textAlign(LEFT, BASELINE);
    textSize(15);
    fill(0);
    text(this.__frameRate, 5, height - 60);
    text("Number of particles: " + particles.length, 5, height - 48);
    text("Computations per tick: " + computations, 5, height - 30);
    
    var p = min(1, norm(computations, 0, 80000));
    if (p < 0.5) {
        fill(lerpColor(GREEN, YELLOW, p * 2));
    } else {
        fill(lerpColor(YELLOW, RED, p * 2 - 1));
    }
    
    noStroke();
    rect(0, height - 25, width, 25);
    stroke(0);
    strokeWeight(3);
    line(width * p, height - 25, width * p, height);
};

var draw = function() {
    background(BACKGROUND);
    
    if (particles.length < 400) {
        if (frameCount % waterSize === 0) {
            addWater();
        }
    }
    
    var p;
    var el = ellipse;
    
    noStroke();
    fill(waterColor);
    for (var i = 0; i < particles.length; i++) {
        p = particles[i];
        el(p.x, p.y, waterSize2, waterSize2);
    }
    
    // Draw cup
    fill(60);
    rect(cupX1, cupY2, cupW, 6, 6);
    rect(cupX1, cupY1, 6, cupH + 6, 6);
    rect(cupX2 - 6, cupY1, 6, cupH + 6, 6);
    
    update(framesNotShown);
    toolbar.draw();
    drawInfo();
};

/*******************************************************
 * Event handling
********************************************************/

mousePressed = function() {
    toolbar.mousePressed();
};

mouseReleased = function() {
    toolbar.mouseReleased();
};

mouseDragged = function() {
    toolbar.mouseDragged();
};

mouseOut = function() {
    toolbar.mouseReleased();
};
