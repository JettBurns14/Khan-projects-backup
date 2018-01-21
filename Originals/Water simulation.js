// Link:  https://www.khanacademy.org/computer-programming/water-simulation/5563150401667072
// Created:  01/23/2016 07:31





/** PLEASE READ THE INSTRUCTIONS AND TRY IT! IT'S FASCINATING!

This is a real phenomenon, I've done it myself.
This simulation replicates exactly what I see when I do this expiriment.
IF IT STOPS WORKING, JUST PRESS RESTART BELOW THE PROGRAM.

1. Turn on the sink water; it needs to be a very thin stream.
2. Take a DRY comb and run it through your DRY hair several times.
3. Don't touch anything, then hold the comb next to the stream of water.
4. The water will bend towards the comb, even up to a few inches!
5. Please let me know how it works for you in the tips and thanks!

P.S. If you want, make a spin-off and show me what it looked like for you!

@Jett_Burns
**/

angleMode = "radians";
frameRate(60);

// This is the strength of gravity. (Bigger, more powerful)
var gravity = new PVector(0, 0.03); 
// This controls the combs pulling power. (Smaller, more powerful)
var combForce = 350;
// This hides the explanation.
var show = false;

// This is the Comb's constructor
var Comb = function(x, y) {
    this.power = 1200;
    this.position = new PVector(x, y);
};
// This draws the comb
Comb.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    rectMode(CENTER);
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(12.9);
    rect(-1, 94, 20, 143, 13);
    rect(0, 0, 34, 143, 13);
    for(var i = 0; i < 27; i++) {
        rect(i*0+23, i*5-65, 20, 1);   
    }
    popMatrix();
};
// This makes the comb pull on the water
Comb.prototype.calculatePullForce = function(p) {
    // Calculate direction of force
    var dir = PVector.sub(this.position, p.position); 
    // Distance between objects
    var d = dir.mag();
    // Normalize direction vector 
    dir.normalize();
    // Keep distance within a reasonable range
    d = constrain(d, 20, combForce);    
    // Pulling force is inversely proportional to distance
    var force = 1 * this.power/ (d * d);          
    // Get force vector --> magnitude * direction
    dir.mult(force);                             
    return dir;
};

// This is the particles constructor
var Particle = function(position) {
    this.acceleration = new PVector(0, 0);
    this.velocity = new PVector(random(-1, 1)/15, 0);
    this.position = position.get();
    this.mass = 8;
};
// This updates and displays the particles
Particle.prototype.run = function() {
    this.update();
    this.display();
};
// This is the formula for gravity
Particle.prototype.applyForce = function(force) {
    var f = force.get();
    f.div(this.mass);
    this.acceleration.add(f);
};
// This moves the water particles
Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
// This draws the water particles
Particle.prototype.display = function() {
    fill(184, 184, 184);
    rect(199, -6, 70, 44, 12);
    stroke(0, 0, 0,150);
    strokeWeight(2);
    fill(0, 166, 255, 150);
    ellipse(this.position.x, this.position.y, this.mass, this.mass);
};
// This redraws the particles at the top if they move past 410
Particle.prototype.isDead = function(){
    if (this.position.y > 410) {
        return true;
    } else {
        return false;
    }
};

// This is the particleSystem constructor
var ParticleSystem = function(position) {
    this.origin = position.get();
    this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.applyForce = function(f){
    for(var i = 0; i < this.particles.length; i++){
        this.particles[i].applyForce(f);
    }
};
ParticleSystem.prototype.applyGravity = function() {
    for(var i = 0; i < this.particles.length; i++) {
        var particleG = gravity.get();
        particleG.mult(this.particles[i].mass);
        this.particles[i].applyForce(particleG);
    }
};
ParticleSystem.prototype.applyPull = function(comb) {
    for(var i = 0; i < this.particles.length; i++){
        var p = this.particles[i];
        var force = comb.calculatePullForce(p);
        p.applyForce(force);
    }
};
ParticleSystem.prototype.run = function(){
	for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
        this.particles.splice(i, 1);
    }
  }
};

var particleSystem = new ParticleSystem(new PVector(width/2, 20));
var comb = new Comb(110, 176);

draw = function() {
    background(214, 255, 171);
    particleSystem.applyGravity();
    particleSystem.applyPull(comb);
    comb.display();
    particleSystem.addParticle();
    particleSystem.run();
    fill(0);
    textSize(11);
    textFont(createFont("sans"));
    text("<--INSTRUCTIONS IN CODE", 0, 12);
    text("Sink Faucet", 241, 13);
    text("Comb", 50, 170);
    text("Thin Stream\nof Water", 213, 70);
    if (show === true) {
        text("When you brushed that comb through \nyour hair, tiny parts of the atoms in\nyour hair, called ELECTRONS, \ncollected on the comb. These \nelectrons have a NEGATIVE charge. \nRemember that, its important. Now \nthat the comb has a negative charge,\nit is attracted to things that have a\nPOSITIVE charge. It is similar to the way\nsome magnets are attracted to certain \nmetals. Water is made up of H2O, two \nhydrogen atoms and one oxygen. The \ntwo postive hydrogens were attracted to \nthe negative comb, and they are pulled \ntowards it!", 196, 200);
        textSize(25);
        text("_", 101, 174);
        text("+", 150, 204);
    }
    if (show === false) {
        text("Click to Find Out \nWhy It Bends!", 250, 250);
    }
};
mouseClicked = function() {
    show = true;
    /* Made by Jett Burns */
};
