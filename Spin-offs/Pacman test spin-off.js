// Link:  https://www.khanacademy.org/computer-programming/pacman-test-spin-off/5308043445534720
// Created:  01/11/2016 17:14





/**  THIS IS A HUGE WIP, BUT I"M NEARING COMPLETION!
 * 
 *  I've been programming 9 months, and I have learned 100% of Intro to JS.
 *  I made a program that re-creates the classic game called Pacman!
 *  You can read more about it here: https://en.wikipedia.org/wiki/Pac-Man
 * 
 * @CONTROLS
 * Click to start the game
 * Use the arrow keys to move Pacman. The ghosts move by themselves.
 * 
 * 
 * Power pellets are worth 50 points, and normal pellets are 10.
 * If fisrt ghost is eaten, 200 points. Then points are doubled. 400, 800, 1600.
 * After 70 dots, first fruit shows up. After 170 dots, second fruit shows up.
 * cherries: The bonus for the first round of play. Worth 100 points.
 * strawberry: The bonus for level two. Worth 300 points.
 * peach: The bonus for levels three-four. Also known as an orange. Worth 500 points.
 * apple: The bonus for levels five and six. Worth 700 points.
 * grapes: The bonus for levels seven-eight. Known as a grenade. Worth 1,000 points.
 * galaxian: The bonus for levels nine-ten. Known as tulip, thunderbird. 2000 points.
 * bell: The bonus for levels eleven and twelve. Worth 3,000 points.
 * key: The bonus for levels 13 and above. Worth 5,000 points.
 * 
 * @TODO
 * Make four ghosts
 * Fix ghost/wall collisions (Close)
 * Add dots (WIP)
 * Add fruit (WIP)
 * Make scoring system (Close)
 * Save high score?
 * Use arrays for ghosts?
 * Clean up code.
**/
// 2534

var Background = color(0, 0, 0); // This is the background color.
var wallColor = color(20, 55, 255); // This is the wall's stroke color.
var running = false; // This starts off as false, preventing the game from starting.
var dir = random(1); // This is the random direction the ghosts move in.
var fruitScore = [100, 300, 500, 700, 1000, 2000, 3000, 5000];
var gameScore = 0;
var scaredLimit = 1500;
var pelletTimer = 0;
var fruitTimer = 0;
var level = "one";
var sw = strokeWeight;

var pacStill = true; // This keeps Pcman still until you move him.
var pacX = width/2; // This is where Pacman starts out in the x direction.
var pacY = height-129; // This is where Pacman starts out in the y direction.
var pacSpeed = 1.5; // This controls Pacman's speed, feel free to change.
var pacColor = color(255, 255, 0);
var pacW = 26; // This is Pacman's width and height in one variable.
var pacW2 = pacW/2; // This is Pacman's width / by two; this is used in the collision functions.
var pacM = 360; // This controls Pacman's bottom jaw.
var pacM2 = 329; // This controls Pacman's top jaw.
var pacLife = 3; // Pacman starts with three lives.

var ghostX = width/2; // This is where a ghost starts out in the x direction.
var ghostY = 192; // This is where a ghost starts out in the x direction.
var ghostW = 12.5; // This is the ghost's width.
var ghostColor = [
    color(69, 193, 255), 
    color(255, 136, 0), 
    color(245, 153, 255),
    color(255, 0, 0)
    ]; // This array contains the four ghost colors.
var ghostScared = false;

var Pacman = function(r) {
    noStroke();
    fill(pacColor);
    pushMatrix();
    translate(pacX, pacY);
    rotate(r);
    if (running === true && pacStill===false) {
        pacM+=3;
        pacM2-=3;
        if (pacM > 370){
            pacM = 330;
        }
        if (pacM2 < 320){
            pacM2 = 360;
        }
        
    }
    arc(0, 0, pacW, pacW, pacM+30, pacM2+360);
    popMatrix();
    
    if (pacLife === 2) {
        arc(40, 422, 25, 25, 30, 330); 
        arc(40, 454, 25, 25, 30, 330);
    } else if (pacLife === 1) {
        arc(40, 454, 25, 25, 30, 330);
    } else if (pacLife === 0) {
        // make pacman die   
    } else {
        arc(40, 390, 25, 25, 30, 330); 
        arc(40, 422, 25, 25, 30, 330); 
        arc(40, 454, 25, 25, 30, 330);
    }
};

