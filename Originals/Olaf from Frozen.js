// Link:  https://www.khanacademy.org/hour-of-code/olaf-from-frozen/5622780903686144
// Created:  7/11/2015 16:56:08




/** In case anyone was wondering, I made Olaf from scratch. I used curveVertex functions mostly. **/

/***** Thank you for all the votes, and spinoffs! *****/

// Variables are letters that represent a number, which can be changed to move shapes, without manually going through the code and changing every single number you want changed.
// Variables are in here.
{
// Carrot's position
var x = 212;
var y = 176;

// Mid-body position
var x2 = 200;
var y2 = 209;

// Head's position
var x3 = 201;
var y3 = 211;

// Lower-body position
var x4 = 200;
var y4 = 215;

// Eye's position
var eyeX = 232;
var eyeY = 85;

// Leg's position
var legX = 202;
var legY = 197;

// Left arm's position
var armX = 203;
var armY = 200;

// Right arm's position
var armx = 196;
var army = 213;

// The snowflake variables
var turn = 0;
var xFlakes = [];
var yFlakes = [];
var flakeRadius = [];
}

var Olaf = function() {
// See here that the background is at the start of my program? That's where it should be, or else it will cover my picture!
background(161, 232, 237);

// Snow on ground
{
fill(255);
quad(-5, 278, 410, 297, 428, 416, -2, 405); // This is one of many useful functions you can find in the DOC.
stroke(0);
// Once again, you can find all of these functions in the documentation below, and find out how they work.
beginShape();
curveVertex(290, 530);
curveVertex(-50, 277);
curveVertex(450, 303);
curveVertex(240, 309);
endShape();
}

translate(-30, 0);

// Left leg
{
beginShape();
curveVertex(legX+142, legY-197);    
curveVertex(legX+11, legY+117);
curveVertex(legX+32, legY+165);
curveVertex(legX+47, legY+117);
curveVertex(legX-46, legY-157);
endShape();
ellipse(legX+29, legY+158, 41, 19);
}

// Right leg
{
beginShape();
curveVertex(legX+124, legY-164);
curveVertex(legX+50, legY+120);
curveVertex(legX+64, legY+164);
curveVertex(legX+82, legY+117);
curveVertex(legX-67, legY-193);
endShape();
ellipse(legX+67, legY+158, 35, 17);
noStroke();
ellipse(legX+67, legY+155.9, 38, 19);
}

// Lower body
{
stroke(0);
beginShape();
curveVertex(x4+-148, y4+95);
curveVertex(x4+45, y4+126);
curveVertex(x4+106, y4+96);
curveVertex(x4+92, y4+31);
curveVertex(x4+23, y4+24);
curveVertex(x4-16, y4+46);
curveVertex(x4-9, y4+105);
curveVertex(x4+46, y4+126);
curveVertex(x4+148, y4+116);
endShape();
}

// Left arm
{
noFill();
stroke(71, 53, 22);
strokeWeight(4);
pushMatrix();
translate(armX, armY);
rotate(-30);
arc(-12, -27, 31, 135, 315, 387);
strokeWeight(3);
line(3, -89, 0, -77);
line(-4, -89, -2, -77);
line(-9, -84, -2, -74);
line(8, -73, 2, -66);
popMatrix();
fill(71, 53, 22);
triangle(armX-24, armY-49, armX+-7, armY+-13, armX+-1, armY+-7);
}

// Middle body
{
fill(255);
strokeWeight(1);
beginShape();
curveVertex(x2-91, y2+25);
curveVertex(x2+29, y2+41);
curveVertex(x2+71, y2+33);
curveVertex(x2+61, y2-12);
curveVertex(x2+16, y2-15);
curveVertex(x2+2, y2+19);
curveVertex(x2+16, y2+39);
curveVertex(x2+50, y2+42);
curveVertex(x2+-15, y2+39);
endShape();
}

// Head
{
beginShape();
curveVertex(x3-98, y3+-86);
curveVertex(x3+43, y3-158);
curveVertex(x3+74, y3+-113);
curveVertex(x3+86, y3+-81);
curveVertex(x3+53, y3-14);
curveVertex(x3+22, y3-18);
curveVertex(x3+2, y3+-92);
curveVertex(x3+12, y3+-131);
curveVertex(x3+47, y3+-158);
curveVertex(x3+146, y3+-116);
endShape();
strokeWeight(2);
stroke(82, 69, 32);
noFill();
arc(x3+68, y3-162, 38, 41, 172, 268);
arc(x3+23, y3-161, 38, 87, 291, 363);
arc(x3+18, y3-152, 26, 75, 296, 348);
arc(x3+19, y3-145.7, 26, 64, 241, 339);

fill(255);
stroke(0);
strokeWeight(1);
// Tooth
beginShape();
curveVertex(x3+13, y3-174);
curveVertex(x3+58, y3+-69);
curveVertex(x3+36, y3+-56);
curveVertex(x3+33, y3+-76);
curveVertex(x3+50, y3+-141);
endShape();
// Smile
beginShape();
curveVertex(x3+91, y3+-165);
curveVertex(x3+77, y3-82);
curveVertex(x3+42, y3+-69);
curveVertex(x3+14, y3+-99);
curveVertex(x3+36, y3+-167);
endShape();
noFill();
arc(x3+14, y3-98, 6, 3, 187, 313);
}

// Eyes
{
strokeWeight(1.7);
stroke(0, 0, 0, 150);
ellipse(eyeX, eyeY+3, 21, 22);
ellipse(eyeX+22, eyeY+3, 21, 22);
fill(0);
ellipse(eyeX, eyeY+3, 8, 8);
ellipse(eyeX+21, eyeY+3, 8, 8);
stroke(255);
strokeWeight(0.3);
point(eyeX+3, eyeY+1.8);
point(eyeX+24, eyeY+1.6);
}

// Eye brows
{
pushMatrix();
translate(eyeX-1, eyeY+2);
rotate(-11);
noStroke();
fill(71, 53, 22);
rect(4, -24, 11, 4);
triangle(-7, -15, 4, -24, 6, -20);
popMatrix();
pushMatrix();
translate(eyeX, eyeY+2);
rotate(20);
rect(7, -30, 11, 4);
triangle(31, -24, 19, -30, 14, -27);
popMatrix();
}

// Carrot
{
fill(255, 169, 64);
stroke(0);
strokeWeight(1);
beginShape();
curveVertex(x-80, y+25);
curveVertex(x+27, y-72);
curveVertex(x+58, y-49);
curveVertex(x+58, y-42);
curveVertex(x+48, y-48);
curveVertex(x+40, y-54);
curveVertex(x+26, y-65);
curveVertex(x+44, y-73);
curveVertex(x+136, y-37);
endShape();
}

// Right arm
{
fill(71, 53, 22);
stroke(71, 53, 22);
strokeWeight(4);
line(armx+60, army+6, armx+86, army+89);
strokeWeight(3);
line(armx+96, army+100, armx+87, army+91);
line(armx+90, army+105, armx+86, army+90);
line(armx+82, army+105, armx+85, army+93);
line(armx+77, army+93, armx+84, army+82);
triangle(armx+78, army+49, armx+62, army+13, armx+77, army+64);
triangle(armx+85, army+89, armx+86, army+88, armx+78, army+61);
}

// Buttons
{
fill(0);
noStroke();
ellipse(x4+13, y4+98, 20, 20);
ellipse(x4+12, y4+58, 20, 20);
ellipse(x2+25, y2+11, 20, 20);
fill(46, 46, 46);
ellipse(x4+16, y4+98, 12, 14);
ellipse(x4+15, y4+58, 12, 14);
ellipse(x2+27, y2+11, 12, 14);
}

// Part of left foot
noStroke();
fill(255);
ellipse(legX+27, legY+154.4, 39.0, 21);

/////////////////////////////////////////////////////////////////////////////////////////

// Flower
{
noFill();
stroke(81, 179, 0);
strokeWeight(1.4);
arc(123, 355, 9, 72, -187, -87);
strokeWeight(3);
arc(111, 351, 9, 52, 277, 379);
arc(103, 358, 14, 20, 281, 365);
arc(118, 354, 7, 34, 277, 379);
arc(136, 353, 18, 41, -195, -87);
fill(245, 0, 192);
noStroke();
pushMatrix();
translate(120, 320);
ellipse(8, 0, 12, 6);
rotate(-40);
ellipse(8, 0, 12, 5);
rotate(117);
ellipse(-5, -2, 12, 5);
rotate(-36);
ellipse(-3, 0, 12, 3);
rotate(-108);
ellipse(-1, 2, 2, 9);
popMatrix();
fill(255, 245, 48);
ellipse(125, 318, 3, 3);
ellipse(122, 320, 3, 3);
ellipse(122, 316, 3, 3);
}
};

// Snowflakes
// I got some of this code from Pamela, but I changed a lot of it. She had a nice snowflake design.
for(var i = 0; i < 50; i++){
        xFlakes.push(random(10, 400));
        yFlakes.push(random(-400, 10));
        flakeRadius.push(random(5, 10));
}

var drawBranches = function(x, y, radius) {
    rotate(turn);
    for (var i = 0; i < 6; i++) {
        line(0, 0, radius, 0);
        for (var j = 0; j < radius/8; j++) {
            line(j*5, 0, j*10, j*3);
            line(j*5, 0, j*10, j*-3); 
        }
        rotate(60);
    }
    resetMatrix();
    translate(x, y);
    stroke(247, 247, 247);
    strokeWeight(1);
};

draw = function() {
    Olaf();
    for (var i = 0; i < 150; i++) {
    drawBranches(xFlakes[i], yFlakes[i], flakeRadius[i]);
    yFlakes[i]+=1;
    if (yFlakes[i] > 410) {
        yFlakes[i] = -10;
    }
    }
    turn+=1;
    
};
