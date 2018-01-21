// Link:  https://www.khanacademy.org/computer-programming/not-a-official-entry/4594153073278976
// Created:  01/08/2016 09:27





/** THIS WAS A HUGE WIP, NOW I'M 99% DONE.
 * 
 * Check my other entry, it's my official one.
 * https://www.khanacademy.org/computer-programming/pacman/3144843154
 * 
 * @Jett_2016
 * 
 * I've changed how Pacman moves, you need to be much more precise moving him.
 * The ghosts move on a set path for the most part, not exactly a random 
 * algorithm, so it balances out the movement difficulty. I'm working on longer
 * paths and a future algorithm.
 * 
 * @CONTROLS
 * Use the arrow keys to move Pacman. The ghosts move by themselves.
 * 
 * @GAME_NOTES
 * Power pellets are worth 50 points, and normal pellets are 10.
 * After 70 dots, first fruit shows up.
 * 
 * 
 * @Will_be_dded_in_Future_updates.
 * {
 * After 170 dots, second fruit shows up.
 * If first ghost is eaten, award 200 points. Then points are doubled. 400, 800, 1600.
 * cherries: The bonus for the first round of play. Worth 100 points.
 * strawberry: The bonus for level two. Worth 300 points.
 * peach: The bonus for levels three-four. Also known as an orange. Worth 500 points.
 * apple: The bonus for levels five-six. Worth 700 points.
 * grapes: The bonus for levels seven-eight. Known as a grenade. Worth 1,000 points.
 * galaxian: The bonus for levels nine-ten. Known as tulip, thunderbird. 2000 points.
 * bell: The bonus for levels eleven-twelve. Worth 3,000 points.
 * key: The bonus for levels 13 and above. Worth 5,000 points.
 * }
**/

// Variables, all commented.
{
var Background = color(0); // This is the background color.
var wallColor = color(20, 55, 255); // This is the wall's stroke color.
var state = "start"; // If state is start, ghost's aren't moving. This changes to "play" when you start, then to "over" when dead.
var fruitScore = [100, 300, 500, 700, 1000, 2000, 3000, 5000]; // This array stores the scores for eating the fruit.
var Score = 0; // This is the score you begin with.
var highScore = Score; // Highscore is chnaged just like your score.
var dotsEaten = 0; // How many pellet's you've eaten so far.
var ghostScared = false; // The ghost's are not scared. If you eat a power pellet, they turn blue and are scared.
var scaredTimer = 0; // When the ghosts are scared, this starts counting up. When it passes "scaredLimit", or 1500, they aren't scared anymore.
var scaredLimit = 2500; // When the ghosts are scared for 1500 milliseconds, they aren't scared anymore.
var fruitTimer = 0; // When your score is < 700, a fruit appears and this timer starts counting up. When it passes 800 milliseconds, the fruit disappears.
var level = "one"; // If you are in level one, the fruit is a cherry. There are different fruit for each level.
var moveTimer = 0; // This changes every 1000 milliseconds to move the ghosts different ways.

var pacStill = true; // This keeps Pcman still until you move him.
var pacX = width/2; // This is where Pacman starts out in the x direction.
var pacY = height-129; // This is where Pacman starts out in the y direction.
var pacSpeed = 1.5; // This controls Pacman's speed, feel free to change.
var pacColor = color(255, 255, 0);
var pacW = 26; // This is Pacman's width and height in one variable.
var pacW2 = pacW/2; // This is Pacman's width / by two; this is used in the collision functions.
var pacLife = 3; // Pacman starts with three lives.
var ghostX = [270, 300, 330];
}

