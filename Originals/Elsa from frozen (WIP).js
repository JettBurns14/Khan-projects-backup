// Link:  https://www.khanacademy.org/computer-programming/elsa-from-frozen-wip/6018575905718272
// Created:  11/15/2015 12:57





/** If it's taking a while to load, just keep waiting or change the noLag variable.
 * 
 * 
**/
// If it's lagging, change this variable.
var noLag = false;

// This is the background color.
var backColor = color(0, 0, 0);

{if (noLag === true) {
    var numbRects = 1000;
} else {
    numbRects = 1200;
}}

var handX = 12;
var handY = 138;
var xRects = [];
var yRects = [];
var rectW = [];
var rectH = [];
var redFill = [];
var greenFill = [];
var blueFill = [];

/*
for(var i = 0; i < height; i++) {
    var n = map(i, 0, height, 0, 1);
    var newBackground = lerpColor(backgroundTop, backgroundBottom, n);
    stroke(newBackground);
    line(0, i, width, i);
}
*/
var Hand = function() {
// Hand
/*
noStroke();
beginShape();
fill(255, 247, 214);
curveVertex(handX+41, handY+46);
curveVertex(handX+86, handY+52);
curveVertex(handX+67, handY+46);
curveVertex(handX+56, handY+39);
curveVertex(handX+58, handY+26);
curveVertex(handX+55, handY+20);
curveVertex(handX+67, handY+21);
curveVertex(handX+80, handY+29);
curveVertex(handX+92, handY+43);
curveVertex(handX+79, handY);
endShape();
ellipse(handX+56, handY+35, 35, 10);
pushMatrix();
translate(handX, handY);
rotate(19);
ellipse(56, 2, 20, 7);
popMatrix();
*/
};

var Torso = function() {
    noStroke();
    fill(0, 159, 245);
    rect(150, 154, 83, 150);
    for(var i = 0; i < numbRects; i++){
        xRects.push(random(150, 230));
        yRects.push(random(150, 300));
        rectW.push(random(2, 4));
        rectH.push(random(5, 15));
        redFill.push(random(0,20));
        greenFill.push(random(200,255));
        blueFill.push(random(230,255));
        fill(redFill[i], greenFill[i], blueFill[i]);
        rect(xRects[i], yRects[i], rectW[i], rectH[i]);
    }
    
    // Body outline
    noStroke();
    fill(backColor);
    ellipse(151, 259, 23, 119);
    ellipse(222, 325, 118, 93);
    noFill();
    stroke(backColor);
    strokeWeight(15);
    arc(172, 183, 61, 74, 140, 254);
    arc(254, 242, 46, 169, 133, 235);
    triangle(152, 296, 165, 315, 155, 310);
    
    // Light blue part of outfit
    stroke(181, 255, 255);
    noFill();
    strokeWeight(2);
    beginShape();
    curveVertex(85, 132);
    curveVertex(170, 153);
    curveVertex(185, 164); 
    curveVertex(198, 152); 
    curveVertex(233, 163); 
    curveVertex(274, 207); 
    endShape();
    
    fill(181, 255, 255);
    bezier(172, 150, 192, 176, 180, 155, 212, 151);
    bezier(234, 163, 245, 167, 265, 111, 210, 152);
    rect(181, 138, 50, 14);
    bezier(162, 157, 167, 134, 183, 134, 201, 147);
    fill(99, 245, 255);
    noStroke();
    arc(230, 310, 124, 65, 85, 265);
    rect(166, 304, 59, 99);
    bezier(223, 431, 297, 532, 259, 435, 223, 291);
    bezier(159, 294, 188, 310, 177, 461, 135, 403);
};

var Arms = function() {
    // Left arm
    fill(181, 255, 255);
    beginShape();
    //vertex(148, 235);
    //bezierVertex(166, 200, 151, 180, 118, 233);
    strokeWeight(0.1);
    curveVertex(190, 255);
    curveVertex(135, 237);
    curveVertex(136, 217);
    curveVertex(149, 185);
    curveVertex(151, 195);
    curveVertex(156, 204);
    curveVertex(159, 221);
    curveVertex(146, 238);
    curveVertex(138, 237);
    curveVertex(142, 224);
    endShape(); 
    
    beginShape();
    curveVertex(139, 248);
    curveVertex(137, 215);
    curveVertex(98, 178);
    curveVertex(102, 198);
    curveVertex(121, 226);
    curveVertex(141.2, 239.3);
    curveVertex(174, 235);
    endShape();
};

draw = function() {
    background(backColor);
    Torso();
    Arms();
    Hand();
};
