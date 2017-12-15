// Link:  https://www.khanacademy.org/cs/cosmic-objects/4734223526264832
// Created:  07/27/2015 13:16



//This program is a entry in the contest: Click-N-Learn.
  
//I've been programming off and on for maybe 4 months, and I have learned (or mastered) 40% of Intro to JS.
 
//There is a bug that happens randomly. After you have read all the scenes and want to read them again, the pictures won't show up. To fix this, go to Scene2 and push restart. This should bring them back again.

/** 
 * First created : 7/27/2015
 * Last updated : 3/20/2017
**/












//Code

var currentScene;

var drawButton = function(){
    //This draws the "Next" button.
    stroke(250, 250, 250);
    fill(47, 31, 166);
    rect(36, 350, 50, 25);
    fill(255, 255, 255);
    textSize(16);
    text("NEXT", 40, 368);
}; // This makes the Next button

var drawScene1 = function() {
    currentScene = 1;
    //This draws the black background and the stars.
    background(0, 0, 0);
    stroke(255, 255, 255);
    strokeWeight(0.5);
        for (var i = 0; i <800; i++) {
            point(random(0, width), random(0, height));}
    //This draws the text.
    fill(227, 209, 45);
    textSize(39);
    text("Cosmic objects.", 69, 150);
}; // This draws the first scene

var drawScene2 = function() {
    currentScene = 2;
    //This draws the black background and the stars.
    background(0, 0, 0);
    fill(227,209,45);
    stroke(255, 255, 255);
    strokeWeight(0.5);
        for (var i = 0; i <800; i++) {
            point(random(0, width), random(0, height));}
    //This draws the text.
    fill(0, 0, 0);
    stroke(0, 0, 0);
    rect(50, 20, 325, 135);
    fill(227, 209, 45);
    textSize(39);
    text("This is a comet", 75, 50);
    textSize(15);
    text("A comet is an icy small solar system body that, when passing close to the sun, heats up and begins to outgas, displaying a visible atmosphere or coma, and sometimes also a tail. These phenomena are due to the effects of solar radiation and the solar wind upon the nucleus of the comet.", 50, 60, 350, 400);
}; // Second scene

var drawScene3 = function() {
    currentScene = 3;
    //This draws the black background and the stars.
    background(0, 0, 0);
    stroke(255, 255, 255);
    strokeWeight(0.5);
        for (var i = 0; i <800; i++) {
            point(random(0, width), random(0, height));}
    //This draws the text.
    fill(0, 0, 0);
    stroke(0, 0, 0);
    rect(50, 20, 325, 135);
    fill(227, 209, 45);
    textSize(39);
    text("This is a asteroid", 64, 50);
    textSize(15);
    text("A small rocky body orbiting the sun. Large numbers of these, ranging in size from nearly 600 miles across to dust particles, are found (as the asteroid belt ) especially between the orbits of Mars and Jupiter, though some have more eccentric orbits, and a few pass close to the earth or enter the atmosphere as meteors.", 50, 60, 350, 400);
}; // Third scene

var drawScene4 = function() {
    currentScene = 4;
    //This draws the black background and the stars.
    background(0, 0, 0);
    stroke(255, 255, 255);
    strokeWeight(0.5);
        for (var i = 0; i <800; i++) {
            point(random(0, width), random(0, height));}
    //This draws the text.
    fill(0, 0, 0);
    stroke(0, 0, 0);
    rect(50, 20, 333, 130);
    fill(227, 209, 45);
    textSize(39);
    text("This is a supernova",50, 50);
    textSize(15);
    text("A supernova is a stellar explosion that briefly outshines an entire galaxy, radiating as much energy as the sun or any ordinary star is expected to emit over its entire life span, before fading from view over several weeks or months.",50, 60, 350, 400);
}; // Fourth scene

mouseClicked = function() {
    if (currentScene === 1) {
        drawScene2();
    } else if (currentScene === 2) {
        drawScene3();
    } else if (currentScene === 3) {
        drawScene4();
    }  else if (currentScene === 4) {
        drawScene1();
    } 

    drawButton();
}; // Tells the program what to do when the                                       mouse is clicked
drawScene1();
drawButton();
   