var Ghost = function(x, y, w, color, dir) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.w = w;
    this.speed = 1;
    this.dir = dir; //random(-1, 1);
    //round(this.dir);
};
Ghost.prototype.draw = function() {
    if (ghostScared === true && pelletTimer < scaredLimit) {
        fill(0, 91, 227);
    } else {
        fill(this.color);
    }
    noStroke();
    ellipse(this.x, this.y, this.w+8, this.w+11);
    ellipse(this.x-7, this.y+4, 8, 25);
    ellipse(this.x, this.y+4, 8, 25);
    ellipse(this.x+7, this.y+4, 8, 25);
    fill(255);
    ellipse(this.x-5, this.y, 6, 8);
    ellipse(this.x+5, this.y, 6, 8);
    fill(0, 0, 255);
    ellipse(this.x-5, this.y, 2, 2);
    ellipse(this.x+5, this.y, 2, 2);
    if (ghostScared === true) {
        stroke(255);
        sw(1);
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
Ghost.prototype.move = function() {
    //println(this.dir);
    if (this.dir > -1) {
        //this.x += this.speed;
        this.dir = -1;
    } else if (this.dir === 0) {
        //this.y += this.speed;
        this.dir = -1;
    } else if (this.dir === 1) {
        //this.y -= this.speed;
        this.dir = -1;
    }
    this.x += this.dir;
    if (this.x > width) {
        this.x = 0;   
    } else if (this.x < 0) {
        this.x = width;   
    }
};
Ghost.prototype.collide = function() {
    var d = dist(this.x, this.y, pacX, pacY);
    if (d <= 20 && ghostScared === false) {
        pacLife -= 1;
        pacX = width/2;
        pacY = height-129;
        pacStill = true;
    }
    if (d <= 20 && ghostScared === true) {
        this.x = width/2;
        this.y = 192;
        ghostScared = false;
        gameScore += 200;
    }
};

var Wall = function(x, y, w, h, r) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
};
Wall.prototype.draw = function() {
    stroke(255, 189, 255);
    rect(286, 211, 28, 1);
    noFill();
    sw(2.5);
    stroke(wallColor);
    rect(this.x, this.y, this.w, this.h, this.r);
};
Wall.prototype.collisions = function(g) {
    // This code took a while to figure out, so don't touch it.
    /** For Pacman's collisions **/
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
    
    /** For the ghost's collisions **/
    {
    //var d = -1 || 1;
    
    // Left side of wall
    if (g.x+pacW2 <= this.x+this.w && g.x+pacW2 >= this.x-1 && g.y+g.w > this.y && g.y < this.y+this.h+g.w) {
        g.x = this.x-g.w-1;
        //g.y += -1;
    }
    // Right side of wall
    if (g.x-g.w <= this.x+this.w && g.x+g.w > this.x && g.y < this.y+this.h+g.w && g.y > this.y-g.w) {
        g.x = this.x+this.w+g.w;
        //g.y += 1;
    }
    //if (ghostRW === true) {
        g.y-=3;   
    //}
    /*
    if (pacX-pacW2 <= this.x+this.w && pacX+pacW2 > this.x && pacY < this.y+this.h+pacW2 && pacY > this.y-pacW2) {
        pacX = this.x+this.w+pacW2+1;
    }
    */
    // Top of wall 
    if (g.y <= this.y+this.h-1 && g.y+g.w >= this.y-5 && g.x-g.w < this.x+this.w && g.x > this.x) {
        g.y = this.y-g.w-4;
        //ghostX +=d;
    }
    
    // Bottom of wall
    if (g.y-g.w <= this.y+this.h && g.y+g.w >= this.y && g.x+g.w >= this.x && g.x-g.w <= this.x+this.w-1) {
        g.y = this.y+this.h+g.w+1;
        //g.x -= 1;
    }
}  

    /** For ghost algorithm **/
    if (g.x < 150) {
            g.y+=2;   
        }
    
};

var Fruit = function(x, y, t) {
    var d = dist(x, y, pacX, pacY);
    // Cherry
    if (gameScore >= 700 && fruitTimer < 800) {
        fruitTimer++;
        if (level==="one") {
            fill(255, 0, 0);
            stroke(0);
            sw(1);
            ellipse(x, y, 10, 10);
            ellipse(x+6, y+4, 10, 10);
            stroke(240, 168, 60);
            noFill();
            sw(1.5);
            arc(x+9.2, y+5, 20, 22.2, 220, 275);
            arc(x+12, y+4, 14, 20, 196, 260);
            stroke(219);
            arc(x-0, y+0, 5, 5, 112, 159);
            arc(x+6, y+4, 5, 5, 112, 159);
        }
        // Strawberry
        if (level==="two") {
            beginShape();
            fill(255, 0, 0);
            bezier(x+6, y+10, x-22, y-10, x+32, y-10, x+6, y+10);
            endShape();
            fill(9, 255, 0);
            quad(x, y+-4, x+5, y+-7, x+10, y+-4, x+5, y+-1);
            stroke(219);
            point(x+2, y+3);
            point(x+7, y+2);
            point(x+11, y);
            point(x+1, y);
            point(x+4, y+6);
            point(x+8, y+5);
        }
        // Peach
        if (level==="three") {
            fill(255, 200, 0);
            ellipse(x+3, y+1, 18, 16);
            fill(186, 146, 85);
            quad(x-2, y-7, x+3, y-4, x+8, y-7, x+3, y-8);
            rect(x+1, y-10, 3, 4);
            fill(26, 255, 0);
            ellipse(x+7, y-9, 7, 4);
        }
        // Apple
        if (level==="four") {
            fill(255, 0, 0);
            ellipse(x+-1, y-1, 8, 12);
            ellipse(x+9, y-1, 8, 12);
            ellipse(x+1, y, 10, 15);
            ellipse(x+8, y, 10, 15);
            stroke(186, 146, 85);
            sw(2);
            noFill();
            arc(x+7, y-4, 8, 13, 197, 264);
        }
        // Grapes
        if (level==="five") {
            fill(0, 51, 255);
            ellipse(x+3, y+3, 6, 6);
            ellipse(x+5, y-5, 6, 6);
            ellipse(x+2, y+-1, 6, 6);
            ellipse(x+5, y+1, 6, 6);
            ellipse(x+9, y+-2, 6, 6);
            ellipse(x+8, y+1, 6, 6);
            ellipse(x+5, y+6, 6, 6);
            stroke(0, 198, 224);
            noFill();
            arc(x+5, y-11, 7, 6, 74, 166);
        }
        // Galaxian, Tulip, Thunderbird
        if (level==="six") {
               
        }
        
        if (d < 5) {
            fruitTimer = 800;
            if (level==="one") { 
                gameScore+= fruitScore[0];
            } else if (level==="two") {
                gameScore+= fruitScore[1];   
            } else if (level==="three") {
                gameScore+= fruitScore[2];   
            } else if (level==="four") {
                gameScore+= fruitScore[3];
            } else if (level==="five") {
                gameScore+= fruitScore[4];
            } else if (level==="six") {
                gameScore+= fruitScore[5];   
            }
        }
    }
    noStroke();
};
/*
var Fruit = function(x, y) {
    this.x = x;
    this.y = y;
};
Fruit.prototype.cherry = function() {
    if (gameScore >= 700 && fruitTimer < 800) {
    if (level==="one") {
            fill(255, 0, 0);
            stroke(0);
            sw(1);
            ellipse(this.x, this.y, 10, 10);
            ellipse(this.x+6, this.y+4, 10, 10);
            stroke(240, 168, 60);
            noFill();
            sw(1.5);
            arc(this.x+9.2, this.y+5, 20, 22.2, 220, 275);
            arc(this.x+12, this.y+4, 14, 20, 196, 260);
            stroke(219);
            arc(this.x, this.y, 5, 5, 112, 159);
            arc(this.x+6, this.y+4, 5, 5, 112, 159);
        }
    }
};
*/
var PowerPellet = function(x, y) {
    this.x = x;
    this.y = y;
};
PowerPellet.prototype.draw = function() {
    noStroke();
    fill(255, 255, 209);
    ellipse(this.x, this.y, 10, 10);
    var d = dist(this.x, this.y, pacX, pacY);
    if (d < 5) {
        ghostScared = true;
        gameScore += 50;
        pelletTimer = 0;
    }
    if (ghostScared === true) {
        pelletTimer ++;   
    }
    if (pelletTimer > scaredLimit) {
        pelletTimer = 0;
        ghostScared = false;
    }
};

var Pellet = function(x, y) {
    this.x = x;
    this.y = y;
};
Pellet.prototype.draw = function() {
    var d = dist(this.x, this.y, pacX, pacY);
    if (d < 5) {
        gameScore += 10;   
    }
    noStroke();
    fill(253, 255, 209);
    ellipse(this.x, this.y, 4, 4);
};

mousePressed = function() {
    running = true;
};
keyPressed = function() {
    pacStill = false;
};

var pellets = [];
var powerpellet = [];
var ghosts = [
    new Ghost(300, 192, 14, color(255, 0, 0), -1.5),
    new Ghost(270, 240, 14, color(255, 196, 0), -1.5),
    new Ghost(300, 240, 14, color(255, 178, 238), -2),
    new Ghost(330, 240, 14, color(69, 224, 255), -3),
];
var wall = [
    new Wall(242, 298, 116, 12, 4), // bottom center horizontal wall
    new Wall(242, 386, 116, 12, 4), // bottom center horizontal wall
    new Wall(292, 399, 15, 44, 4), // bottom center vertical wall
    new Wall(292, 310, 15, 44, 4), // bottom center vertical wall
    new Wall(193, 252, 16, 57, 4), // bottom left vertical wall
    new Wall(391, 252, 16, 57, 4), // bottom right vertical wall
    new Wall(80, 473, 440, 5), // bottom barrier
    new Wall(80, 310, 5, 163), // bottom left barrier
    new Wall(515, 310, 5, 163), // bottom right barrier
    new Wall(80, 305, 80, 5), // bottom left horizontal wall
    new Wall(440, 305, 80, 5), // bottom right horizontal wall
    new Wall(155, 257, 5, 48), // bottom left vertical wall
    new Wall(440, 257, 5, 48), // bottom right vertical wall
    new Wall(80, 252, 80, 5), // bottom left vertical tunnel wall
    new Wall(440, 252, 80, 5), // bottom right vertical tunnel wall
    
    new Wall(80, 30, 440, 5), // top barrier
    new Wall(80, 35, 5, 130), // top left barrier
    new Wall(515, 35, 5, 130), // top right barrier
    new Wall(292, 134, 16, 43, 4), // top center vertical wall
    new Wall(241, 122, 116, 12, 4), // top center horizontal wall
    new Wall(80, 165, 80, 5), // top left horizontal wall
    new Wall(440, 165, 80, 5), // top right horizontal wall
    new Wall(155, 170, 5, 47), // top left vertical wall
    new Wall(440, 170, 5, 47), // top right vertical wall
    new Wall(80, 217, 80, 5), // top left vertical tunnel wall
    new Wall(440, 217, 80, 5), // top right vertical tunnel wall
    new Wall(193, 342, 70, 12, 4),
    new Wall(337, 342, 70, 12, 4),
    new Wall(115, 430, 144, 12, 4),
    new Wall(337, 430, 146, 12, 4),
    new Wall(193, 386, 16, 44, 4),
    new Wall(391, 386, 16, 44, 4),
    new Wall(440, 342, 16, 58, 4),
    new Wall(144, 342, 16, 58, 4),
    new Wall(456, 342, 28, 12, 4),
    new Wall(115, 342, 28, 12, 4),
    new Wall(85, 387, 28, 12, 4),
    new Wall(486, 387, 28, 12, 4),
    new Wall(391, 122, 16, 100, 4),
    new Wall(193, 122, 16, 100, 4),
    new Wall(340, 165, 51, 12, 4),
    new Wall(209, 165, 51, 12, 4),
    new Wall(116, 121, 43, 12, 4),
    new Wall(439, 121, 43, 12, 4),
    new Wall(439, 67, 43, 22, 4),
    new Wall(116, 67, 43, 22, 4),
    new Wall(193, 67, 66, 22, 4),
    new Wall(340, 67, 66, 22, 4),
    new Wall(292, 35, 16, 56, 4),
    
    // Ghost area
    new Wall(242, 262, 116, 4), // bottom barrier
    new Wall(242, 210, 41, 4), // top left barrier
    new Wall(317, 210, 41, 4), // top right barrier
    new Wall(242, 210, 4, 56), // left barrier
    new Wall(354, 210, 4, 56), // right barrier
    ];
    
for (var i = 0; i < 12; i++) {
    pellets.push(new Pellet(100+i*16.1, 326));
    pellets.push(new Pellet(325+i*15.9, 326));
    pellets.push(new Pellet(100+i*16.1, 50));
    pellets.push(new Pellet(325+i*16.0, 50));
}
for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
        powerpellet.push(new PowerPellet(i*400+100, j*270+78));
    }
}
for (var i = 0; i < 26; i++) {
    pellets.push(new Pellet(i*16+100, 106));
    pellets.push(new Pellet(i*16+100, 458));
}
for (var i = 0; i < 14; i++) {
    pellets.push(new Pellet(177, i*15+117));
    pellets.push(new Pellet(424, i*15+117));   
}

