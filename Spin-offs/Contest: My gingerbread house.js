// Link:  https://www.khanacademy.org/computer-programming/my-gingerbread-house/5939601329487872
// Created:  12/01/2015 21:40





// I've been programming 8 months, and I have learned 100% of Intro to JS.

/**     I hope you all have a very merry Christmas and new year!    **/

/**  @TODO
 *   Door X
 *   Windows X
 *   Lolipops? No
 *   Icing X
 *   Reath X
 *   Shingles (gumdrops) X
 *   Trees? X
 *   Logs? No
 *   Snowman X
 *   More to come...
**/
// If you can't see the window very well, you can change this to "true" to hide Olaf.
var noOlaf = false;

// Look in here to find the variables
{
    /**  You can change these if you wish!  **/
    
    var lightBrown = color(191, 143, 70); // This controls the lighter brown color of the house.
    var darkBrown = color(179, 126, 52); // This controls the darker brown color of the house.
    var roofColor = color(182, 155, 82); // This controls the color of the roof below the gumdrops.
    var icingColor = color(252); // This controls the color of the icing.
    var colors = [
        color(255, 0, 0), 
        color(255),
        color(0, 0, 255)
]; // This controls the color of the gumdrops on the roof.
    translate(0, 50);
    var x = 222; // This controls the "x" position of the house...
    var y = 207; // and this controls the "y" position.
    var r = random(0, 50); // Random tree colors
    var g = random(80, 140); // Random tree colors
}

// Olaf's variables are in here.
{
// Carrot's position
var c = 212;
var C = 176;

// Mid-body position
var x2 = 200;
var y2 = 209;

// Head's position
var x3 = 201;
var y3 = 211;

// Lower-body position
var x4 = 200;
var y4 = 215;

// Eye's position
var eyeX = 232;
var eyeY = 85;

// Leg's position
var legX = 202;
var legY = 197;

// Left arm's position
var armX = 203;
var armY = 200;

// Right arm's position
var armx = 196;
var army = 213;
}

// This is where the icicles are drawn
var icicles = function() {
    
    // This code draws the icicles near the middle of the house.
    for (var i = 0; i < 40; i++) {
        fill(240, 254, 255);
        ellipse(i*4+x-145, i*0.6+y-58, 2, random(15,45));
    }
    
    // This code draws the icicles on the right side.
    for (var j = 0; j < 19; j++) {
        ellipse(j*3+x+116, j*-1.5+y+1, 2, random(15,45));
    }
    
    // This draws the icicles on the left side.
    for (var i = 0; i < 14; i++) {
        ellipse(i*4+x-199, i*0.6+y-45, 2, random(15,45));
    }
};

// This is where I draw the green steps
var peppermint = function(X, Y) {
    
    // I control where I want the different steps with parameters. The uppercase X and Y are the parameters, which I can fill in when I call the function below. If you want to learn more about a function's parameters, go here: https://www.khanacademy.org/computing/computer-programming/programming/functions/p/function-parameters
    
    fill(135, 255, 99);
    ellipse(x+X, y+Y, 30, 9);
    ellipse(x+X, y+Y+2, 33, 10);
};

// This is where the candy canes are drawn
var candyCane = function(X, Y) {
    
    stroke(255, 0, 0);
    strokeWeight(8);
    pushMatrix();
    translate(X, Y);
    line(x+17, y-19, x+17, y+115);
    stroke(255);
    strokeWeight(3);
    line(x+15, y-19, x+19, y+-1);
    line(x+15, y+9, x+19, y+25);
    line(x+15, y+36, x+19, y+52);
    line(x+15, y+63, x+19, y+78);
    line(x+15, y+91, x+19, y+105);
    popMatrix();
    
    noStroke();
    fill(61, 46, 17);
    triangle(x-210, y+-81, x-186, y+-98, x-195, y+-66);
    triangle(x+151, y-40, x+166, y-82, x+180, y-26);
    
};

