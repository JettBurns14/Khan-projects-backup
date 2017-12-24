// Link:  https://www.khanacademy.org/computer-programming/crossy-road/5219254484467712
// Created:  10/07/2015 10:54




var x = 400;
var y = 293;

var treeX = 200;
var treeY = 200;

var roadX = 200;
var roadY = 200;

var riverX = 200;
var riverY = 191;

var treeX = 200;
var treeY = 200;

var truck = function() {
    noStroke();
    fill(255);
    quad(x+53, y-13, x+40, y+15, x-49, y-2, x-31, y-28);
    fill(227);
    quad(x+40, y+14, x+40, y+54, x+-48, y+36, x+-48, y+-3);
    fill(148, 148, 148);
    quad(x+53, y-13, x+53, y+28, x+40, y+54, x+40, y+13);
    fill(0);
    quad(x-37, y+47, x-37, y+38, x-21, y+41, x-21, y+50);
    quad(x+21, y+58, x+21, y+49, x+5, y+46, x+5, y+55);
    x-=1;
    y-=0.2;

    if (x < -260) {
        x=roadX+500;
        y=roadY+150;
    }
};

var tree = function(X, Y){
    noStroke();
    fill(0, 0, 0, 80);
    quad(X+44, Y-2, X+4, Y-9, X+16, Y-27, X+55, Y-20);
    // trunk
    fill(120, 70, 0);
    quad(X, Y-25, X+11, Y-20, X+11, Y-11, X, Y-13);
    quad(X+11, Y-20, X+15, Y-24, X+15, Y-17, X+11, Y-11);
    fill(0, 0, 0, 80);
    quad(X+8, Y-11.7, X+11, Y-11, X+11, Y-30, X+8, Y-25);
    fill(0, 0, 0, 130);
    quad(X+11, Y-20, X+15, Y-30, X+15, Y-17, X+11, Y-11);
    // light green parts
    fill(168, 255, 46);
    quad(X-7, Y-58, X+15, Y-54, X+14, Y-18, X-7, Y-22);
    quad(X+2, Y-72, X+23, Y-68, X+14, Y-54, X-7, Y-58);
    quad(X+23, Y-67, X+14, Y-54, X+14, Y-19, X+23, Y-31);
    // darker green parts
    fill(126, 196, 22);
    quad(X-7, Y-58, X+14, Y-54, X+14, Y-50, X-7, Y-54);
    quad(X-7, Y-47, X+14, Y-43, X+14, Y-39, X-7, Y-43);
    quad(X-7, Y-36, X+14, Y-32, X+14, Y-28, X-7, Y-32);
    quad(X-7, Y-22, X+14, Y-18, X+14, Y-22, X-7, Y-26);
    quad(X+23, Y-68, X+23, Y-64, X+14, Y-50, X+14, Y-54);
    quad(X+23, Y-56, X+23, Y-52, X+14, Y-39, X+14, Y-43);
    quad(X+23, Y-45, X+23, Y-41, X+14, Y-28, X+14, Y-32);
    quad(X+23, Y-35, X+23, Y-31, X+14, Y-18, X+14, Y-22);
    // right shadow
    fill(0, 0, 0, 140);
    quad(X+23, Y-68, X+14, Y-54, X+14, Y-18, X+23, Y-31);
};

var rock = function() {
    
};

var road = function() {
    fill(82, 82, 82);
    quad(roadX+500, roadY+153, roadX-500, roadY-35, roadX-500, roadY+14, roadX+500, roadY+212);
    fill(15, 179, 0);
    quad(roadX-500, roadY-39, roadX-500, roadY-34, roadX+400, roadY+136, roadX+400, roadY+132);
};

var river = function() {
    fill(0, 218, 247);
    quad(riverX+500, riverY+4, riverX-500, riverY-176, riverX-500, riverY-127, riverX+400, riverY+42);
    fill(15, 179, 0);
    quad(riverX-500, riverY-175, riverX+500, riverY+6, riverX+500, riverY+1, riverX-500, riverY-179);
};

var logs = function() {
    fill(107, 96, 48);
    quad(x+13, y-108, x+51, y-101, x+60, y-113, x+23, y-120);
    fill(99, 91, 42);
    quad(x+13, y-102, x+52, y-95, x+53, y-102, x+13, y-109);
    quad(x+51, y-103, x+52, y-95, x+60, y-105, x+60, y-114);
};

var chicken = function() {
    
};

draw = function() {
    background(42, 250, 0); // 42, 250, 0
    road();
    river();
    logs();
    tree(treeX+29, treeY);
    tree(treeX-198, treeY-37);
    tree(treeX-211, treeY-7);
    tree(treeX-232, treeY+19);
    tree(treeX-152, treeY-30);
    tree(treeX-169, treeY);
    tree(treeX+137, treeY+20);
    tree(treeX+181, treeY+27);
    tree(treeX+169, treeY+50);
    tree(treeX-189, treeY+28);
    tree(treeX+111, treeY-108);
    tree(treeX-103, treeY-132);
    tree(treeX-115, treeY-111);
    tree(treeX+156, treeY+73);
    tree(treeX+223, treeY+34);
    tree(treeX+211, treeY+58);
    tree(treeX+198, treeY+81);
    tree(treeX-191, treeY+127);
    tree(treeX+266, treeY+41);
    tree(treeX+254, treeY+65);
    tree(treeX+242, treeY+89);
    truck();
    tree(treeX+136, treeY+175);
    
    /*
    fill(0, 0, 0, 75);
    // Left arrow
    rect(183, 365, 15, 12);
    triangle(173, 371, 183, 382, 183, 360);
    
    // Right arrow
    rect(210, 365, 15, 12);
    triangle(235, 371, 225, 382, 225, 360);
    
    // Top arrow
    rect(198, 350, 12, 15);
    triangle(192, 350, 215, 350, 204, 340);
    
    // Bottom arrow
    rect(198, 377, 12, 15);
    triangle(192, 392, 215, 392, 204, 402);
    */
    mouseClicked = function() {
        var e = road, river, logs, truck, tree;
        
        // Up
        if (mouseClicked && mouseX < 240 && mouseX > 160 && mouseY < 340) {
            translate(-8, 25);
            e();
        }
        // Left
        if (mouseClicked && mouseX < 160) {
            translate(30, 7);
            e();
            e = constrain(e, -100, 500);
        }
        if (mouseClicked && mouseX > 240) {
            translate(-30, -5);
            e();
            e = constrain(e, 500, 0);
        }
        if (mouseClicked && mouseY > 340) {
            translate(20, -15);
            e();
            e = constrain(e, 500, 0);
        }
    };
    x-=0.05;
    y+=0.1;
    roadX-=0.1;
    roadY+=0.1;
    riverX-=0.1;
    riverY+=0.1;
    treeX-=0.1;
    treeY+=0.1;
    // Use constrain somewhere
};
