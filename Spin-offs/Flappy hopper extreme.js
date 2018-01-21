// Link:  https://www.khanacademy.org/computer-programming/flappy-hopper-extreme/5434703373271040
// Created: 01/12/2016 08:08





/** I pretty much made this into flappy bird. Hopper can now collect coins. If you hit a pipe, you die. If you hit the ground, you die. The win or lose screen is blured.**/

var start = false;
keyPressed = function() {
    start = true;  
};

var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = getImage("creatures/Hopper-Happy");
    this.coins = 0;
    this.health = 1;
};
Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    imageMode(CENTER);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};
Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 3;
};
Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 3;
};
Beaver.prototype.checkForHit = function(pipe, coin) {
    if ((this.x+20) >= pipe.x && (this.x+20) <= (pipe.x+50) &&
        (this.y+20) >= pipe.y && this.y <= (pipe.y+220)) {
            this.health -= 1;
    }
    var d = dist(this.x, this.y, coin.x, coin.y);
    if (d < 10) {
        coin.y = -400;
        this.coins += 1;
    }
};

var Coin = function(x, y) {
    this.x = x;
    this.y = y;
};
Coin.prototype.draw = function() {
    fill(255, 230, 0);
    ellipse(this.x, this.y, 20, 20);
};

var Pipe = function(x, y) {
    this.x = x;
    this.y = y;
};
Pipe.prototype.draw = function() {
    noStroke();
    fill(10, 252, 46);
    rect(this.x, this.y, 50, 200);
    rect(this.x-10, this.y, 70, 20);
    rect(this.x-10, this.y+180, 70, 20);
};

var beaver = new Beaver(200, 200);

var pipes = [];
for (var i = 0; i < 20; i++) {  
    pipes.push(new Pipe(i * 250 + 300, random(240, 300)));
    pipes.push(new Pipe(i * 250 + 300, random(-70, -100)));
}

var grassXs = [];
for (var i = 0; i < 10; i++) { 
    grassXs.push(i*58);
}

var coins = [];
for (var i = 0; i < 40; i++) {
    coins.push(new Coin(i*110+300, random(156, 230)));
}

draw = function() {
    
    background(227, 254, 255);
    
    for (var i = 0; i < pipes.length; i++) {
        pipes[i].draw();
        if (start === true) {
            beaver.checkForHit(pipes[i], coins);
            pipes[i].x -= 1.5;
        }
    }
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.95, 60, 80);
        if (start === true) {
            grassXs[i] -= 1.5;
            if (grassXs[i] <= -30) {
                grassXs[i] = 550;
            }
        }
    }
    
    for (var i = 0; i < coins.length; i++) {
        coins[i].draw();
        if (start === true) {
            beaver.checkForHit(pipes[i], coins[i]);
            coins[i].x -= 1.5;
        }
    }
    
    if (start === true) {
        if (keyIsPressed && keyCode === UP) {
            beaver.hop();
        } else {
            beaver.fall();
        }
    }
    beaver.draw();
    
    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Score: " + beaver.coins, 40, 60);
    text("Health: " + beaver.health, 40, 30);
    textSize(30);
    if (beaver.coins/coins.length >= 0.95) {
        filter(BLUR, 2);
        text("YOU WIN!!!!", width/2, height/2);
        start = false;
    }
    if (beaver.health < 0 || beaver.y > 345) {
        filter(BLUR, 2);
        text("YOU LOSE! \nTRY AGAIN?", width/2, height/2);
        start = false;
    }
};
