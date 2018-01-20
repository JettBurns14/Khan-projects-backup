// Link:  https://www.khanacademy.org/computer-programming/water-simulation/5052931790995456
// Created:  12/23/2015 07:46





var Button = function(x, y, sym) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 35;
    this.w2 = this.w/2;
    this.h2 = this.h/2;
    this.symbol = sym;
    this.c = color(188, 224, 210);
    this.num = sym;
};
Button.prototype.draw = function() {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textFont(createFont("sans"));
    textSize(13);
    strokeWeight(2);
    stroke(0);
    fill(this.c);
    rect(this.x, this.y, this.w, this.h, 4);
    fill(194, 194, 194);
    fill(0);
    text(this.symbol, this.x, this.y);
};
Button.prototype.clickFunction = function() {
    if (mouseX > this.x - this.w2 && mouseX < this.x + this.w2 && mouseY > this.y-this.h2 && mouseY < this.y+this.h2) {
        this.c = color(174, 204, 192);
        if (mouseIsPressed) {
            this.num = this.sym;
        }
    } else {
        this.c = color(188, 224, 210);
    }
};

var buttons = [];

for (var i = 0; i < 1; i++) {
    buttons.push(new Button(126, 200, 7));
    buttons.push(new Button(168, 200, 8));
    buttons.push(new Button(210, 200, 9));
    buttons.push(new Button(126, 236, 4));
    buttons.push(new Button(168, 236, 5));
    buttons.push(new Button(210, 236, 6));
    buttons.push(new Button(126, 272, 1));
    buttons.push(new Button(168, 272, 2));
    buttons.push(new Button(210, 272, 3));
    buttons.push(new Button(126, 308, 0));
    buttons.push(new Button(168, 308, "."));
    buttons.push(new Button(210, 308, "EXP"));
    buttons.push(new Button(252, 272, "-"));
    buttons.push(new Button(252, 236, "x"));
    buttons.push(new Button(252, 308, "+"));
    buttons.push(new Button(252, 200, "÷"));
}

draw = function() {
    background(227, 227, 227);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].clickFunction();
        buttons[i].draw();
    }
};
