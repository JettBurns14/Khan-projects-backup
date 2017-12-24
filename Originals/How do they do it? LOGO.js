// Link:  https://www.khanacademy.org/computer-programming/how-do-they-do-it-logo/6748598518808576
// Created:  09/16/2015 18:55




var Gear = function() {
    this.R = 0;
};

Gear.prototype.display = function() {
    pushMatrix();
    translate(456, 244);
    rotate(this.R);
    fill(135, 135, 135);
    noStroke();
    ellipse(0, 0, 340, 340);
    for (var i = 0; i < 347; i +=33) {
        pushMatrix();
        translate(0, 0);
        rotate(i);
        rect(-14, -208, 44, 44);
        triangle(-13, -168, -22, -167, -13, -210);
        triangle(-58, -157, -74, -152, -88, -191);
        popMatrix();
    }
    fill(150, 150, 150);
    ellipse(0, 0, 280, 280);
    popMatrix();
    this.R +=0.2;
};

var Gear1 = function() {
    this.R = 1;
};

Gear1.prototype.display = function() {
    pushMatrix();
    fill(0);
    textSize(77);
    text("H   W", 29, 203);
    translate(115, 180);
    rotate(this.R);
    noStroke();
    ellipse(0, 0, 60, 60);
    for (var i = 0; i < 350; i +=20) {
        pushMatrix();
        translate(0, 0);
        rotate(i);
        rect(24, -4, 10, 5);
        popMatrix();
    }
    fill(197);
    ellipse(0, 0, 52, 52);
    popMatrix();
    this.R +=0.5;
};

var Gear2 = function() {
    this.r = 1;
};

Gear2.prototype.display = function() {
    pushMatrix();
    fill(255);
    text("D", 57, 264);
    textSize(33);
    text("THEY DO IT", 192, 250);
    translate(148, 237);
    rotate(this.r);
    noStroke();
    ellipse(0, 0, 60, 60);
    for (var i = 0; i < 345; i +=20) {
        pushMatrix();
        translate(0, 0);
        rotate(i);
        rect(25, -4, 10, 5);
        popMatrix();
    }
    fill(0, 18, 117);
    ellipse(0, 0, 52, 52);
    popMatrix();
    this.r -=0.5;
};

var gear1 = new Gear1();
var gear2 = new Gear2();
var gear = new Gear();

draw = function() {
    background(196, 196, 196);
    gear.display();
    fill(0, 18, 117);
    rect(0, 208, width, 68);
    fill(0);
    rect(0, 0, width, 43);
    rect(0, 269, width, 200);
    gear1.display();
    gear2.display();
};
