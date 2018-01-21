// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-project-magic-8-ball/5292118377103360
// Created:  01/08/2016 11:45





// Click canvas to restart
fill(0, 0, 0);
ellipse(200, 200, 375, 375);
fill(196, 0, 144);
triangle(200, 100, 300, 280, 100, 280);
fill(255);
var answer = round(random(1, 5));
textSize(16);

if (answer === 1) {
    text("YES", 180, 215);
}
else if (answer === 2) {
    text("MAYBE", 175, 215);
}
else if (answer === 3) {
    text("NO CLUE", 165, 210);   
}
else if (answer === 4) {
    text("NO", 190, 215);   
}
else {
    text("PROBABLY", 160, 220);   
}

mouseClicked = function() {
    Program.restart();  
};
