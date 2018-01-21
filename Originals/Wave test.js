// Link:  https://www.khanacademy.org/computer-programming/wave-test/5770053977243648
// Created:  02/05/2016 21:13





//scale(6);
//translate(-205, -211);
var Wave = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
};
Wave.prototype.draw = function() {
    strokeWeight(1);
    stroke(168, 168, 168);
    
    beginShape();
    curveVertex(this.x+5, this.y+38);
    curveVertex(this.x, this.y+15);
    curveVertex(this.x-0.5, this.y+5);
    curveVertex(this.x+0.5, this.y+-6);
    curveVertex(this.x, this.y-15);
    curveVertex(this.x+-5, this.y-38);
    endShape();
    noStroke();
    fill(0);
    //rect(240, 75, 20, 38);
    //rect(240, 258, 20, 38);
};
Wave.prototype.move = function() {
    this.y -= this.speed;  
    if (this.y < 69) {
        this.y = 307;   
    }
};

var Foam = function(x, y, w, speed) {
    Wave.call(this, x, y, speed);
    this.w = w;
};
Foam.prototype = Object.create(Wave.prototype);
Foam.prototype.draw = function() {
    
    //fill(209, 209, 209);
    fill(255, 255, 255);
    quad(this.x-this.w, this.y, this.x, this.y-(this.w/2), this.x+this.w, this.y, this.x, this.y+(this.w/2));
};
Foam.prototype.move = function() {
    this.x -= (this.speed/2);
    this.y -= (this.speed/3);
    this.w -= (this.speed/5);
    //this.w = constrain(this.w, 0, 30);
    if (this.w < 1) {
        this.x = random(294, 300);
        this.y = random(297, 303);
        this.w = random(random(10, 15));
    }
};

var Block = function(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = 1.82 * this.h;
};
Block.prototype.right = function() {
    noStroke();
    
    // Middle color: RIGHT
    fill(138);    
    quad(this.x, this.y, this.x, this.y+21, this.x+this.w, this.y-this.h+21, this.x+this.w, this.y-this.h);
    
    // Darkest color: LEFT
    fill(84);
    quad(this.x, this.y, this.x, this.y+21, this.x-18, this.y+11, this.x-18, this.y+-10);
    
    // Lightest color: TOP
    fill(184);
    quad(this.x, this.y, this.x+this.w, this.y-this.h, this.x+this.w-18, this.y-this.h-10, this.x-18, this.y+-10);
};
Block.prototype.left = function() {
    noStroke();
    
    // Middle color: RIGHT
    fill(138); 
    quad(this.x, this.y, this.x, this.y+21, this.x+18, this.y+11, this.x+18, this.y-10);
    
    // Darkest color: LEFT
    fill(84);
    quad(this.x, this.y, this.x, this.y+21, this.x-this.w, this.y-this.h+21, this.x-this.w, this.y-this.h);
    
    // Lightest color: TOP
    fill(184);
    quad(this.x, this.y, this.x+18, this.y-10, this.x-this.w+18, this.y-this.h-10, this.x-this.w, this.y-this.h);
};
Block.prototype.up = function() {
    noStroke();
    
    // Middle color: RIGHT
    fill(138);    
    quad(this.x, this.y-this.h, this.x, this.y+21, this.x+18, this.y+11, this.x+18, this.y-this.h);
    
    // Darkest color: LEFT
    fill(84);
    quad(this.x, this.y-this.h, this.x, this.y+21, this.x-18, this.y+11, this.x-18, this.y-this.h);
    
    // Lightest color: TOP
    fill(184);
    quad(this.x, this.y-this.h+10, this.x+18, this.y-this.h, this.x+0, this.y-this.h-10, this.x-18, this.y-this.h);
};

var block = new Block(74, 296, 89); // right
var block2 = new Block(220, 217, 80); // left
var block3 = new Block(75, 274, 147); // up
var block4 = new Block(294, 367, 74); // left dark
var block5 = new Block(197, 112, 63); // right dark

var wave = [];
var foam = [];


// Waterfall
for (var i = 0; i < 8; i++) {
    wave.push(new Wave(291, 166+i*30, 0.5));
    wave.push(new Wave(300, 166+i*30, 0.5));
}
// Waterfall ripples
for (var i = 0; i < 3; i++) {
    //wave.push(new Wave(random(247, 253), 90+i*random(5), -2));
}
// Foam under falls
for (var i = 0; i < 15; i++) {
    foam.push(new Foam(random(297, 300), random(294, 300), random(10, 15), 1));   
}

draw = function() {
    background(0, 0, 0);
    //block2.left();
    block3.up();
    //block5.right();
    block2.left();
    block.right();
    
    for (var i = 0; i < wave.length; i++) {
        //wave[i].draw();
        wave[i].move();
    }
    //block4.left();
    for (var i = 0; i < foam.length; i++) {
        //foam[i].draw();
        foam[i].move();
    }
    background(0);
};

mouseClicked = function() {
    Program.restart();  
};
