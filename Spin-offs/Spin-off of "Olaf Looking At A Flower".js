// Link:  https://www.khanacademy.org/cs/spin-off-of-olaf-looking-at-a-flower/5201356781649920
// Created:  08/10/2015 10:37




// This is my second version of Olaf


var eyeshadowS1 = 17; // Adjusts the width of the shadow by the eye
var eyeshadowS2 = 25; // Adjusts the length of the shadow by the eye
var eyeSizeW = 14;    // Adjusts eye width
var eyeSizeL = 19;    // Adjust eye length
var pupilSize = 6;    // Adjusts pupil size.
var eyeReflection = 2;// Adjusts size of the eye reflection
var snowShadow1 = 77; // Adjusts size of a shadow on the snow
var snowShadow2 = 4;  // Adjusts size of a shadow on the snow
var flowerShadow = 1; // Adjusts size of the flower's shadow
var flowerPollen = 3; // Adjusts size of the flower pollen
var flowerCenter = 4; // Adjusts size of the center of the flower

//background
background(7, 149, 184);

//snow
noStroke();
fill(193, 221, 245);
rect(0, 281, 417, 72);
arc(0, 281, 875, 222, 253, 385);

//shadow
fill(124, 170, 207);
ellipse(238, 359, 121, 24);

//hair
strokeWeight(2);
stroke(66, 39, 11);
line(196, 81, 198, 96);
line(192, 73, 196, 81);
line(192, 68, 192, 72);
noFill();
arc(186, 76, 14, 17, 212, 315);
line(204, 80, 201, 95);
line(212, 63, 204, 80);
arc(218, 67, 14, 12, 212, 289);
line(210, 67, 214, 66);
line(208, 85, 202, 97);
strokeWeight(1);
line(213, 76, 207, 86);
strokeWeight(2);
line(213, 83, 209, 85);
line(221, 83, 213, 83);
line(225, 85, 220, 83);

//bottom button
noStroke();
fill(0);
rect(160, 285, 10, 15, 11);

//right foot
fill(250);
rotate(-24);
rect(65, 386, 29, 29, 84);
resetMatrix();
bezier(244, 320, 258, 329, 273, 356, 233, 349);
noStroke();
fill(192, 192, 224); 
triangle(237, 344, 246, 320, 219, 327);
fill(216, 216, 230);
triangle(237, 344, 241, 331, 225, 334);
noFill();
strokeWeight(3);
stroke(87, 86, 115);
arc(225, 303, 53, 46, 409, 457);
strokeWeight(2);
stroke(161, 161, 209);
arc(235, 329, 29, 41, 459, 542);

//left foot   
noStroke();
fill(250);
bezier(183, 331, 179, 322, 206, 317, 210, 335);
bezier(198, 329, 206, 316, 227, 349, 202, 355);
bezier(207, 354, 168, 361, 176, 335, 183, 328);
rect(181, 331, 23, 17);
noStroke();
fill(192, 192, 224); 
triangle(213, 348, 211, 330, 184, 325);
fill(216, 216, 230);
triangle(213, 347, 207, 333, 184, 327);
noFill();
strokeWeight(4);
stroke(87, 86, 115);
arc(191, 347, 53, 46, 264, 312);
strokeWeight(2);
stroke(161, 161, 209);
arc(199, 340, 28, 30, 311, 455);

//1st arm
strokeWeight(4);
stroke(66, 39, 11);
line(191, 237, 162, 274);
noStroke();
fill(66, 39, 11);
quad(157, 273, 150, 282, 159, 282, 165, 274);
quad(155, 281, 150, 291, 154, 291, 163, 273);
quad(158, 274, 139, 290, 144, 291, 157, 280);
quad(151, 278, 135, 283, 139, 286, 165, 274);
ellipse(143, 288, 8, 3);
ellipse(153, 290, 5, 4);
ellipse(138, 282, 6, 3);

