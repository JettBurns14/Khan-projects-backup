// Link:  https://www.khanacademy.org/cs/spin-off-of-wood-pecking-woodpecker/6469057338540032
// Created:  09/03/2015 13:51




/*** Wood-pecking Woodpecker ***     by taco_launcher

 My first organism is the pileated woodpecker; and my second organism is the oak tree. The pileated woodpecker is pecking at (or interacting with) the oak tree.
 
 Pileated woodpeckers peck and make holes in trees to find food (like carpenter ants or wood-boring beetles) and to make dwellings.  Male woodpeckers peck giant holes to attract females to come and raise a family in that hole.
 
 ---------------------------------------------

 I've been programming for about 4 months (as of April 2015), but I  understand all of the JavaScript basics.

 All of the code below is completely original.
 
 Thank you!

*/
// If the pecking sound annoys you, set the following variable to false.
var sound = false;



/** variables **/
var xPosition = 200; // stores the position of the woodpecker's head

var randomNum = random(0, 5); // stores a random number

//var peckSound = getSound("rpg/hit-thud"); // sound of the woodpecker's peck

var birdPeck = true; // stores whether or not the woodpecker's head is going forward (true) or backward (false)

var pecks = 0; // stores how many times the woodpecker pecks

var woodShavingsY = 120; // the y coordinate of the wood shavings



// animates the woodpecker's head
var birdPecking = function () {
    
    // animates the woodpecker's head going forward
    if (birdPeck === true) {
        xPosition+=20;
    }

    // if the woodpecker's head goes too far forward, do the following
    if (xPosition >= 235) {
        birdPeck = false;
        // adds to the "pecks" variable
        if (pecks < 80) {
            pecks++;
        }
    }
    
    // animates the woodpecker's head going backwards
    if (birdPeck === false) {
        xPosition-=20;
    }
    
    // if the head goes too far back, the head should go forward
    if (xPosition <= 200) {
        birdPeck = true;
    }
};


// arrays for the details on the tree
var treeDetailsX = []; // the x coordinates
var treeDetailsY = []; // the y coordinates
var treeDetailsC = []; // the decider for the colors

// puts random numbers in each array
for (var i = 0; i < 600; i++) {
    treeDetailsX[i] = random(230, 380);
    treeDetailsY[i] = random(-20, 400);
    treeDetailsC[i] = random(0, 3);
}


// draws a cloud
var drawCloud = function (x, y, cColor) {
    for (var j = 75; j > 0; j--) {
        fill(cColor);
        ellipse(x, y, j, j/2);
    }
};


// arrays for the clouds
var cloudX = []; // the x coordinates
var cloudY = []; // the y coordinates

// puts random numbers in each array
for (var i = 0; i < 15; i++) {
    cloudX[i] = random(0, 400);
    cloudY[i] = random(0, 200);
}


// arrays for the foliage
var foliageX = []; // the x coordinates
var foliageY = []; // the y coordinates
var foliageC = []; // the decider of the colors

// puts random numbers in each array
for (var i = 0; i < 700; i++) {
    foliageX[i] = random(0, 400);
    foliageY[i] = random(250, 400);
    foliageC[i] = random(0, 3);
}