// This draws Pacman and is his "life" function.
var Pacman = function(r) {
    noStroke();
    fill(pacColor);
    pushMatrix();
    translate(pacX, pacY);
    rotate(r);
    if (pacStill === true) {
        arc(0, 0, pacW, pacW, 30, 330);
    } else {
        arc(0, 0, pacW, pacW, 20+sin(millis()*2)*25, 340+-sin(millis()*2)*25);
    }
    popMatrix();
    if (pacX > 550) {
        pacX = 50; 
    }
    if (pacX < 50) {
        pacX = 550;
    }
    if (pacLife === 3) {
        arc(40, 390, 25, 25, 30, 330); 
        arc(40, 422, 25, 25, 30, 330); 
        arc(40, 454, 25, 25, 30, 330);
    } else if (pacLife === 2) {
        arc(40, 422, 25, 25, 30, 330); 
        arc(40, 454, 25, 25, 30, 330);
    } else if (pacLife === 1) {
        arc(40, 454, 25, 25, 30, 330);
    } else if (pacLife === 0) {
        state = "over";
    }
};


// This is the Ghost constructor.
var Ghost = function(x, y, w, color, dir) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.w = w;
    this.dir = dir;
};
// This draws the ghosts, including when they're scared.
Ghost.prototype.draw = function() {
    if (ghostScared === true && scaredTimer < scaredLimit) {
        fill(0, 91, 227);
        scaredTimer++;
    } else {
        fill(this.color);
        ghostScared = false;
    }
    // Legs? :P
    noStroke();
    ellipse(this.x, this.y, this.w+8, this.w+11);
    ellipse(this.x-7, this.y+4, 8, 25);
    ellipse(this.x, this.y+4, 8, 25);
    ellipse(this.x+7, this.y+4, 8, 25);
    
    // Eyes
    fill(255);
    ellipse(this.x-5, this.y, 6, 8);
    ellipse(this.x+5, this.y, 6, 8);
    
    // Eye pupils
    fill(0, 0, 255);
    if (this.dir === "left") {
        ellipse(this.x-7, this.y, 3, 3);
        ellipse(this.x+3, this.y, 3, 3);
    } else if (this.dir === "right") {
        ellipse(this.x-3, this.y, 3, 3);
        ellipse(this.x+7, this.y, 3, 3);
    } else if (this.dir === "down") {
        ellipse(this.x-5, this.y+2, 3, 3);
        ellipse(this.x+5, this.y+2, 3, 3);
    } else if (this.dir === "up") {
        ellipse(this.x-5, this.y-2, 3, 3);
        ellipse(this.x+5, this.y-2, 3, 3);   
    }
    
    // Makes a scared/nervous mouth when scared.
    if (ghostScared === true) {
        stroke(255);
        strokeWeight(1);
        beginShape();
        vertex(this.x-7, this.y+8.5);
        vertex(this.x-5, this.y+6.5);
        vertex(this.x-2, this.y+8.5);
        vertex(this.x+0, this.y+6.5);
        vertex(this.x+3, this.y+8.5);
        vertex(this.x+5, this.y+6.5);
        vertex(this.x+8, this.y+8.5);
        endShape();
    }
    noStroke();
};
// This is the movement algorithm.
Ghost.prototype.move = function() {
    if (this.dir === "right") {
        this.x += 1;
    } else if (this.dir === "left") {
        this.x -= 1;   
    } else if (this.dir === "up") {
        this.y -= 1;   
    } else if (this.dir === "down") {
        this.y += 1;   
    }
    
    if (this.x > width-75) {
        this.x = 75;   
    } else if (this.x < 75) {
        this.x = width-75;   
    }
};
// This function makes you lose a life if you hit a ghost.
Ghost.prototype.collide = function() {
    // Distance between Pacman and ghost.
    var d = dist(this.x, this.y, pacX, pacY);
    // Makes pacman lose a life.
    if (d <= 20 && ghostScared === false && pacStill === false) {
        pacLife -= 1;
        if (pacLife !== 0) {
            pacX = width/2;
            pacY = height-129;
            pacStill = true;
            state = "start";
        }
        if (pacLife < 0) {
            state = "over";
        }
    }
    // If the ghost is eaten while it's scared, he is teleported back home.
    if (d <= 20 && ghostScared === true) {
        this.x = width/2;
        this.y = 242;
        //ghostScared = false;
        Score += 200;
        highScore += 200;
    }
};
// Ghost moving algorithm.
Ghost.prototype.algorithm = function(x, y, d) {
    // If the ghost is inside box and dir = something, go where I want.
    if (this.x-(this.w/2) > x && this.x+(this.w/2) < x+26 && 
        this.y-(this.w/2) > y && this.y+(this.w/2) < y+26) {
        
        if (this.dir === "down") {
            this.dir = d;   
        } else if (this.dir === "right") {
            this.dir = d;   
        } else if (this.dir === "left") {
            this.dir = d;   
        } else if (this.dir === "up") {
            this.dir = d;   
        }
    }
    // Behind the scenes...
    //stroke(255, 0, 0);
    //noFill();
    //rect(x, y, 26, 26);
};