//bottom ball (body)
noStroke();
fill(250);
quad(229, 246, 167, 261, 169, 313, 250, 315); 
bezier(232, 253, 168, 232, 161, 275, 169, 313);
bezier(227, 246, 267, 260, 260, 322, 247, 314);
bezier(252, 313, 222, 336, 182, 327, 169, 312);

//middle ball (body)
fill(250);
bezier(223, 264, 273, 176, 148, 192, 184, 248);
noFill();  //shadowing  
stroke(161, 161, 209);   
arc(206, 257, 62, 17, 230, 297);
arc(226, 241, 13, 17, 411, 461);
noStroke();

//first button
fill(0);
bezier(182, 228, 187, 196, 162, 232, 182, 229);
fill(250);
line(182, 231, 185, 222);

//middle button
noStroke();
fill(0);
rotate(17);
rect(235, 197, 9,16, 9);
resetMatrix();
noStroke();
fill(250);
line(172, 275, 176, 262);
fill(250);
line(176, 270, 175, 260);
line(176, 270, 169, 276);

// head
fill(250);
quad(224, 136, 174, 123, 179, 193, 218, 199);
bezier(231, 139, 222, 98, 195, 73, 174, 123);
bezier(176, 121, 159, 141, 159, 136, 180, 196);
bezier(223, 132, 256, 130, 205, 235, 211, 239);
bezier(220, 196, 206, 226, 183, 204, 179, 193);

//mouth
noStroke();//Mouth shadowing
fill(192, 192, 224); 
triangle(220, 203, 193, 215, 188, 208);
fill(216, 216, 230);
triangle(202, 211, 193, 215, 189, 210);
fill(89, 92, 125);
bezier(220, 161, 215, 218, 183, 228, 176, 163);
noFill();
stroke(250);
strokeWeight(5);
arc(197, 179, 41, 54, 45, 130);
strokeWeight(2); //Shadowing
stroke(161, 161, 209);
arc(195, 189, 32, 38, 84, 161);
arc(200, 193, 31, 30, 49, 99);
arc(216, 245, 29, 85, 255, 289);

//tooth
fill(250);
noStroke();
rect(180, 162, 27, 17, 20);
rect(178, 157, 38, 11, 5);
stroke(161, 161, 209);
fill(250);
bezier(183, 170, 171, 164, 174, 157, 170, 148);
bezier(223, 159, 208, 178, 204, 166, 185, 170);

//eyes 
noStroke();
fill(161, 161, 209);
ellipse(191, 125, eyeshadowS1, eyeshadowS2);
ellipse(208, 126, eyeshadowS1, eyeshadowS2);
fill(192, 192, 224);    
bezier(220, 131, 214, 142, 202, 143, 201, 133);
bezier(199, 129, 201, 142, 185, 141, 180, 130);
stroke(0);
fill(250);
ellipse(191, 125, eyeSizeW, eyeSizeL);
ellipse(208, 126, eyeSizeW, eyeSizeL);
fill(0); //pupils
ellipse(192, 130, pupilSize, pupilSize);
ellipse(208, 133, pupilSize, pupilSize);
noStroke();
fill(250);
ellipse(193, 128, eyeReflection, eyeReflection);
ellipse(209, 130, eyeReflection, eyeReflection);

//eyebrows
noStroke();//right eyebrow
fill(56, 33, 9);
quad(204, 102, 205, 107, 214, 112, 214, 109);
stroke(56, 33, 9);
strokeWeight(1);
bezier(216, 113, 209, 106, 220, 118, 219, 119);
bezier(216, 114, 214, 110, 212, 110, 219, 117);
noStroke();//left eyebrow
fill(56, 33, 9);
quad(185, 109, 183, 113, 198, 107, 199, 102);
quad(181, 116, 179, 118, 183, 111, 194, 106);

