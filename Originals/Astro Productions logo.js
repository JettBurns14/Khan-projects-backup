// Link:  https://www.khanacademy.org/computer-programming/astro-productions-logo/5878109416062976
// Created:  09/12/2015 13:09




var x = 120;


background(0, 0, 5);

for (var i = 0; i < 200; i++) {
    stroke(255, 255, 255, 200);
    strokeWeight(random(1,3));
    point(random(0, width), random(0, height));
}
noStroke();
fill(98, 66, 255);
ellipse(x+62, 198, 197, 197);
fill(0, 0, 17);
ellipse(185, 200, 200, 200);

fill(153, 153, 153);
textSize(40);
text("ASTRO", 123, 166, 400, 400);
textSize(24);
text("Productions", 134, 201, 400, 400);
