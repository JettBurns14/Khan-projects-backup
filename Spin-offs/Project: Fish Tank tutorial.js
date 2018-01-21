// Link:  https://www.khanacademy.org/computer-programming/project-fish-tank-tutorial/4827242298998784
// Created:  12/28/2015 09:21





/**
    This program draws a single fish. Poor lonely fish! For this project, you'll use functions to accompany him with more fish of all different shapes and colors. 
    1.Create a custom function (like drawFish) that draws a fish at a given x and y with a given length, height, and color (5 parameters), using the starter code.
    2.Call that function to draw the fish.
    3.Now call that function lots more times, with different values, so your screen is filled with fish.
    4.Add more parameters to the function, like tail width, eye size, tail color - more ways that you can make each fish different from each other.
    5.Bonus: Add seaweed to the tank, and make a function to draw it at different places and heights. Or add pebbles to the bottom. Or a bubble drawing function.
    6.Bonus: Want to make it interactive? Use a mouseClicked function to add more fish wherever the user clicks.
    
    Don't like fish? You could also make a pet shop, maybe using your animal code from the Design-an-Animal project, or a car shop, using rectangles. The important thing is to use functions to make your drawing code reusable.
**/

var scene = 1;
var yPos = [300];
var xPos = [300];
var DrkBluTxt = color(0, 94,255);
var LitBluTxt = color(0, 174, 255);

var nxtButton = function() {
    textFont(createFont("sans"));
    textAlign(CENTER, CENTER);
    if (mouseX > 480 && mouseX < 560 && mouseY > 520 && mouseY < 560) {
        fill(36, 211, 255);
        if (mouseIsPressed) {
            scene++;
        }
    } else {
        fill(97, 223, 255);
    }
    stroke(0, 0, 0);
    rect(480, 520, 80, 40, 11);
    rect(482, 522, 76, 36, 10);
    fill(0);
    textSize(20);
    text("NEXT", 520, 541);
};
var bakButton = function() {
    textAlign(CENTER, CENTER);
    textFont(createFont("sans"));
    if (mouseX > 40 && mouseX < 120 && mouseY > 520 && mouseY < 560) {
        fill(36, 211, 255);
        if (mouseIsPressed) {
            scene--;   
        }
    } else {
        fill(97, 223, 255);
    }
    stroke(0, 0, 0);
    rect(40, 520, 80, 40, 11);
    rect(42, 522, 76, 36, 10);
    fill(0);
    textSize(20);
    text("BACK", 80, 541);
};
var scene1 = function() {
    textFont(createFont("impact", "sans"));
    noStroke();
    for(var i = 0; i < 70; ++i){
    xPos.push(random(5, width-5));
    yPos.push(random(height+10, 0));
}
    for (var i = 0; i < 70; i++) {
        fill(0, 34, 255, 30);
        ellipse(xPos[i], yPos[i], 15, 15);
        fill(207, 249, 255);
        ellipse(xPos[i]+3, yPos[i]-2, 5, 5);
        yPos[i]-=random(2);
    if (yPos[i] < -10) {
        yPos[i] = random(height+10, height);  
        xPos[i] = random(5, width-5);
    }
    }
    
    fill(LitBluTxt);
    textSize(45);
    text("How to complete", width/2, 75);
    text("( The right way )", width/2, 230);
    fill(DrkBluTxt);
    textSize(60);
    text("Project: Fish Tank", width/2, 150);
    text("Click next \nto start!", width/2, 410);
};
//var scene2 = function() {
    /*
    fill(DrkBluTxt);
    textAlign(CENTER, CENTER);
    textFont(createFont("sans"));
    textSize(26);
    text("Step 1: Create a custom function (like drawFish)\n that draws a fish at a given x and y with a given\n length, height, and color (5 parameters), \nusing the starter code.", 300, 100);
    */
