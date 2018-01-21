// Link:  https://www.khanacademy.org/computer-programming/crazy-spiral/5112539126300672
// Created:  01/20/2016 10:54





// I was just messing around and this happened on 9/22/15, 
// it was totally accidental.
// The popMatrix() causes this weird behavior.

var y = 190;
//colorMode(HSB);
draw = function() {
    fill(y*1.5, 140, 120);
    rectMode(CENTER);
    popMatrix(); // This should be pushMatrix();
    translate(230, 485);
    rotate(222);
    //rect(200, y, 25, 25);
    ellipse(200, y, 45, 25);
    popMatrix();
    y-=0.25;
};