// This draws the candy trees
var candyTree = function(x, y) {
    
    // Got this from "Wreck it Ralph", thought they would look good as trees.
    
    // Stems
    noFill();
    strokeWeight(6);
    stroke(235, 217, 164);
    bezier(x, y, x+2, y-30, x+2, y-40, x+7, y-81);
    strokeWeight(3);
    bezier(x+3, y-46, x+10, y-47, x+17, y-51, x+19, y-60);
    bezier(x, y-20, x-10, y-22, x-17, y-30, x-16, y-36);
    bezier(x, y-37, x-7, y-40, x-10, y-46, x-12, y-55);
    bezier(x, y+-19, x+2, y-15, x+7, y-11, x+9, y-30);
    
    // Lolipop ends
    noStroke();
    fill(255, 0, 255, 180);
    ellipse(x+8, y-84, 25, 25);
    ellipse(x+20, y-61, 10, 10);
    ellipse(x-16, y-37, 10, 10);
    ellipse(x-12, y-55, 10, 10);
    ellipse(x+10, y-31, 10, 10);
};

// This draws the gingerbread walls
var house = function() {
    // Snow
    fill(255);
    quad(108, 202, 539, 287, 104, 654, -60, 268);
    
    // Walls
    {
    noStroke();
    fill(darkBrown);
    quad(x+17, y-37, x+107, y-64, x+99, y+67, x+17, y+108);
    quad(x+109, y-2, x+166, y-31, x+166, y+75, x+110, y+109);
    triangle(x+16, y-36, x+60, y-135, x+108, y-63);
    fill(lightBrown);
    quad(x+40, y-29, x+110, y-3, x+110, y+109, x+40, y+96);
    quad(x-141, y-59, x+17, y-36, x+17, y+109, x-141, y+81);
    quad(x-193, y+49, x-193, y-48, x-131, y-39, x-136, y+60);
    }
    
    // Door
    {
    for (var i = 0; i < 13; i++) {
    fill(icingColor);
    // There are spaces here so you can read this code easier
    ellipse(x-79, i * 6 + y + 16, 10, 12);
    ellipse(x-125, i * 6 + y + 8, 10, 12);
    ellipse(i * 4 + x - 126, i * 0.7 + y + 7, 10, 12);
    }
    fill(lightBrown);
    stroke(darkBrown);
    quad(x-112, y+79, x-92, y+83, x-92, y+65, x-112, y+61);
    // Doorknob
    fill(0);
    ellipse(x-88, y+70, 3, 10);
    ellipse(x-88, y+62, 4, 4);
    }
    
    // Door window
    {
    fill(36, 36, 36);
    quad(x-117, y+20, x-108, y+22, x-108, y+31, x-117, y+29); // Top Left
    quad(x-117, y+31, x-108, y+33, x-108, y+42, x-117, y+40); // Center Left
    quad(x-117, y+42, x-108, y+44, x-108, y+53, x-117, y+51); // Bottom Left
    quad(x-106, y+22, x-97, y+23, x-97, y+33, x-106, y+31); // Top Center
    quad(x-106, y+33, x-97, y+35, x-97, y+44, x-106, y+42); // Center Center
    quad(x-106, y+44, x-97, y+46, x-97, y+55, x-106, y+53); // Bottom Center
    quad(x-95, y+24, x-87, y+25, x-87, y+34, x-95, y+33); // Top Right
    quad(x-95, y+35, x-87, y+37, x-87, y+46, x-95, y+44); // Center Right
    quad(x-95, y+47, x-87, y+49, x-87, y+58, x-95, y+56); // Center Right
    }
    
    // Big center window
    {
    pushMatrix();
    translate(x-205, y-307);
    scale(1.4);
    quad(x-117, y+20, x-108, y+22, x-108, y+31, x-117, y+29); // Top Left
    quad(x-117, y+31, x-108, y+33, x-108, y+42, x-117, y+40); // Top-center Left
    quad(x-117, y+42, x-108, y+44, x-108, y+53, x-117, y+51); // Bottom-center Left
    quad(x-117, y+53, x-108, y+55, x-108, y+63, x-117, y+61); // Bottom left
    quad(x-106, y+22, x-97, y+23, x-97, y+33, x-106, y+31); // Top Center
    quad(x-106, y+33, x-97, y+35, x-97, y+44, x-106, y+42); // Top-center Center
    quad(x-106, y+44, x-97, y+46, x-97, y+55, x-106, y+53); // Bottom-center Center
    quad(x-106, y+55, x-97, y+57, x-97, y+66, x-106, y+64); // Bottom center
    quad(x-95, y+24, x-87, y+25, x-87, y+34, x-95, y+33); // Top Right
    quad(x-95, y+35, x-87, y+37, x-87, y+46, x-95, y+44); // Top-center Right
    quad(x-95, y+47, x-87, y+49, x-87, y+58, x-95, y+56); // Bottom-center Right
    quad(x-95, y+58, x-87, y+60, x-87, y+67, x-95, y+66); // Bottom right
    popMatrix();
    }
    
    // Right window
    {
    pushMatrix();
    scale(1.5);
    translate(x-141, y-282);
    quad(x-117, y+20, x-108, y+22, x-108, y+31, x-117, y+29); // Top Left
    quad(x-117, y+31, x-108, y+33, x-108, y+42, x-117, y+40); // Bottom Left
    quad(x-106, y+22, x-97, y+24, x-97, y+33, x-106, y+31); // Top Right
    quad(x-106, y+33, x-97, y+35, x-97, y+44, x-106, y+42); // Bottom Right
    popMatrix();
    }
    
    // Left window
    {
    pushMatrix();
    translate(x-282, y-243);
    quad(x-117, y+20, x-108, y+22, x-108, y+31, x-117, y+29); // Top Left
    quad(x-117, y+31, x-108, y+33, x-108, y+42, x-117, y+40); // Bottm Left
    quad(x-106, y+22, x-97, y+24, x-97, y+33, x-106, y+31); // Top Right
    quad(x-106, y+33, x-97, y+35, x-97, y+44, x-106, y+42); // Bottom Right
    popMatrix();
    }
    
    // Top right window
    {
    pushMatrix();
    scale(1.5);
    translate(x-145, y-348);
    quad(x-116, y+19, x-112, y+16, x-112, y+25, x-116, y+28); // Top Left
    quad(x-116, y+30, x-112, y+27, x-112, y+35, x-116, y+38); // Bottom Left
    quad(x-110, y+15, x-106, y+12, x-106, y+21, x-110, y+24); // Top Right
    quad(x-110, y+26, x-106, y+23, x-106, y+31, x-110, y+34); // Bottom Right
    popMatrix();
    }
    
    // Far right window
    {
    pushMatrix();
    scale(1.5);
    translate(x-94, y-276);
    quad(x-116, y+19, x-112, y+16, x-112, y+25, x-116, y+28); // Top Left
    quad(x-116, y+30, x-112, y+27, x-112, y+35, x-116, y+38); // Bottom Left
    quad(x-110, y+15, x-106, y+12, x-106, y+21, x-110, y+24); // Top Right
    quad(x-110, y+26, x-106, y+23, x-106, y+31, x-110, y+34); // Bottom Right
    popMatrix();
    }
    
    // Icing around windows
    {
    stroke(255);
    noFill();
    quad(x-179, y+6, x-179, y-19, x-155, y-14, x-155, y+11); // Far left window
    quad(x-61, y+71, x-14, y+80, x-14, y+15, x-61, y+6); // Center window
    quad(x+55, y+53, x+91, y+61, x+90, y+25, x+54, y+17); // Center-right window
    quad(x+146, y+48, x+127, y+60, x+127, y+26, x+146, y+16); // Far right window
    quad(x+50, y-80, x+50, y-48, x+70, y-60, x+70, y-94); // Top-right window
    }
    
    // Reath
    for (var i = 0; i < 363; i+=27) {
    pushMatrix();
    fill(13, 171, 13, 207); 
    translate(x-102, y+35);
    image(getImage("avatars/leaf-red"), -9, 2, 15, 15);
    rotate(i);
    fill(255, 0, 0);
    noStroke();
    ellipse(14, -9, 3, 3);
    fill(13, 171, 13, 207); 
    stroke(4, 115, 7);
    ellipse(-12, 0, 13, 5);
    ellipse(-8, 4, 11, 5);
    ellipse(-9, -10, 10, 3);
    popMatrix();
    }
};

