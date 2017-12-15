// Link:  https://www.khanacademy.org/cs/spin-off-of-on-fire/5282903807361024
// Created:  08/12/2015 17:28




angleMode = "radians";

var Particle = function(position) {
    this.acceleration = new PVector(0, -0.04);
    this.velocity = new PVector(random(-1, 1), random(-1, 0));
    this.position = position.get();
    this.timeToLive = 100;
};

Particle.prototype.run = function() {
    this.update();
    this.display();
};

Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.timeToLive -= 2;
};

Particle.prototype.display = function() {
    noStroke();
    //  hsb
    colorMode(HSB);
    var hue = (300-this.timeToLive);
    fill(153, hue, 255, this.timeToLive);
    //fill(155, 242, 242);
    //fill(0, 242, 255);
    
    ellipse(this.position.x, this.position.y, 12, 12);
};

Particle.prototype.isDead = function() {
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

var ParticleSystem = function(position) {
    this.origin = position.get();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
    for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};

var systems = [];
for(var i = 0; i< 10; i++){
    systems.push(new ParticleSystem(new PVector(149+i*13, 283)));
}

draw = function() {
    textFont(createFont("fantasy"));
    colorMode(RGB);
    background(3, 15, 66);
    colorMode(RGB);
    textAlign(CENTER, CENTER);
    textSize(60);
    fill(50, 155, 171);
    text("Jett", 200, 168);
    text("Burns", 205, 220);
    textSize(20);
    text("A program made by", 200, 130);
    for (var i = 0; i < systems.length; i++){
        systems[i].addParticle();
        systems[i].run();
    }
};
