// Link:  https://www.khanacademy.org/computer-programming/spin-off-of-tree-help/6376006934462464
// Created:  11/06/2015 13:24




var angle1 = -19;
var angle2 = 44;
var factor1 = 0.8;
var factor2 = 0.7;

var drawTree = function(depth, len) {
    strokeWeight(depth/4);
    
    if (depth < 3) {
        stroke(0, 255, 0);
    } else {
        stroke(0);
    }
    
    line(0,0,len, 0);
    depth--;

    if (depth > 0) {
        translate(len,0);

        rotate(angle1);

        drawTree(depth, len*factor1);

        rotate(-angle1+angle2);

        drawTree(depth, len*factor2);

        rotate(-angle2);

        translate(-len,0);

    }

};

translate(200, 400);

rotate(-90);

drawTree(15, 65);