// This draws the roof and the gumdrops on it
var gumDrops = function() {
    
    // Icing behind the center roof
    for (var i = 0; i < 18; i++) {
        fill(icingColor);
        noStroke();
        ellipse(i*2.5+x+18, i*-5.3+y-35, 7, 7);
    }
    
    // Icing behind the right roof
    for (var i = 0; i < 15; i++) {
        fill(icingColor);
        noStroke();
        ellipse(i*5+x+39, i*2.1+y-26, 7, 8);
    }
    
    // Left roof
    fill(61, 46, 17);
    triangle(x-185, y-81, x-188, y-100, x-219, y-8);
    fill(roofColor);
    quad(x-168, y-116, x-102, y-106, x-144, y-39, x-201, y-47);
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            fill(colors[i%colors.length]);
            ellipse(j*-9+i*17+x-164, j*17+i*2.5+y-108, 19, 19);
        }
    }
    
    // Center roof
    fill(roofColor);
    quad(x+65, y-134, x-96, y-155, x-148, y-58, x+16, y-33);
    quad(x+66, y-134, x+60, y-135, x+106, y-63, x+113, y-61);
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 5; j++) {
            fill(colors[i%colors.length]);
            ellipse(j*-9+i*17+x-92, j*20+i*2.4+y-146, 21, 21);
        }
    }
    
    // Right roof
    fill(roofColor);
    quad(x+172, y-30, x+96, y-59, x+32, y-29, x+109, y+3);
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            fill(colors[i%colors.length]);
            ellipse(j*-14+i*18+x+99, j*8+i*7.7+y-54, 21, 14);
        }
    }
};