// This is the wall constructor
var Wall = function(x, y, w, h, r) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
};
// This draws the walls.
Wall.prototype.draw = function() {
    stroke(255, 189, 255);
    rect(286, 211, 28, 1);
    noFill();
    strokeWeight(2);
    stroke(wallColor);
    rect(this.x, this.y, this.w, this.h, this.r);
};
// This is the ALL-IMPORTANT wall collision function for Pacman and ghosts.
Wall.prototype.collisions = function(g) {
    // This code took a while to figure out, so don't touch it.
    /********** For Pacman's collisions **********/
{
    // Left side of wall
    if (pacX+pacW2 > this.x-1 && pacY+pacW2 > this.y && pacY < this.y+this.h+pacW2 && pacX < this.x+5) {
        pacX = this.x-pacW2-1;
    }
    
    // Right side of wall
    if (pacX-pacW2 <= this.x+this.w && pacX+pacW2 > this.x && pacY < this.y+this.h+pacW2 && pacY > this.y-pacW2) {
        pacX = this.x+this.w+pacW2+1;
    }
    
    // Top of wall
    if (pacY <= this.y+this.h-1 && pacY+pacW2 >= this.y-2 && pacX-pacW2 < this.x+this.w && pacX+pacW2 > this.x) {
        pacY = this.y-pacW2-2;
    }
    
    // Bottom of wall
    if (pacY <= this.y+this.h+14 && pacY > this.y+3 && pacX >= this.x && pacX-pacW2 <= this.x+this.w) {
        pacY = this.y+this.h+pacW2+2;
    }
    
    // Ghost area constraint
    if (pacX < 320 && pacX > 250 && pacY > 198 && pacY < 213) {
        pacY = 210-pacW2;
    }
    }
    
    /********** For the ghost's collisions **********/
{
    
    // Left side of wall
    if (g.x <= this.x+this.w && g.x+g.w >= this.x && g.y+g.w-1 > this.y && g.y-g.w < this.y+this.h) {
        g.x = this.x-g.w-1;
        g.dir = "down";
    }
    // Right side of wall
    if (g.x-g.w <= this.x+this.w && g.x+g.w > this.x && g.y < this.y+this.h+g.w && g.y > this.y-g.w) {
        g.x = this.x+this.w+g.w;
        //g.y += 1;
        g.dir = "down";
    }
    // Top of wall 
    if (g.y <= this.y+this.h && g.y+g.w+4 >= this.y && g.x-g.w < this.x+this.w && g.x+g.w > this.x) {
        g.y = this.y-g.w-4;
        g.dir = "right";
    }
    // Bottom of wall
    if (g.y-g.w <= this.y+this.h && g.y+g.w >= this.y && g.x+g.w >= this.x && g.x-g.w <= this.x+this.w-1) {
        g.y = this.y+this.h+g.w;
        g.dir = "left";
    }
}
};


