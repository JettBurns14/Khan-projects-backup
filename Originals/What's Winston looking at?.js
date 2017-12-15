// Link:  https://www.khanacademy.org/cs/whats-winston-looking-at/5357585168465920
// Created:  08/10/2015 11:16




/** I didn't expect this to get so popular! Thank you all for the votes!
    Can we reach 200 votes? <-- this is what i said.
  
    Thanks to The #1 Elongated Head(s) (READ BIO) for a little help!
    
*/



var eyeSizeW = 55;    // Adjusts eye width
var eyeSizeL = 63;    // Adjust eye length
var pupilSize = 22;    // Adjusts pupil size
var eyeReflection = 15; // Adjusts the reflection size
var x = 200; // The X position of Winston
var y = 200; // The Y position of Winston
var speed = 0.5; // The speed at which everything moves
var A = 800; // The X position of the donut
var B = 200; // The Y position of the donut
var moved = false;

var draw = function() {
background(255);
fill(66, 66, 66);
textSize(32);
text("What's Winston looking at?", 20, 10, 400, 400);

// Winston
noStroke();
fill(163, 163, 163);
ellipse(x, y, 298, 297);
fill(251, 255, 0);
ellipse(x+6, y-3, 300, 300);
fill(255, 0, 0);
ellipse(x+57, y+31, 120, 136);

// Eyes
fill(255);
ellipse(x-43, y-56, eyeSizeW, eyeSizeL);
ellipse(x+95, y-75, eyeSizeW, eyeSizeL);

// Pupils
fill(0);
ellipse(x-40, y-58, pupilSize, pupilSize);
ellipse(x+96, y-77, pupilSize, pupilSize);

// Eye reflection
noStroke();
fill(250); 
ellipse(x-35, y-70, eyeReflection, eyeReflection);
ellipse(x+101, y-90, eyeReflection, eyeReflection);

if (y>218){speed=-0.5;}
if (y<188){speed=0.5;}
y=y+speed;

if(moved) {
x-=1;
A-=1;
A = constrain(A, 150, 800);
}

fill(66, 66, 66);
text("Click to find out!", A-700, 366, 400, 400);

/***************************************************************************/
// Plate
fill(140, 140, 140);
ellipse(A+50, 245, 293, 47);
ellipse(A+50, 250, 273, 47);
fill(255);
ellipse(A+50, 244, 280, 38);

// Big Donut
fill(64, 64, 64);
ellipse(A+22, B+51, 176, 8);
fill(219, 172, 61);
noStroke();
ellipse(A, B, 100, 100);
ellipse(A+100, B, 100, 100);
rect(A, B-50, 100, 100);
noStroke();
fill(227, 227, 227);
beginShape();
vertex(A+111, B-50);
bezierVertex(A+191, B-9, A+85, B-14, A+65, B-30);
bezierVertex(A+55, B+47, A-36, B-46, A-5, B-40);
bezierVertex(A-34, B+47, A-60, B-33, A-16, B-50);
endShape();
fill(66, 66, 66);
text("A huge donut!", A-44, 289, 400, 400);
};

mouseClicked = function() {
    moved = true;
    
}; 