draw = function() {
    background(Background);
    
    for (var i = pellets.length-1; i >= 0; i--) {
        var p = pellets[i];
        p.draw();
        var d = dist(p.x, p.y, pacX, pacY);
        if (d < 5) {
            pellets.splice(i, 1);
        }
    }
    
    for (var i = powerpellet.length-1; i >= 0; i--) {
        var P = powerpellet[i];
        P.draw();
        var d = dist(P.x, P.y, pacX, pacY);
        if (d < 5) {
            powerpellet.splice(i, 1);
        }
    }
    
    for (var i = ghosts.length-1; i >= 0; i--) {
        var g = ghosts[i];
        g.draw();
        g.collide();
        
        if (running === true) {
            g.move();
        }
        for (var j = wall.length-1; j >= 0; j--) {
            wall[j].draw(); 
            wall[j].collisions(g.x, g.y);
        }
    }
    Fruit(295, 283, true);
    //Fruit(540, 400, true);
    
    if (running === true) {
        /*
        var g = ghosts[i];
        if (dir > 0.6) {
            this.x +=1;
        } else if (dir > 0.3 && dir < 0.6) {
            this.x -=1;
        } else if (dir > 0 && dir < 0.3) {
            this.y -=1;
        }
        */
        if (pacStill === false) {
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
    else {
        fill(pacColor);
        textSize(18);
        textFont(createFont("monospace"));
        textAlign(CENTER, CENTER);
        text("CLICK TO PLAY", width/2,  height/2+30);
        }
    if (pacStill !== false) {
        Pacman();   
    }
    /*
    Wall(242, 298, 116, 12, 4); // bottom center horizontal wall
    Wall(242, 386, 116, 12, 4); // bottom center horizontal wall
    Wall(292, 399, 15, 44, 4); // bottom center vertical wall
    Wall(292, 310, 15, 44, 4); // bottom center vertical wall
    Wall(193, 252, 16, 57, 4); // bottom left vertical wall
    Wall(391, 252, 16, 57, 4); // bottom right vertical wall
    Wall(80, 473, 440, 5); // bottom barrier
    Wall(80, 310, 5, 163); // bottom left barrier
    Wall(515, 310, 5, 163); // bottom right barrier
    Wall(80, 305, 80, 5); // bottom left horizontal wall
    Wall(440, 305, 80, 5); // bottom right horizontal wall
    Wall(155, 257, 5, 48); // bottom left vertical wall
    Wall(440, 257, 5, 48); // bottom right vertical wall
    Wall(80, 252, 80, 5); // bottom left vertical tunnel wall
    Wall(440, 252, 80, 5); // bottom right vertical tunnel wall
    
    Wall(80, 30, 440, 5); // top barrier
    Wall(80, 35, 5, 130); // top left barrier
    Wall(515, 35, 5, 130); // top right barrier
    Wall(292, 134, 16, 43, 4); // top center vertical wall
    Wall(241, 122, 116, 12, 4); // top center horizontal wall
    Wall(80, 165, 80, 5); // top left horizontal wall
    Wall(440, 165, 80, 5); // top right horizontal wall
    Wall(155, 170, 5, 47); // top left vertical wall
    Wall(440, 170, 5, 47); // top right vertical wall
    Wall(80, 217, 80, 5); // top left vertical tunnel wall
    Wall(440, 217, 80, 5); // top right vertical tunnel wall
    Wall(193, 342, 70, 12, 4);
    Wall(337, 342, 70, 12, 4);
    Wall(115, 430, 144, 12, 4);
    Wall(337, 430, 146, 12, 4);
    Wall(193, 386, 16, 44, 4);
    Wall(391, 386, 16, 44, 4);
    Wall(440, 342, 16, 58, 4);
    Wall(144, 342, 16, 58, 4);
    Wall(456, 342, 28, 12, 4);
    Wall(115, 342, 28, 12, 4);
    Wall(85, 387, 28, 12, 4);
    Wall(486, 387, 28, 12, 4);
    Wall(391, 122, 16, 100, 4);
    Wall(193, 122, 16, 100, 4);
    Wall(340, 165, 51, 12, 4);
    Wall(209, 165, 51, 12, 4);
    Wall(116, 121, 43, 12, 4);
    Wall(439, 121, 43, 12, 4);
    Wall(439, 67, 43, 22, 4);
    Wall(116, 67, 43, 22, 4);
    Wall(193, 67, 66, 22, 4);
    Wall(340, 67, 66, 22, 4);
    Wall(292, 35, 16, 56, 4);
    
    // Ghost area
    Wall(242, 262, 116, 4); // bottom barrier
    Wall(242, 210, 41, 4); // top left barrier
    Wall(317, 210, 41, 4); // top right barrier
    Wall(242, 210, 4, 56); // left barrier
    Wall(354, 210, 4, 56); // right barrier
    */
    // Left tunnel function for Pacman
    if (pacX < 80) {
        pacX = width-80;
    }
    
    // Right tunnel function for Pacman
    if (pacX > width-80) {
        pacX = 80;
    }
    
    // Left tunnel function for ghosts
    if (ghostX < 60) {
        ghostX = width-60;
    }
    
    // Right tunnel function for ghosts
    if (ghostX > width-60) {
        ghostX = 60;
    }
    
    fill(247, 171, 255);
    text("GAME\nSCORE", 40, 50);
    text(gameScore, 40, 85);
    //text("HIGH\nSCORE", 560, 50); ?
    //text(gameScore, 560, 85); ?
};

/*
var particles = [];

for (var i = 0; i < 20; i++) {
    var r = random(1);
    
    if (r < 0.85) {
        particles[i] = (new Mover(random(50, 100), random(60, 345)));
    } else {
        particles[i] = (new Mover(random(300, 350), random(60, 345)));  
    }
}

var draw = function() {
    background(0);
    
    for (var i = 0; i < particles.length; i++) {
        if (running === true && timer < time*100) {
            timer+=0.1;   
        }
        for (var j = 0; j < particles.length; j++) {
            if (i !== j) {
                if (running === true && timer < time*100) {
                    particles[i].checkForCollision(particles[j]);
                    particles[i].update();
                    particles[i].checkEdges();
                }
            }
        }
        particles[i].display();
    }
};
*/
