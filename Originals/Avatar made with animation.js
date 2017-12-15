// Link:  https://www.khanacademy.org/cs/avatar-made-with-animation/5374321011851264
// Created:  08/17/2015 08:49




/*                   I'm working on it right now.
              When it's done, hopefully it will be awesome. :)
*/

noStroke();
var x = 500;
var y = 200;
var X = 600;
var Ax = -500;
var By = 200;
var Xx = -200;
var Yy = 600;

var speed = 2;
var moved = false;

draw = function() {
    background(181, 116, 116);
    var dino = getImage("avatars/piceratops-ultimate");
image(dino, 4, 58, 300, 300);

if(moved) {
    Xx+=speed;
    Xx = constrain(Xx, -200, 200);
} // Tail&RH
if(moved) {
x-=speed;
x = constrain(x, 150, 500);
} // H&E
if(moved) {
Ax+=speed;
Ax = constrain(Ax, 0, 200);
} // Chest
if(moved) {
X-=speed;
X = constrain(X, 151, 600);
} // HS
if(moved) {
    Yy-=speed;
    Yy = constrain(Yy, 200, 600); 
} // Body

fill(0);
textSize(30);
text("Click the screen!", 108, 16, 400, 400);

// Left ear
fill(181, 47, 47);
    bezier(Xx-28, Yy-137, Xx-26, Yy-90, Xx-49, Yy-60, Xx-53, Yy-93);

// Head
fill(110, 26, 33);
beginShape();
    curveVertex(Ax-203, By-7);
    curveVertex(Ax-86, By-88);
    curveVertex(Ax-52, By-97);
    curveVertex(Ax-12, By-139);
    curveVertex(Ax-16, By-109);
    curveVertex(Ax, By-99);
    curveVertex(Ax-15, By-83);
    curveVertex(Ax-5, By-61);
    curveVertex(Ax-21, By-64);
    curveVertex(Ax-37, By-48);
    curveVertex(Ax-69, By-50);
    curveVertex(Ax-90, By-36);
    curveVertex(Ax-103, By-32);
    curveVertex(Ax-113, By-17);
    curveVertex(Ax-134, By-45);
    curveVertex(Ax-92, By-83);
    curveVertex(Ax+119, By-96);
endShape();   

fill(217, 59, 67);
beginShape();
    curveVertex(Ax-179, By+8);
    curveVertex(Ax-89, By-88);
    curveVertex(Ax-56, By-99);
    curveVertex(Ax-16, By-135);
    curveVertex(Ax-22, By-106);
    curveVertex(Ax-4, By-98);
    curveVertex(Ax-20, By-84);
    curveVertex(Ax-9, By-65);
    curveVertex(Ax-23, By-65);
    curveVertex(Ax-41, By-56);
    curveVertex(Ax-69, By-54);
    curveVertex(Ax-94, By-38);
    curveVertex(Ax-105, By-34);
    curveVertex(Ax-113, By-19);
    curveVertex(Ax-134, By-45);
    curveVertex(Ax-94, By-83);
    curveVertex(Ax+119, By-96);
endShape();  

// Eye
pushMatrix();
rotate(-20);
fill(59, 12, 12);
    ellipse(x-75, y-46, 20, 12);
fill(255);
    ellipse(x-80, y-46, 5, 5);
popMatrix();

// Nose
fill(59, 12, 12);
ellipse(Ax-121, By-59, 6, 6);

// Right hip
fill(181, 47, 47);
    bezier(168, Yy+74, 182, Yy-41, 245, Yy+92, 173, Yy+94);

// Tail
fill(122, 34, 34); // 117, 35, 35
beginShape();
    curveVertex(Xx+139, Yy+28);
    curveVertex(Xx-99, Yy+60);
    curveVertex(Xx-167, Yy+45);
    curveVertex(Xx-136, Yy+81);
    curveVertex(Xx-96, Yy+100);
    curveVertex(Xx-39, Yy+97);
    curveVertex(Xx-3, Yy+28);
    curveVertex(Xx-12, Yy-200);
endShape();

// Body
fill(224, 56, 56);
beginShape();
    curveVertex(136, Yy+18);
    curveVertex(193, Yy+31);
    curveVertex(193, Yy-17);
    curveVertex(184, Yy-39);
    curveVertex(171, Yy-35);
    curveVertex(156, Yy-39);
    curveVertex(154, Yy-24);
    curveVertex(142, Yy+6);
    curveVertex(133, Yy+39);
    curveVertex(168, Yy+63);
    curveVertex(319, Yy-10);
endShape();


// Chest
fill(232, 105, 107);
beginShape();
    curveVertex(Ax-106, By-37);
    curveVertex(Ax-71, By+77);
    curveVertex(Ax-21, By+69);
    curveVertex(Ax-4, By+20);
    curveVertex(Ax-18, By-23);
    curveVertex(Ax-28, By-10);
    curveVertex(Ax-41, By+36); // <--
    curveVertex(Ax-65, By+66);
endShape();

// Left hip shadow
fill(122, 34, 34);
beginShape();
    curveVertex(X, y);
    curveVertex(X-54, 255);
    curveVertex(X-15, 304);
    curveVertex(X-8, 253);
    curveVertex(X-37, 256);
    curveVertex(X-70, 325);
endShape();

// Left hip
fill(224, 56, 56);
beginShape();
    curveVertex(x-33,  y-11);
    curveVertex(x-11,  y+63);
    curveVertex(x-32,  y+94);
    curveVertex(x-54,  y+80);
    curveVertex(x-49, y+44);
    curveVertex(x-12, y+13);
    curveVertex(x+41, y-8);
endShape();
};

mouseClicked = function() {
    moved = true;
    
}; 