draw = function() {

    /** the following the draws the background/setting **/
    background(199, 255, 251); // the sky color
    noStroke();


    // draws the sun
    for (var i = 60; i > 0; i--) {
        fill(255, 243, 135, 45);
        ellipse(80, 50, i, i);
    }

    
    // draws the moving clouds
    for (var i = 0; i < cloudX.length; i++) {
        drawCloud(cloudX[i], cloudY[i], color(255, 255, 255, 10));
        cloudX[i]++;
        if (cloudX[i] > 450) {
            cloudX[i] = -50;
        }
    }
    
    fill(22, 82, 0);
    rect(0, 275, 400, 125);
    
    // draws the tree trunks hidden behind the foliage
    fill(115, 77, 0);
    for (var i = 0; i < 400; i += 75) {
        rect(i, 300, 25, 100);
    }


    // draws background foliage
    for (var i = 0; i < foliageX.length; i++) {
        if (foliageC[i] < 1) {
            fill(16, 74, 0, 150);
        } else if (foliageC[i] < 2) {
            fill(30, 179, 0, 100);
        } else {
            fill(14, 117, 0, 150);
        }
        ellipse(foliageX[i], foliageY[i], foliageC[i]*12, foliageC[i]*15);
    }

    
    // draws tree trunk
    fill(181, 143, 89);
    rect(230, 0, 150, 400);

    
    // draws the details on the tree
    for (var i = 0; i < treeDetailsX.length; i++) {
        if (treeDetailsC[i] < 1) {
            stroke(24, 112, 0, 50);
        } else if (treeDetailsC[i] < 2) {
            stroke(56, 30, 0, 50);
        } else {
            stroke(250, 208, 160, 50);
        }
        line(treeDetailsX[i], treeDetailsY[i], treeDetailsX[i], treeDetailsY[i]+50);

    }
    noStroke();
    
    
    // draws the hole
    var holeWidth = pecks; // stores the width of the hole
    for (var i = 0; i < 1; i += 0.025) {
        fill(lerpColor(color(237, 201, 151), color(82, 49, 0), i));
        ellipse(260, 120, holeWidth/3, holeWidth/2);
        holeWidth--;
    }
    
    // draws the wood shavings
    fill(224, 191, 148);
    rect(265, woodShavingsY, 5, 2);
    rect(270, woodShavingsY+50, 2, 5);
    
    // animates the wood shavings
    woodShavingsY+=10;
    if (woodShavingsY >= 400) {
        woodShavingsY = 120;
    }



    /** the following draws the woodpecker **/

    // white part of the neck
    fill(255, 255, 255);
    quad(xPosition-25, 130, 190, 160, 200, 160, xPosition-5, 130);
    
    // leg (gray part)
    stroke(199, 199, 199);
    strokeWeight(5);
    line(235, 208, 245, 215);
    noStroke();
    
    // body
    fill(26, 26, 26);
    ellipse(212, 201, 40, 85);

    // black part of the neck
    quad(xPosition-20, 130, 195, 160, 210, 160, xPosition-5, 130);

    // leg (black part)
    quad(225, 185, 220, 195, 235, 215, 235, 205);

    // upper talon
    stroke(199, 199, 199);
    noFill();
    strokeWeight(4);
    arc(254, 222, 18, 27, -135, -50);

    // lower talon
    strokeWeight(3.5);
    arc(251, 221, 10, 12, -135, -55); 

    // wing
    noStroke();
    fill(20, 20, 20);
    bezier(180, 175, 205, 380, 210, 230, 215, 170);
    ellipse(207, 261, 5, 45);

    // shoulder
    ellipse(202, 183, 45, 60); 

    // white feathers
    fill(255, 255, 255);
    bezier(190, 155, 230, 240, 210, 150, 193, 155);

    // more white feathers
    stroke(255, 255, 255);
    strokeWeight(3);
    line(211, 182, 217, 225);

    // red crest
    noStroke();
    fill(255, 31, 31);
    bezier(xPosition-20, 125, xPosition-5, 150, xPosition+52, 100, xPosition-40, 115);

    // head
    fill(255, 255, 255);
    bezier(xPosition-25, 130, xPosition-5, 160, xPosition+50, 95, xPosition-30, 120); 

    // black stripe by eye
    stroke(20, 20, 20);
    strokeWeight(5);
    line(xPosition-27, 123, xPosition+9, 120);

    // black stripe below eye
    strokeWeight(3);
    line(xPosition-15, 138, xPosition+7.25, 126);

    // red stripe below eye
    stroke(150, 0, 0);
    strokeWeight(4);
    line(xPosition-5, 132, xPosition+7.25, 126);

    // beak
    noStroke();
    fill(43, 43, 43);
    triangle(xPosition+8, 120, xPosition+8, 125, xPosition+40, 120);
    
    // iris
    strokeWeight(1);
    stroke(20, 20, 20);
    fill(227, 204, 100);
    ellipse(xPosition-2, 120, 5, 5);
    
    // pupil
    noStroke();
    fill(0, 0, 0);
    ellipse(xPosition-2, 120, 2, 2);

    if (xPosition >= 235) {
        // adds to the "pecks" variable
        if (pecks < 80) {
            pecks++;
        }
    }
    

    // randomly delays each peck
    if (xPosition <= 200) {
        randomNum = random(0, 25);
    }
    if (randomNum > 20) {
        birdPecking();
    }
    
};