// This draws the icing
var icing = function() {
    for (var i = 0; i < 41; i++) {
        fill(icingColor);
        noStroke();
        ellipse(x+39, i*3+y-25, 3, 3);
    }
    // Top of house
    for (var i = 0; i < 27; i++) {
        ellipse(i*6+x-94, i*0.8+y-157, 8, 6);
    }
    
    // Inside roof on right
    for (var i = 0; i < 14; i++) {
        ellipse(i*3+x+64, i*4.6+y-125, 7, 7);
    }
    
    // Far left
    for (var i = 0; i < 8; i++) {
        ellipse(i*6+x+-166, i*0.9+y-118, 8, 6);
    }
    
    // Snow around the house's parimeter, front of house
    for (var i = 0; i < 27; i++) {
        fill(255);
        ellipse(i*6+x-145, i*1.1+y+82, random(6,9), random(6,9));
    }
    
    // Far left
    for (var i = 0; i < 11; i++) {
        ellipse(i*5+x-193, i*1.0+y+51, random(6,9), random(6,9));   
    }
    
    // Center right
    for (var i = 0; i < 13; i++) {
        ellipse(i*5+x+42, i*0.9+y+98, random(6,9), random(6,9));   
    }
    
    // Far right
    for (var i = 0; i < 11; i++) {
        ellipse(i*5+x+117, i*-3+y+107, random(6,9), random(6,9));   
    }
};

// This is the "Merry Christmas" text * background
var merryChristmas = function() {
    var f = createFont("fantasy");
    textFont(f);
    textSize(30);
    fill(255);
    text("Merry Christmas!", 84, -10);
};