// This is the fruit constructor, with all the fruit drawn below it.
var Fruit = function(x, y, s) {
    this.x = x;
    this.y = y;
    this.d = dist(this.x, this.y, pacX, pacY);
    this.see = s;
};
Fruit.prototype.Cherry = function() {
    //if (Score >= 700 && fruitTimer < 800 && level==="one") {
        //fruitTimer++;
        fill(255, 0, 0);
        stroke(0);
        strokeWeight(1);
        ellipse(this.x, this.y, 10, 10);
        ellipse(this.x+6, this.y+4, 10, 10);
        stroke(240, 168, 60);
        noFill();
        strokeWeight(1.5);
        arc(this.x+9.2, this.y+5, 20, 22.2, 220, 275);
        arc(this.x+12, this.y+4, 14, 20, 196, 260);
        stroke(219);
        arc(this.x-0, this.y+0, 5, 5, 112, 159);
        arc(this.x+6, this.y+4, 5, 5, 112, 159);
    //}
};
Fruit.prototype.Strawberry = function() {
    //if (Score >= 700 && fruitTimer < 800 && level==="two") {
        //fruitTimer++;
        beginShape();
        stroke(0);
        fill(255, 0, 0);
        bezier(this.x+6, this.y+10, this.x-22, this.y-10, this.x+32, this.y-10, this.x+6, this.y+10);
        endShape();
        fill(9, 255, 0);
        quad(this.x, this.y+-4, this.x+5, this.y+-7, this.x+10, this.y+-4, this.x+5, this.y+-1);
        stroke(219);
        point(this.x+2, this.y+3);
        point(this.x+7, this.y+2);
        point(this.x+11, this.y);
        point(this.x+1, this.y);
        point(this.x+4, this.y+6);
        point(this.x+8, this.y+5);
    //}
};
Fruit.prototype.Peach = function() {
    //if (Score >= 700 && fruitTimer < 800 && level==="three") {
        //fruitTimer++;
        fill(255, 200, 0);
        ellipse(this.x+3, this.y+1, 18, 16);
        fill(186, 146, 85);
        quad(this.x-2, this.y-7, this.x+3, this.y-4, this.x+8, this.y-7, this.x+3, this.y-8);
        rect(this.x+1, this.y-10, 3, 4);
        fill(26, 255, 0);
        ellipse(this.x+7, this.y-9, 7, 4);
    //}
};
Fruit.prototype.Apple = function() {
    //if (Score >= 700 && fruitTimer < 800 && level==="four") {
        //fruitTimer++;
        fill(255, 0, 0);
        ellipse(this.x+-1, this.y-1, 8, 12);
        ellipse(this.x+9, this.y-1, 8, 12);
        ellipse(this.x+1, this.y, 10, 15);
        ellipse(this.x+8, this.y, 10, 15);
        stroke(186, 146, 85);
        strokeWeight(2);
        noFill();
        arc(this.x+7, this.y-4, 8, 13, 197, 264);
    //}
};
Fruit.prototype.Grapes = function() {
    //if (Score >= 700 && fruitTimer < 800 && level==="five") {
    //    fruitTimer++;
        fill(0, 51, 255);
        ellipse(this.x+3, this.y+3, 6, 6);
        ellipse(this.x+5, this.y-5, 6, 6);
        ellipse(this.x+2, this.y+-1, 6, 6);
        ellipse(this.x+5, this.y+1, 6, 6);
        ellipse(this.x+9, this.y+-2, 6, 6);
        ellipse(this.x+8, this.y+1, 6, 6);
        ellipse(this.x+5, this.y+6, 6, 6);
        stroke(0, 198, 224);
        noFill();
        arc(this.x+5, this.y-11, 7, 6, 74, 166);
    //}
};
Fruit.prototype.Tulip = function() {
    // Galaxian, Tulip, Thunderbird
    if (Score >= 700 && fruitTimer < 800 && level==="six") {
           
    }
};
// This adds to your score when a fruit is eaten.
Fruit.prototype.Scoring = function() {
    if (dist(this.x, this.y, pacX, pacY) < 5 && fruitTimer < 800) {
        fruitTimer = 800;
        
        if (level==="one") { 
            Score += fruitScore[0];
            highScore += fruitScore[0];
        } else if (level==="two") {
            Score += fruitScore[1];
            highScore += fruitScore[1];
        } else if (level==="three") {
            Score += fruitScore[2];  
            highScore += fruitScore[2];
        } else if (level==="four") {
            Score += fruitScore[3];
            highScore += fruitScore[3];
        } else if (level==="five") {
            Score += fruitScore[4];
            highScore += fruitScore[4];
        } else if (level==="six") {
            Score += fruitScore[5];  
            highScore += fruitScore[5];
        }
    }
    noStroke();
};
// Draws all the fruit.
Fruit.prototype.draw = function(f) {
    if (Score >= 700 && fruitTimer < 800) {
        if (level==="one") {
            f.Cherry();
        } else if (level==="two") {
            f.Strawberry();
        } else if (level==="three") {
            f.Peach();
        } else if (level==="four") {
            f.Apple();
        } else if (level==="five") {
            f.Grapes();
        } else if (level==="six") {
            f.Tulip();
        }
    }
};


