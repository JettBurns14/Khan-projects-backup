// Link:  https://www.khanacademy.org/cs/spin-off-of-project-make-it-rain/4520778260414464
// Created:  08/03/2015 15:54




var xPositions = [200, 201];
var yPositions = [0, 0];

//There is rain on the first page, and snow when you left-click the screen.

//filling the array with drop positions
for(var i = 0; i < 150; ++i){
    xPositions.push(random(1, 400));
    yPositions.push(random(-1000, 0));
}

draw = function() {
    background(104, 147, 155);

    if(!mouseIsPressed) {
        

        noStroke(); 
        fill(0, 200, 255);

        var i = xPositions.length;
        while(i--) {        
            
            ellipse(xPositions[i], yPositions[i], 7, 11);
            yPositions[i] += 15;
            
            if (yPositions[i] > 405){
                yPositions[i] = random(-1001,0)|0;
            }
        }

        
    // Clouds
        
        fill(82, 82, 102);
        ellipse(-33, 0, 300, 200);
        ellipse(152, 0, 300, 200);
        ellipse(285, 0, 300, 200);
        ellipse(429, 3, 300, 200);
    }

    else {
        background(104, 147, 155);
        fill(255, 255, 255);
        var i = xPositions.length;
        while(i--) {
            ellipse(xPositions[i], yPositions[i], 7, 11);
            yPositions[i] += 6;
            
            if (yPositions[i] > 405){
                yPositions[i] = random(-1001, 0)|0;
            }
        }

        // Clouds
        fill(82, 82, 102);
        noStroke();
        ellipse(0, 0, 300, 200);
        ellipse(200, 0, 300, 200);
        ellipse(300, 0, 300, 200);
        ellipse(400, 0, 300, 200);
       
    }
};