//2nd arm
fill(192, 192, 224); 
triangle(223, 260, 225, 248, 197, 249);
fill(216, 216, 230);
triangle(223, 260, 227, 253, 203, 252);
stroke(56, 33, 9);
strokeWeight(4);
fill(56, 33, 9);
quad(248, 284, 237, 275, 237, 276, 245, 283); 
bezier(231, 267, 215, 288, 236, 255, 233, 277);
fill(66, 39, 11); 
noStroke();
ellipse(211, 225, 10, 10);
stroke(66, 39, 11);
line(233, 269, 210, 229);
bezier(225, 246, 208, 235, 220, 222, 210, 223);
bezier(230, 263, 238, 309, 224, 233, 223, 250);
quad(241, 287, 236, 275, 236, 276, 241, 287);
quad(233, 286, 231, 266, 232, 281, 233, 288);

//carrot nose
fill(230, 106, 23);
noStroke();
quad(190, 162, 196, 138, 203, 155, 190, 167);
bezier(199, 139, 185, 135, 183, 154, 191, 161);
bezier(194, 139, 208, 134, 207, 160, 199, 157);
bezier(190, 169, 185, 132, 189, 165, 197, 145);
bezier(205, 149, 206, 149, 197, 159, 189, 169);
noFill();
stroke(196, 106, 15);
arc(196, 149, 14, 17, 230, 361);
strokeWeight(2.5);
stroke(230, 137, 23);
line(190, 147, 191, 163);
line(192, 141, 190, 147);

//Snow
noStroke(); 
fill(193, 221, 245);
rect(0, 352, 411, 97);
rect(213, 348, 190, 9);
fill(124, 170, 207); //shadow
ellipse(238, 353, snowShadow1, snowShadow2);
ellipse(249, 350, snowShadow1, snowShadow2);
ellipse(243, 354, 98, 10);
rotate(8);
ellipse(342, 317, 92, 12);
rotate(54);
ellipse(465, -87, 5, 34);
resetMatrix();
triangle(278, 373, 254, 357, 306, 366);

//flower shadow    
strokeWeight(1);
noFill();
stroke(124, 170, 207);
arc(204, 395, 45, 26, 314, 360);
arc(197, 389, 106, 19, 301, 372);
arc(244, 369, 35, 20, 363, 487);
arc(248, 383, 31, 11, 229, 364);
fill(124, 170, 207);
ellipse(253, 390, 14, flowerShadow);
ellipse(256, 391, 14, flowerShadow);
ellipse(251, 392, 8, 6);
ellipse(246, 391, 6, flowerShadow);
ellipse(242, 392, 2, flowerShadow);

//Flower
strokeWeight(2);
noFill();
stroke(3, 46, 8);
arc(220, 366, 8, 72, 267, 383);
arc(240, 372, 12, 76, 171, 281);
arc(247, 380, 24, 49, 183, 281);
arc(206, 382, 26, 60, 265, 364);
arc(230, 376, 12, 76, 209, 281);
stroke(25, 105, 30);
arc(241, 373, 12, 76, 209, 281);
arc(204, 382, 26, 60, 271, 307);
stroke(160, 29, 204);
fill(182, 81, 219);    
arc(213, 315, 9, 16, 293, 453);
arc(216, 315, 15, 18, 480, 608);
arc(208, 325, 15, 12, 405, 501);
arc(205, 329, 8, 6, 202, 272);
arc(209, 317, 15, 18, 424, 532);
arc(205, 319, 8, 6, 217, 339);
arc(213, 325, 10, 14, 403, 509);
arc(218, 319, 15, 18, 366, 494);
arc(222, 326, 21, 16, 255, 287);
stroke(139, 29, 179);
strokeWeight(1);
line(212, 320, 212, 314);
line(212, 324, 209, 322);
line(210, 324, 208, 322);
noStroke();
fill(235, 217, 17);
ellipse(207, 322, flowerPollen, flowerPollen);
ellipse(209, 319, flowerPollen, flowerPollen);
ellipse(212, 312, flowerPollen, flowerPollen);
fill(101, 15, 138);
ellipse(212, 324, flowerCenter, flowerCenter);