// This is the Power Pellet constructor.
var PowerPellet = function(x, y) {
    this.x = x;
    this.y = y;
};
// This draws the Power Pellet.
PowerPellet.prototype.draw = function() {
    noStroke();
    fill(255, 255, 209, sin(millis()*1.4)*400);
    ellipse(this.x, this.y, 10, 10);
    var d = dist(this.x, this.y, pacX, pacY);
    if (d < 5) {
        ghostScared = true;
        Score += 50;
        highScore += 50;
        scaredTimer = 0;
        dotsEaten++;
    }
    if (ghostScared === true) {
        scaredTimer ++;   
    }
    if (scaredTimer > scaredLimit) {
        scaredTimer = 0;
        ghostScared = false;
    }
};


// This is the Pellet constructor.
var Pellet = function(x, y) {
    this.x = x;
    this.y = y;
};
// This draws the pellet.
Pellet.prototype.draw = function() {
    noStroke();
    fill(253, 255, 209);
    ellipse(this.x, this.y, 4, 4);
};
// This adds to your score when a pellet is eaten
Pellet.prototype.Scoring = function() {
    var d = dist(this.x, this.y, pacX, pacY);
    if (d < 5) {
        Score += 10;
        highScore += 10;
        dotsEaten++;
    }
    if (dotsEaten >= 245) {
        level = "two";
        state = "won";
    }
};


// Makes Pacman move in key direction when key is pressed.
keyPressed = function() {
    if (pacLife !== -1 && state !=="won" && state !=="over") {
        state = "play";
        pacStill = false;
    }
};

// Declare the functions.
var pellets = [
    new Pellet(100, 93),
    new Pellet(500, 93),
    new Pellet(100, 370),
    new Pellet(500, 370),
    new Pellet(100, 64),
    new Pellet(500, 64),
    new Pellet(100, 340),
    new Pellet(500, 340),
    new Pellet(115, 372),
    new Pellet(500, 64),
    new Pellet(486, 372),
    new Pellet(323, 448),
    new Pellet(323, 434),
    new Pellet(277, 448),
    new Pellet(277, 434),
    new Pellet(500, 120),
    new Pellet(500, 134),
    new Pellet(100, 134),
    new Pellet(100, 120),
    ];
