// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-project-whats-for-dinner/6022828137775104
// Created:  09/10/2015 12:01




background(92, 75, 0);

// plate
fill(255);
ellipse(200, 234, 340, 164);
ellipse(200, 234, 300, 135); 

// Pie :D
fill(66, 49, 17);
for(var i = 150; i < 168; i++) {
    strokeWeight(random(0.5, 2.1));
    point(i*random(0.8,2)-40, i*random(1.5, 1.7));
}
triangle(97, 238, 221, 174, 278, 221);
fill(99, 76, 43);
quad(96, 260, 274, 245, 278, 221, 98, 238);
for(var i = 58; i < 73; i+=2) {
    fill(97, 80, 45);
    ellipse(i*3.85, i*3, 14, 12);
}
strokeWeight(0.5);
fill(237);
ellipse(206, 204, 41, 27);
ellipse(200, 199, 30, 20);
ellipse(185, 211, 30, 22);
ellipse(188, 197, 30, 20);
ellipse(209, 212, 33, 21);
fill(201, 0, 0);
ellipse(200, 191, 25, 25);
