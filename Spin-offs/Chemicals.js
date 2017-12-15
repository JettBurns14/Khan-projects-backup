// Link:  https://www.khanacademy.org/cs/chemicals/6670042465959936
// Created:  08/21/2015 18:52




noStroke();

var W = random(8, 12);
var H = random(8, 12);

draw = function() {
    
var xPositions = [170, 200];
var yPositions = [100, 100];
var timeToLive = 255;

for(var i = 0; i < 50; ++i){
    xPositions.push(random(170, 230));
    yPositions.push(random(-1000, 0));
}
    draw = function() {
    timeToLive -=2;
    background(199, 194, 37);
    
    fill(236, 242, 234, 127);
    quad(300, 400, 100, 400, 164, 263, 235, 263);
    rect(164, 184, 71, 79, 2);
    fill(191, 0, 255, 127);
    quad(300, 400, 101, 400, 146, 300, 253, 300);
    
    fill(191, 0, 255);

        var i = xPositions.length;
        while(i--) {        
            
            ellipse(xPositions[i], yPositions[i], W, H);
            yPositions[i] -= 4;
            
            if (yPositions[i] < 0){ // Top of canvas
                yPositions[i] = random(127, 400)| 400;
            }
        }

    };
};

