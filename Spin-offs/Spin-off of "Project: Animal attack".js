Link:  https://www.khanacademy.org/cs/spin-off-of-project-animal-attack/5494126163394560
Created:  08/03/2015 16:07



background(21, 173, 46);
var eyeSize = 10;
var x = 275;
var y = 191;
strokeWeight(1);
fill(52, 39, 79);
rect(x+27, y+45, 18, 61); // Right leg
rect(x-49, y+43, 18, 61); // Left leg
ellipse(x, y, 145, 117); // Body
ellipse(x-103, y-57, 25, 31); // Left ear
ellipse(x-61, y-55, 25, 31); // Right ear
ellipse(x-82, y-36, 66, 70); // Head
line(x-103, y-26, 209, 165); // Topmouth
stroke(0, 0, 0);
fill(255, 255, 255); // Teeth
rect(x-92, y-26, 17, 11);
line(x-84, y-25, x-84, y-15);
draw = function() {
    strokeWeight(1);
    eyeSize = eyeSize + 0.3;
    ellipse(x-72, y-46, 10, 10);
    ellipse(x-99, y-46, eyeSize, eyeSize);
    };
strokeWeight(3); // Tail
line(x+89, y+53, x+71, y-16);
var tree = getImage("cute/TreeTall"); // Tree
image (tree, 10, 166, 150, 150);