var powerpellet = [];
var ghosts = [
    new Ghost(ghostX[1], 192, 14, color(255, 0, 0), "left"),
    new Ghost(ghostX[1], 240, 14, color(255, 156, 255), "up"),
    new Ghost(ghostX[2], 240, 14, color(0, 217, 255), "left"),
    new Ghost(ghostX[0], 240, 14, color(255, 170, 0), "right"),
];
var wall = [
    new Wall(242, 298, 116, 12, 4), // bottom center horizontal wall
    new Wall(242, 388, 116, 12, 4), // bottom center horizontal wall
    new Wall(292, 400, 15, 46, 4), // bottom center vertical wall
    new Wall(292, 310, 15, 45, 4), // bottom center vertical wall
    new Wall(193, 253, 16, 57, 4), // bottom left vertical wall
    new Wall(391, 253, 16, 57, 4), // bottom right vertical wall
    new Wall(80, 480, 440, 5), // bottom barrier
    new Wall(80, 310, 5, 170), // bottom left barrier
    new Wall(515, 310, 5, 170), // bottom right barrier
    new Wall(80, 305, 80, 5), // bottom left horizontal barrier wall
    new Wall(440, 305, 80, 5), // bottom right horizontal barrier wall
    new Wall(155, 259, 5, 46), // bottom left vertical barrier wall
    new Wall(440, 259, 5, 46), // bottom right vertical barrier wall
    new Wall(80, 254, 80, 5), // bottom left vertical tunnel wall
    new Wall(440, 254, 80, 5), // bottom right vertical tunnel wall
    
    new Wall(80, 30, 440, 5), // top barrier
    new Wall(80, 35, 5, 130), // top left barrier
    new Wall(515, 35, 5, 130), // top right barrier
    new Wall(292, 135, 16, 42, 4), // top center vertical wall
    new Wall(241, 123, 116, 12, 4), // top center horizontal wall
    new Wall(80, 165, 80, 5), // top left horizontal wall
    new Wall(440, 165, 80, 5), // top right horizontal wall
    new Wall(155, 170, 5, 45), // top left vertical barrier wall
    new Wall(440, 170, 5, 45), // top right vertical barrier wall
    new Wall(80, 215, 80, 5), // top left vertical tunnel wall
    new Wall(440, 215, 80, 5), // top right vertical tunnel wall
    new Wall(193, 343, 68, 12, 4), // Bottom left horizontal wall
    new Wall(337, 343, 70, 12, 4), // Bottom right horizontal wall
    new Wall(115, 434, 146, 12, 4), // Bottom-most left horizontal long wall
    new Wall(337, 434, 146, 12, 4), // Bottom-most right horizontal long wall
    new Wall(193, 387, 16, 46, 4),
    new Wall(391, 387, 16, 46, 4),
    new Wall(440, 343, 16, 57, 4), // Bottom right vertical "L" wall
    new Wall(144, 343, 16, 57, 4), // Bottom left vertical "L" wall
    new Wall(456, 343, 28, 12, 4), // Bottom right horizontal small "L" wall
    new Wall(115, 343, 28, 12, 4), // Bottom left horizontal small "L" wall
    new Wall(85, 389, 28, 12, 4), // Bottom left stick-out wall
    new Wall(486, 389, 28, 12, 4), // Bottom right stick-out wall
    new Wall(391, 123, 16, 98, 4), // Top right vertical long wall
    new Wall(193, 123, 16, 98, 4), // Top left vertical long wall
    new Wall(340, 165, 51, 12, 4),
    new Wall(209, 165, 51, 12, 4),
    new Wall(116, 121, 43, 12, 4),
    new Wall(439, 121, 43, 12, 4),
    new Wall(439, 67, 43, 22, 4),
    new Wall(116, 67, 43, 22, 4),
    new Wall(193, 67, 66, 22, 4),
    new Wall(340, 67, 66, 22, 4),
    new Wall(292, 35, 16, 55, 4), // Upper-most vertical wall
    
    // Ghost area
    new Wall(242, 262, 116, 4), // bottom barrier
    new Wall(242, 210, 41, 4), // top left barrier
    new Wall(317, 210, 41, 4), // top right barrier
    new Wall(242, 210, 4, 56), // left barrier
    new Wall(354, 210, 4, 56), // right barrier
    ];
var fruits = [
    new Fruit(295, 283, true),
    new Fruit(550, 450, false),
];

