// Link:  https://www.khanacademy.org/computer-programming/new-program/6547376335618048
// Created:  09/03/2015 14:07




/*
~ Blessed is the man who remains steadfast under trial, for when he has stood the test he will recieve the crown of life, which God has promised to those who love him. ~ James 1:12

In case you think that you should flag this program, please read this first:

The guidelines say "don't make contentious programs about religion." It does NOT say don't make any at all. This porgram is not contentious, and I've seen multiple programs like this that never got flagged. Just want that to be understood. :)

*/
var x = -800;
var y = 220;
var X = -30;
var Y = -20;
var A = -470;
var B = -500;
var C = -200;
var moved = false;
var timerStart = 0;

draw = function() {
    
    if (moved) {
    Y = constrain(Y, Y, 39);
    X = constrain(X, -326, 500);
    Y+=2;
    X-=2.5;
    timerStart++;
    }
    if (moved) {   
    x = constrain(x, -800, 156);
    x+=2;
    }
    if (moved) {A +=2;
    A = constrain(A, -470, 43);
    }
    if (moved) {
        B = constrain(B, -500, 144);
        B+=2;
    }
    if (timerStart > 350 && moved) {
        C = constrain(C, -200, 100);
        C +=3;
    }
    
    background(184, 184, 184);
    noFill();
    stroke(0);
    rect(70, 225, 250, 41);
    if (timerStart > 330) {
    noStroke();
    fill(0, 146, 194);
    rect(15, 155, 375, 40);
    }
    
    var f = createFont("impact");
    textFont(f);
    fill(0, 146, 194);
    textSize(35);
    text("Blessed", 50, Y);
    if(timerStart > 180) {
    text("steadfast", 110, 95);
    } //                   steadfast
    
    if(timerStart > 480) {
    text("the crown of Life,", 77, 257);
    } //                   the crown of life
    
    if (timerStart > 480) {
    fill(251, 255, 36);
    triangle(159, 220, 163, 236, 177, 236);
    triangle(170, 220, 165, 232, 176, 236);
    triangle(181, 220, 165, 236, 177, 236);
    } // The crown
    
    fill(255);
    text("Promised", 115, 325); //                  promised
    
    if (timerStart > 330) {
    textSize(45);
    text("stood the test", 61, 192);
    } //                  stood the test
    
    textFont(createFont("Franklin Gothic Medium"));
    
    fill(107, 107, 107);
    textSize(30);
    text("is the man", X+500, 40); //               is the man
    
    if(timerStart > 150) {
    text("who remains", 100, 63);
    } //                   who remains
    
    text("under trial,", 110, A+77); //             under trial
    
    text("for when he has", 86, B); //              for when he has
    
    text("he will recieve", C, 220); //             he will recieve
    
    text("which God has", 95, 292); //              which God has
    
    text("to those who Love Him.", 50, 350); //     to those who love Him.
    
    fill(0, 146, 194);
    textSize(22);
    text("~ James 1:12 ~", 120, 380);

};

mouseClicked = function() {
    moved = true;
    timerStart = true;
};
