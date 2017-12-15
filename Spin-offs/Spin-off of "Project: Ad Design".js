// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-project-ad-design/4911385906642944
// Created:  07/29/2015 11:20




stroke(0);
var speed = 0.5;
var y=200;

var draw = function() {
    
    background(255);
    fill(32, 0, 158);
textSize(50);
strokeWeight(2);
text("The Bible", 105, 153);
textSize(17);
text("It's the key to heaven! Read it and believe it!", 44, 184);
//Top box
fill(255);
quad(168, y+19, 150, y+25, 200, y+50, 218, y+42);
//Left box
fill(107, 83, 21);
quad(150, y+25, 150, y+120, 200, y+150, 200, y+50);
var Text = ["H", "O", "L", "Y", "B", "I", "B", "L", "E"];
fill(0, 0, 0);
textSize(11);
text(Text[0], 157, y+72);
text(Text[1], 167, y+76);
text(Text[2], 178, y+80);
text(Text[3], 188, y+84);
text(Text[4], 154, y+93);
text(Text[5], 164, y+98);
text(Text[6], 171, y+102);
text(Text[7], 181, y+108);
text(Text[8], 190, y+112);
//Right box
fill(107, 83, 21);
quad(200, y+50, 200, y+150, 218, y+140, 218, y+42);
fill(0, 0, 0);
text("E", 206, y+63);
text("S", 206, y+74);
text("V", 205, y+84);

if (y>240){speed=-0.5;}
if (y<200){speed=0.5;}
y=y+speed;

};