// Pushes on new objects below.
// Normal pellets
for (var i = 0; i < 12; i++) {
    pellets.push(new Pellet(100+i*16.1, 326));
    pellets.push(new Pellet(325+i*15.9, 326));
    pellets.push(new Pellet(100+i*16.1, 50));
    pellets.push(new Pellet(325+i*16.0, 50));
}
for (var i = 0; i < 26; i++) {
    pellets.push(new Pellet(i*16+100, 106));
    pellets.push(new Pellet(i*16+100, 464));
}
for (var i = 0; i < 14; i++) {
    pellets.push(new Pellet(178, i*15+117));
    pellets.push(new Pellet(422, i*15+117));   
}
for (var i = 0; i < 5; i++) {
    pellets.push(new Pellet(177, i*15+344));
    pellets.push(new Pellet(422, i*15+344));
    pellets.push(new Pellet(i*16+113, 419));
    pellets.push(new Pellet(i*16+423, 419));
    pellets.push(new Pellet(i*16+196, 373));
    pellets.push(new Pellet(i*16+342, 373));
    pellets.push(new Pellet(i*16+100, 148));
    pellets.push(new Pellet(i*16+436, 148));
}
for (var i = 0; i < 3; i++) {
    pellets.push(new Pellet(129, i*15+372));
    pellets.push(new Pellet(470, i*15+372));
    pellets.push(new Pellet(100, i*15+419));
    pellets.push(new Pellet(501, i*15+419));
    pellets.push(new Pellet(277, i*15+343));
    pellets.push(new Pellet(325, i*15+342));
    pellets.push(new Pellet(228, i*15+388));
    pellets.push(new Pellet(375, i*15+388));
    pellets.push(new Pellet(i*16+245, 419));
    pellets.push(new Pellet(i*16+324, 419));
    pellets.push(new Pellet(421, i*15+63));
    pellets.push(new Pellet(324, i*15+63));
    pellets.push(new Pellet(178, i*15+63));
    pellets.push(new Pellet(276, i*15+63));
    pellets.push(new Pellet(226, i*15.5+120));
    pellets.push(new Pellet(373, i*15.5+120));
    pellets.push(new Pellet(i*16+325, 151));
    pellets.push(new Pellet(i*16+240, 151));
}
// Power pellets
for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
        powerpellet.push(new PowerPellet(i*400+100, j*277+78));
    }
}

