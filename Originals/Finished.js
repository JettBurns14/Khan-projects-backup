// Link:  https://www.khanacademy.org/computer-programming/finished/6734891377360896
// Created:  02/01/2016 19:34





/**
 *   Nothing much, just future changes.
 *   http://s17.postimg.org/66mfhssjj/notes_to_jett.png
    
 *   @TODO
 *   Change a few curls.
    
 *   @Jett_2016
 *   This code belongs to ME, and no one can use it without my permission.
 *   https://www.khanacademy.org/computing/computer-programming/guidelines/pjs
 *   If you'd like to use it, please comment in the tips&thx.
**/
{
var x = 373;
var y = 175;


noFill();
stroke(0, 0, 0);
strokeWeight(8);
bezier(x-280, y-132, x-137, y-223, x-43, y-68, x-22, y+4); // Top mane
bezier(x-259, y-143, x-270, y-137, x-259, y-122, x-270, y+-120); // Top mane
strokeWeight(7);
bezier(x-91, y-13, x-109, y+2, x-168, y+65, x-116, y+117); // Split curve
bezier(x-140, y-24, x-126, y+11, x-134, y+34, x-135, y+54); // Split curve
bezier(x-138, y-24, x-142, y+-5, x-106, y+8, x-89, y+-16); // Split curve
bezier(x-236, y-106, x-202, y+-98, x-214, y+-38, x-266, y+-60); // eye
strokeWeight(5);
bezier(x-183, y-130, x-156, y+-116, x-149, y+-80, x-139, y+-44); // "S"
strokeWeight(6);
bezier(x-187, y-69, x-132, y+-9, x-216, y+98, x-175, y+150); // Neck
bezier(x-187, y-69, x-143, y+-20, x-224, y+78, x-175, y+150); // Neck
bezier(x-187, y-69, x-140, y+-32, x-217, y+105, x-173, y+152); // Neck

// Black fillings for nose and throat
fill(0);
noStroke();
// Throat
beginShape();
curveVertex(x-310, y+-29);
curveVertex(x-297, y-8);
curveVertex(x-293, y+-2);
curveVertex(x-281, y-20);
curveVertex(x-263, y-36);
curveVertex(x-228, y-50);
curveVertex(x-263, y-55);
curveVertex(x-349, y-146);
endShape();
// Nose
beginShape();
curveVertex(x-352, y+-29);
curveVertex(x-356, y-14);
curveVertex(x-349, y+-5);
curveVertex(x-336, y+-35);
curveVertex(x-309, y-60);
curveVertex(x-305, y-93);
curveVertex(x-293, y-119);
curveVertex(x-293, y-129);
curveVertex(x-283, y-133);
endShape();
// Farthest left nose
beginShape();
curveVertex(x-352, y+-29);
curveVertex(x-356, y-12);
curveVertex(x-350, y+-11);
curveVertex(x-344, y+-20);
curveVertex(x-344, y-6);
curveVertex(x-340, y+3);
curveVertex(x-330, y+14);
curveVertex(x-350, y+10);
curveVertex(x-378, y-9);
endShape();
// Farthest down left nose
beginShape();
curveVertex(x-325, y+94);
curveVertex(x-350, y+10);
curveVertex(x-327, y+11);
curveVertex(x-318, y+12);
curveVertex(x-332, y+25);
curveVertex(x-372, y+4);
endShape();
// Bottom nose
beginShape();
curveVertex(x-283, y+94);
curveVertex(x-331, y+25);
curveVertex(x-311, y+8);
curveVertex(x-304, y+-4);
curveVertex(x-300, y+18);
curveVertex(x-305, y+75);
endShape();
// Right nose
beginShape();
curveVertex(x-283, y+18);
curveVertex(x-298, y+17);
curveVertex(x-325, y+13);
curveVertex(x-314, y+8);
curveVertex(x-306, y+-5);
curveVertex(x-304, y+-33);
curveVertex(x-301, y+-25);
curveVertex(x-305, y+-14);
endShape();

// White fill-ins all over
noStroke();
fill(255, 255, 255);
pushMatrix();
translate(x-151, y-12);
rotate(33);
// Ear
ellipse(-172, -28, 36, 24);
// Right spliter
ellipse(69, -13, 34, 130);
rotate(-26);
// Spliter
bezier(73, -20, 42, 20, 8, -2, 0, -24);
stroke(255, 255, 255);
noFill();
// Curve under eye
bezier(-71, -39, -93, -18, -121, -28, -124, -38);
// Nose
bezier(-156, -72, -164, -50, -163, -47, -163, -21); // right side
bezier(-163, -20, -153, -22, -176, -19, -182, 0); // bottom left
quad(-137, 55, -128, 38, -178, 61, -164, 63); // Bottom straightedge
popMatrix();

noStroke();
fill(0);
// Smaller ear
beginShape();
curveVertex(x-263, y+-116);
curveVertex(x-276, y-138);
curveVertex(x-289, y-148);
curveVertex(x-296, y-145);
curveVertex(x-202, y+15);
endShape();
// Closest ear
beginShape();
curveVertex(x-338, y+-147);
curveVertex(x-285, y-121);
curveVertex(x-272, y-121);
curveVertex(x-272, y-131);
curveVertex(x-281, y-137);
curveVertex(x-313, y-151);
curveVertex(x-400, y+-218);
endShape();
// Closest ear
fill(255);
pushMatrix();
translate(x-282, y-125);
rotate(30);
ellipse(0, 0, 19, 12);
popMatrix();


fill(0);
// Right curl of mane
for (var  i = 0; i < 33; i+=0.7) {
    pushMatrix();
    translate(x+1, y);
    rotate(i*16);
    ellipse(i*0.7, i*0, -i*0.22, i*0.6);
    popMatrix();
    
}
// Bottom curl of spliter
for (var i = 14; i < 38; i+=0.8) {
    triangle(x-130, y+42, x-136, y-3, x-105, y-4);
    pushMatrix();
    translate(x-86, y+93);
    rotate(i*13);
    ellipse(i*1.0, i*0.1, -i*0.27+3, i*0.5);
    popMatrix();
}
// Bottom curl on ∫
for (var i = 10; i < 34; i++) {
    pushMatrix();
    translate(x-155, y+142);
    rotate(i*15);
    ellipse(i*0.6, i*0.1, i*0.17, i*0.5);
    popMatrix();   
}
// Top curl on ∫
for (var i = 6; i < 23; i++) {
    pushMatrix();
    translate(x-201, y+-59);
    rotate(i*15);
    ellipse(i*0.8, i*0.1, i*0.31, i*0.5);
    popMatrix(); 
}
// Bottom right curl on thin "S"
for (var i = 9; i < 33; i+=0.6) {
    pushMatrix();
    translate(x-106, y+-49);
    rotate(i*16);
    ellipse(i*1.0, i*0.1, i*0.17, i*0.6);
    popMatrix();
}
// Top left curl on thin "S"
for (var i = 7; i < 22; i+=0.8) {
    pushMatrix();
    translate(x-199, y+-114);
    rotate(i*14);
    ellipse(i*1.0, i*0.1, i*0.20, i*0.6);
    popMatrix();
}
// Eye
for (var i = 0; i < 18.3; i+=0.2) {
    pushMatrix();
    translate(x-244, y+-95);
    rotate(-127);
    rotate(i*20.9);
    ellipse(i*0.4, i*0.6, i*0.22, i*-0.6);
    popMatrix(); 
}
textFont(createFont("cursive", "sans")); // change to cursive
textAlign(CENTER, CENTER);
textSize(40);
text("Code", 200, 370);
println("I was inspired by this image. http://www.tattoojohnny.com/animal-horse-tattoos-joni-brace-jof-00064");
}
//background(255);
//text("Finished", 200, 200);