// This draws the Christmas tree in the background
var tree = function() {
    for (var i = 0; i < 13; i++) {
        fill(r, g, 0);
        ellipse(i*7+x+19, i*26+y+-243, 40, 40);
        ellipse(i*-7+x-56, i*26+y+-245, 40, 40);
        ellipse(i*-8+x-25, i*26+y+-252, 40, 40);
        ellipse(i*-1+x-17, i*26+y+-246, 40, 40);
        ellipse(i*4+x-11, i*26+y+-225, 40, 40);
        fill(255, 0, 0);
        ellipse(251, 43, 35, 35);
        ellipse(178, -45, 25, 25);
        fill(0, 0, 255);
        ellipse(155, 42, 25, 25);
        ellipse(226, -25, 25, 25);
        fill(255, 255, 0);
        ellipse(188, 5, 20, 20);
        ellipse(200, 65, 20, 20);
    }
    filter(BLUR, 5);
};

// This draws Olaf! :D
var Olaf = function() {
    
    scale(0.35);
    translate(300, 607);
    
    strokeWeight(1);
    stroke(0);
    fill(255);
    // Left leg
    beginShape();
    curveVertex(legX+142, legY-197);    
    curveVertex(legX+11, legY+117);
    curveVertex(legX+32, legY+165);
    curveVertex(legX+47, legY+117);
    curveVertex(legX-46, legY-157);
    endShape();
    ellipse(legX+29, legY+158, 41, 19);
        
    // Right leg
    beginShape();
    curveVertex(legX+124, legY-164);
    curveVertex(legX+50, legY+120);
    curveVertex(legX+64, legY+164);
    curveVertex(legX+82, legY+117);
    curveVertex(legX-67, legY-193);
    endShape();
    ellipse(legX+67, legY+158, 35, 17);
    noStroke();
    ellipse(legX+67, legY+155.9, 38, 19);
    
    // Lower body
    stroke(0);
    beginShape();
    curveVertex(x4+-148, y4+95);
    curveVertex(x4+45, y4+126);
    curveVertex(x4+106, y4+96);
    curveVertex(x4+92, y4+31);
    curveVertex(x4+23, y4+24);
    curveVertex(x4-16, y4+46);
    curveVertex(x4-9, y4+105);
    curveVertex(x4+46, y4+126);
    curveVertex(x4+148, y4+116);
    endShape();
        
    // Left arm
    noFill();
    stroke(71, 53, 22);
    strokeWeight(4);
    pushMatrix();
    translate(armX, armY);
    rotate(-30);
    arc(-12, -27, 31, 135, 315, 387);
    strokeWeight(3);
    line(3, -89, 0, -77);
    line(-4, -89, -2, -77);
    line(-9, -84, -2, -74);
    line(8, -73, 2, -66);
    popMatrix();
    fill(71, 53, 22);
    triangle(armX-24, armY-49, armX+-7, armY+-13, armX+-1, armY+-7);
    
    // Middle body
    fill(255);
    strokeWeight(1);
    beginShape();
    curveVertex(x2-91, y2+25);
    curveVertex(x2+29, y2+41);
    curveVertex(x2+71, y2+33);
    curveVertex(x2+61, y2-12);
    curveVertex(x2+16, y2-15);
    curveVertex(x2+2, y2+19);
    curveVertex(x2+16, y2+39);
    curveVertex(x2+53, y2+41);
    curveVertex(x2+-15, y2+39);
    endShape();
        
    // Head
    beginShape();
    curveVertex(x3-98, y3+-86);
    curveVertex(x3+43, y3-158);
    curveVertex(x3+74, y3+-113);
    curveVertex(x3+86, y3+-81);
    curveVertex(x3+53, y3-14);
    curveVertex(x3+22, y3-18);
    curveVertex(x3+2, y3+-92);
    curveVertex(x3+12, y3+-131);
    curveVertex(x3+47, y3+-158);
    curveVertex(x3+146, y3+-116);
    endShape();
    strokeWeight(2);
    stroke(82, 69, 32);
    noFill();
    arc(x3+68, y3-162, 38, 41, 172, 268);
    arc(x3+23, y3-161, 38, 87, 291, 363);
    arc(x3+18, y3-152, 26, 75, 296, 348);
    arc(x3+19, y3-145.7, 26, 64, 241, 339);
    
    fill(255);
    stroke(0);
    strokeWeight(1);
    // Tooth
    beginShape();
    curveVertex(x3+13, y3-174);
    curveVertex(x3+58, y3+-69);
    curveVertex(x3+36, y3+-56);
    curveVertex(x3+33, y3+-76);
    curveVertex(x3+50, y3+-141);
    endShape();
    // Smile
    beginShape();
    curveVertex(x3+91, y3+-165);
    curveVertex(x3+77, y3-82);
    curveVertex(x3+42, y3+-69);
    curveVertex(x3+14, y3+-99);
    curveVertex(x3+36, y3+-167);
    endShape();
    noFill();
    arc(x3+14, y3-98, 6, 3, 187, 313);
    
    // Eyes
    strokeWeight(1.7);
    stroke(0, 0, 0, 150);
    ellipse(eyeX, eyeY+3, 21, 22);
    ellipse(eyeX+22, eyeY+3, 21, 22);
    fill(0);
    ellipse(eyeX, eyeY+3, 8, 8);
    ellipse(eyeX+21, eyeY+3, 8, 8);
    stroke(255);
    strokeWeight(0.3);
    point(eyeX+3, eyeY+1.8);
    point(eyeX+24, eyeY+1.6);
    
    // Eye brows
    pushMatrix();
    translate(eyeX-1, eyeY+2);
    rotate(-11);
    noStroke();
    fill(71, 53, 22);
    rect(4, -24, 11, 4);
    triangle(-7, -15, 4, -24, 6, -20);
    popMatrix();
    pushMatrix();
    translate(eyeX, eyeY+2);
    rotate(20);
    rect(7, -30, 11, 4);
    triangle(31, -24, 19, -30, 14, -27);
    popMatrix();
    
    // Carrot
    fill(255, 169, 64);
    stroke(0);
    strokeWeight(1);
    beginShape();
    curveVertex(c-80, C+25);
    curveVertex(c+27, C-72);
    curveVertex(c+58, C-49);
    curveVertex(c+58, C-42);
    curveVertex(c+48, C-48);
    curveVertex(c+40, C-54);
    curveVertex(c+26, C-65);
    curveVertex(c+44, C-73);
    curveVertex(c+136, C-37);
    endShape();
    
    // Right arm
    fill(71, 53, 22);
    stroke(71, 53, 22);
    strokeWeight(4);
    line(armx+60, army+6, armx+86, army+89);
    strokeWeight(3);
    line(armx+96, army+100, armx+87, army+91);
    line(armx+90, army+105, armx+86, army+90);
    line(armx+82, army+105, armx+85, army+93);
    line(armx+77, army+93, armx+84, army+82);
    triangle(armx+78, army+49, armx+62, army+13, armx+77, army+64);
    triangle(armx+85, army+89, armx+86, army+88, armx+78, army+61);
    
    // Buttons
    fill(0);
    noStroke();
    ellipse(x4+13, y4+98, 20, 20);
    ellipse(x4+12, y4+58, 20, 20);
    ellipse(x2+25, y2+11, 20, 20);
    fill(46, 46, 46);
    ellipse(x4+16, y4+98, 12, 14);
    ellipse(x4+15, y4+58, 12, 14);
    ellipse(x2+27, y2+11, 12, 14);
    // Part of left foot
    noStroke();
    fill(255);
    ellipse(legX+27, legY+154.4, 39.0, 21);
};

// This obviously draws everything.
var drawEverything = function() {
    background(61, 46, 17);
    tree();
    house();
    candyCane(-3, -10);
    candyCane(-209, -68);
    candyCane(93, -9);
    candyCane(148, -45);
    noStroke();
    icicles();
    gumDrops();
    icing();
    candyCane(-158, -35);
    candyTree(40, 325);
    candyTree(383, 331);
    candyTree(291, 358);
    peppermint(-108, 100);
    peppermint(-110, 119);
    peppermint(-104, 139);
    peppermint(-94, 159);
    peppermint(-80, 176);
    peppermint(-65, 193);
    merryChristmas();
    if (noOlaf !== true) {
        Olaf();
    }
};

drawEverything();