draw = function() {
    // Draws the black background
    background(Background);
    
    // Draws the normal pellets, and removes them when eaten.
    for (var i = pellets.length-1; i >= 0; i--) {
        var p = pellets[i];
        p.draw();
        p.Scoring();
        var d = dist(p.x, p.y, pacX, pacY);
        if (d < 5) {
            pellets.splice(i, 1);
        }
    }
    
    // Draws the power pellets, makes ghosts scared, and removes them when eaten.
    for (var i = powerpellet.length-1; i >= 0; i--) {
        var P = powerpellet[i];
        P.draw();
        var d = dist(P.x, P.y, pacX, pacY);
        if (d < 5) {
            powerpellet.splice(i, 1);
        }
    }
    
    // Draws the fruit and calls the scoring function.
    for (var i = fruits.length-1; i >= 0; i--) {
        fruits[i].draw(fruits[i]);
        fruits[i].Scoring();
    }
    
    // Draws the ghosts, and calls the other ghost functions.
    for (var i = ghosts.length-1; i >= 0; i--) {
        var g = ghosts[i];
        g.draw();
        g.collide();
        
        g.algorithm(331, 233, "up");
        g.algorithm(314, 450, "up");
        g.algorithm(365, 402, "up");
        g.algorithm(242, 215, "down");
        g.algorithm(306, 38, "down");
        g.algorithm(366, 270, "down");
        g.algorithm(159, 94, "down");
        g.algorithm(83, 40, "down");
        g.algorithm(366, 229, "right");
        g.algorithm(88, 454, "right");
        g.algorithm(311, 401, "right");
        g.algorithm(87, 140, "right");
        g.algorithm(87, 362, "right");
        g.algorithm(165, 407, "left");
        g.algorithm(117, 407, "left");
        g.algorithm(488, 361, "left");
        g.algorithm(486, 453, "left");
        g.algorithm(311, 96, "left");
        if (moveTimer > 600 && moveTimer < 2200) {
            g.algorithm(212, 273, "right");
        }
        if (moveTimer > 1000) {
            g.algorithm(291, 230, "up");
            g.algorithm(415, 226, "up");
            g.algorithm(366, 320, "left");
            
        }
        if (moveTimer > 1400 && moveTimer < 1700) {
            g.algorithm(167, 222, "down");
        }
        if (moveTimer > 1500) {
            g.algorithm(287, 175, "right");
        }
        if (moveTimer > 2700) {
            g.algorithm(414, 314, "down");   
        }
        if (moveTimer > 3000 && moveTimer < 4500 || 
        moveTimer > 19000 && moveTimer < 19500) {
            g.algorithm(269, 450, "up");
            g.algorithm(212, 404, "up");
            g.algorithm(164, 358, "up"); 
        }
        if (moveTimer > 4300 && moveTimer < 5300) {
            g.algorithm(163, 314, "up");
        }
        if (moveTimer > 6500 && moveTimer < 17800) {
            g.algorithm(165, 229, "right");
            g.algorithm(216, 229, "up");
            g.algorithm(212, 175, "right");
        }
        if (moveTimer > 8500 && moveTimer < 11000) {
            g.algorithm(214, 314, "up");
            g.algorithm(266, 360, "up");
            g.algorithm(212, 262, "right");
        }
        if (moveTimer > 13000) {
            g.algorithm(411, 130, "right");
            g.algorithm(489, 130, "up");
        }
        if (moveTimer > 4000 && moveTimer < 6000) {
            g.algorithm(214, 314, "up");
            g.algorithm(266, 360, "up");
            g.algorithm(212, 262, "right");
        } if (moveTimer > 1300) {
            g.algorithm(268, 361, "up");
        }
        
        // This makes the ghosts move when Pacman moves.
        if (state === "play") {
            g.move();
            moveTimer++;
        }
        
        // This draws the walls, and makes the ghosts collide with them.
        for (var j = wall.length-1; j >= 0; j--) {
            wall[j].draw(); 
            wall[j].collisions(g);
        }
        // Left tunnel function for ghosts
        if (g.x < 60) {
            g.x = width-60;
        }
        
        // Right tunnel function for ghosts
        if (g.x > width-60) {
            g.x = 60;
        }
    }
    
    // Draws pacman normally before he's moved.
    if (pacStill !== false) {
        Pacman();
    }
    
    // The score keeper.
    fill(247, 171, 255);
    text("GAME\nSCORE", 40, 50);
    text("HIGH\nSCORE", 560, 50);
    text(Score, 40, 85);
    text(highScore, 560, 85);
    //text(dotsEaten, 50, 130);
    //text(scaredLimit, 50, 105);
    //text(scaredTimer, 40, 130);
    //text(moveTimer, 40, 150);
    
    // This moves pacman when certain keys are pressed.
    if (state === "play") {
        if (pacStill === false && pacLife !== 0) {
            if (keyCode === LEFT) {
                Pacman(180);
                pacX -=pacSpeed;
            }
            if (keyCode === RIGHT) {
                Pacman(0);
                pacX +=pacSpeed;
            }
            if (keyCode === UP) {
                Pacman(-90);
                pacY -=pacSpeed;
            }
            if (keyCode === DOWN) {
                Pacman(90);
                pacY +=pacSpeed;
            }
        }
    }
    // If program isn't running, draw "Ready!".
    else if (state === "start" ) {
        //fill(255, 255, 0, sin(millis()*1.4)*400);
        fill(255, 255, 0);
        textSize(18);
        textFont(createFont("monospace"));
        textAlign(CENTER, CENTER);
        text("READY!", width/2,  height/2+30);
    } 
    // If you lose all lives, draw game over screen.
    else if (state === "over") {
        fill(0, 0, 0, 200);
        rect(0, 0, width, height);
        fill(255);
        text("GAME OVER", width/2, height/2);
    }
    // If you eat all the pellets, you win.
    else if (state === "won") {
        Pacman();
        fill(255);
        text("YOU WIN!", width/2, height/2);
        pacStill = true;
        wallColor = color(0, 0, sin(millis())*800);
        moveTimer = 0;
    }
};

/* @Jett_2016 */
// 800+ lines, my "biggest" and best so far.