//};
var codeEditor = function() {
    // White background
    fill(255, 255, 255);
    stroke(163);
    rect(50, 155, 476, 340);
    noStroke();
    fill(232, 232, 232);
    rect(51, 156, 28, 339);
    
    textFont(createFont("monospace"));
    textSize(12);
    fill(0);
    for (var i = 0; i < 24; i++) {
        text(i, 66, i*13.6+165);   
    }
};
var scene3 = function() {
    // Step 1 text
    fill(DrkBluTxt);
    textAlign(CENTER, CENTER);
    textFont(createFont("sans"));
    textSize(26);
    text("Step 1:\nCreate a function that contains the code \nthat draws the fish.", 300, 63);
    // Code
    fill(0, 38, 255);
    textFont(createFont("monospace"));
    textAlign(CORNER, CORNER);
    textSize(12);
    text("var drawFish = function() {", 82, 278);
    text("};", 82, 482);
    
    fill(0);
    text("background(89, 216, 255); \n\nvar centerX = 200;\nvar centerY = 100; \nvar bodyLength = 118; \nvar bodyHeight = 74; \nvar bodyColor = color(162, 0, 255);", 82, 170); 
    text("\n\n\nnoStroke();\nfill(bodyColor); \n// body \nellipse(centerX, centerY, bodyLength, bodyHeight);\n// tail \nvar tailWidth = bodyLength/4; \nvar tailHeight = bodyHeight/2;\ntriangle(centerX-bodyLength/2, centerY, \ncenterX-bodyLength/2-tailWidth, centerY-tailHeight, \ncenterX-bodyLength/2-tailWidth, centerY+tailHeight); \n// eye \nfill(33, 33, 33);\nellipse(centerX+bodyLength/4, centerY, bodyHeight/5,\nbodyHeight/5);\n", 112, 248);
};
var scene4 = function() {
    // Step 2 text
    fill(DrkBluTxt);
    textAlign(CENTER, CENTER);
    textFont(createFont("sans"));
    textSize(26);
    text("Step 2:\nRemove variables which are outside function \nand create arguements which replace\n the variables.", 300, 75);
    // Code
    fill(0, 38, 255);
    textFont(createFont("monospace"));
    textAlign(CORNER, CORNER);
    textSize(12);
    text("centerX, centerY, bodyLength,", 254, 197);
    text("bodyHeight, bodyColor", 82, 212);
    fill(0);
    text("var drawFish = function(\n                     ) {", 82, 197);
    text("};", 82, 420);
    
    textSize(12);
    text("background(89, 216, 255);", 82, 170); 
    text("\n\n\nnoStroke();\nfill(bodyColor); \n// body \nellipse(centerX, centerY, bodyLength, bodyHeight);\n// tail \nvar tailWidth = bodyLength/4; \nvar tailHeight = bodyHeight/2;\ntriangle(centerX-bodyLength/2, centerY, \ncenterX-bodyLength/2-tailWidth, centerY-tailHeight, \ncenterX-bodyLength/2-tailWidth, centerY+tailHeight); \n// eye \nfill(33, 33, 33);\nellipse(centerX+bodyLength/4, centerY, bodyHeight/5,\nbodyHeight/5);\n", 112, 183);  
    
    /*
     \n\nvar centerX = 200;\nvar centerY = 100; \nvar bodyLength = 118; \nvar bodyHeight = 74; \nvar bodyColor = color(162, 0, 255);
    */
};
var scene5 = function() {
    // Step 3 text
    fill(DrkBluTxt);
    textAlign(CENTER, CENTER);
    textFont(createFont("sans"));
    textSize(26);
    text("Step 3:\nCall that function at least\nthree times after the function.", 300, 75);
    // Code
    fill(0, 38, 255);
    textFont(createFont("monospace"));
    textAlign(CORNER, CORNER);
    textSize(12);
    text("drawFish(200, 200, 50, 30, color(255, 0, 0))", 82, 432);
    text("drawFish(200, 200, 50, 30, color(255, 255, 0))", 82, 444);
    text("drawFish(200, 200, 50, 30, color(0, 255, 0))", 82, 456);
    text("drawFish(200, 200, 50, 30, color(0, 0, 255))", 82, 468);
    fill(0);
    text("centerX, centerY, bodyLength,", 254, 197);
    text("bodyHeight, bodyColor", 82, 212);
    text("var drawFish = function(\n                     ) {", 82, 197);
    text("};", 82, 420);
    
    textSize(12);
    text("background(89, 216, 255);", 82, 170); 
    text("\n\n\nnoStroke();\nfill(bodyColor); \n// body \nellipse(centerX, centerY, bodyLength, bodyHeight);\n// tail \nvar tailWidth = bodyLength/4; \nvar tailHeight = bodyHeight/2;\ntriangle(centerX-bodyLength/2, centerY, \ncenterX-bodyLength/2-tailWidth, centerY-tailHeight, \ncenterX-bodyLength/2-tailWidth, centerY+tailHeight); \n// eye \nfill(33, 33, 33);\nellipse(centerX+bodyLength/4, centerY, bodyHeight/5,\nbodyHeight/5);\n", 112, 183);  
};

draw = function() {
    background(191, 253, 255);
    if (scene > 2) {
        bakButton();
        codeEditor();
    }
    if (scene === 1) {
        scene1();
    } else if (scene === 2) {
        //scene2();
    } else if (scene === 3) {
        scene3();   
    } else if (scene === 4) {
        scene4();   
    } else if (scene === 5) {
        scene5();   
    }
    
    nxtButton();
};
