// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-generating-jellyfish-contest-generative-art-entry/5081067513053184
// Created:  08/24/2015 13:14






/** Generating Jellyfish * by taco_launcher
 * 
 * Medusozoa, also known as the jellyfish, is a marine
 * animal. A group of jellyfish can be called a
 * "bloom".  Jellyfish eat meat: plankton,
 * crustaceans, fish eggs, small fish, and other
 * jellyfish. Most jellyfish lifespans usually range
 * from a few hours to many months, depending on the
 * species.
 * 
 * 
 * Source (in MLA format):
 * 
 * "Jellyfish." Wikipedia. Wikimedia Foundation. Web. 11 June 2015. 
 * <http://en.wikipedia.org/wiki/Jellyfish>.
 
 ****************************************************
 * 
 * I'm an 8th grade girl from Minnesota who has been
 * programming for about six months.
 * 
 * I am passionate about programming because it's an
 * onerous activity that demands both analytical and
 * creative intelligence to orginate a work of
 * proficiency.
 * 
*/



// Tentacle constructor function
var Tentacle = function (xPos, size, vel, acc) {
    this.position = new PVector (random(-xPos, xPos), 0);
    this.velocity = new PVector (0, vel);
    this.acceleration = new PVector (0, acc);

    this.angle = 0;
    this.fade = 255;
    this.color = random(200, 255);
    this.size = size;
};

// update the "Tentacle"s
Tentacle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(1);
    this.position.add(this.velocity);
    this.fade -= 1.2;
    this.color += 0.1;
    this.angle += random(-3, 3);
};

// display the "Tentacle"s
Tentacle.prototype.display = function() {
    pushMatrix();
    rotate(this.angle);
    noStroke();
    fill(this.color, 255, 255, this.fade);
    ellipse(this.position.x, this.position.y, this.size, this.size);
    popMatrix();
};


// creates the Oral Arms
var oralArms = [];
for (var i = 0; i < 3; i++) {
    oralArms[i] = new Tentacle (0, 10, 0, 0.1);
}


// creates the Tentacles
var tentacles = [];
for (var i = 0; i < 8; i++) {
    tentacles[i] = new Tentacle (45, 3, 1, 0);
}



// variables for the first arc
var arc1Width = 100;
var arc1Height = 100;
var arc1Color = 190;

// variable for the second arc
var arc2Height = 0;

// the x translation, the y translation, and the rotation
var positions = [random(2, 2.5), random(2, 2.5), random(-45, 45)];


background(0); // deep, dark sea

draw = function() {

    pushMatrix();

    // positions the jelly fish
    translate(width/positions[0], height/positions[1]);
    rotate(positions[2]);

    // animates and draws the second arc
    if (arc2Height > -15) {
        noFill();
        stroke(204, 255, 253);
        arc(0, 15, 120, arc2Height, 0, 360);
        arc2Height-=1;
    }

    

    // runs the "oralArms"
    for (var i = 0; i < oralArms.length; i++) {
        oralArms[i].display();
        oralArms[i].update();
    }

    // runs the "tentacles"
    for (var i = 0; i < tentacles.length; i++) {
        tentacles[i].display();
        tentacles[i].update();
    }

    // animates and draws the first arc
    if (arc1Height > 0) {
        stroke(arc1Color, 255, 255);
        arc(0, 15, arc1Width, arc1Height, 180, 360);
        arc1Height-=1;
        arc1Color+=0.8;
        
        if (arc1Height < 100) {
            arc1Width+=0.2;
        }
    }
    
    popMatrix();


    // little circles in the background
    if (frameCount < 300) { // limits the circles
        fill(255, 255, 255, 7);
        noStroke();
        ellipse(random(0, width), random(0, height), 5, 5);
    } else {
        Program.restart(); // restarts the program
    }
        
};
