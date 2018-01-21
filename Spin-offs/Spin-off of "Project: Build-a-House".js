// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-project-build-a-house/6184440111431680
// Created:  01/08/2016 11:43





background(219, 255, 255);
strokeWeight(0.5);

// Tree
image(getImage("cute/TreeTall"), 5, 143, 40, 200);

// Roof
for (var c = -1; c < 4; c++) {
    image(getImage("cute/RoofEast"), c*30+231, c*20+38, 30, 102);
    image(getImage("cute/RoofWest"), c*30+81, c*-18+73, 30, 100);
    fill(112, 91, 46);
    noStroke();
    triangle(200, 100, 278, 150, 116, 150);
}

// Fence
for (var w = -10; w < 400; w+=9) {
    stroke(0);
    rect(w, 263, 10, 80, 4);
}

// Walls
for (var i = 1.3; i < 9; i++) {
    for (var a = 12; a < 27; a+=2) {
        image(getImage("cute/StoneBlockTall"), i*38, a*12, 39, 59);
    }
}

// Grass
for (var b = 0; b < 15; b++) {
    image(getImage("cute/GrassBlock"), b*29, 307, 30, 120);
}

// Door
fill(120, 80, 19);
rect(180, 273, 40, 70);

// Windows
for (var j = 2; j < 7; j++) {
    fill(110, 245, 255);
    rect(j*54-29, 195, 30, 30);
    rect(108, 284, 30, 30);
    rect(261, 284, 30, 30);
}

// Bushes
for (var B = 1; B < 9; B+=2) {
    image(getImage("cute/TreeShort"), B*44, 308, 50, 50);
}

// Hopper
image(getImage("creatures/Hopper-Happy"), 182, 333, 50, 50);
