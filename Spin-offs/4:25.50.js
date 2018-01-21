// Link:  https://www.khanacademy.org/computer-programming/42550/5811078852640768
// Created:  01/29/2016 09:09





/*LEVEL EDITOR CREATED: https://www.khanacademy.org/computer-programming/exit-path-level-creator/5200995122806784
*/

/**
EXIT PATH
-  "One of the best, if not the best, game that has ever thundered onto the hot list on Khan Academy. Simply amazing, this game blew my mind. It is incredibly well-rounded and has excellent gameplay." - Gleam of Dawn
-  "One of the best platform games I have played." - Aidabaida
-  "Really nicely done. Professional quality, and the element of it's-not-over-when-you-think-it's-over keeps you playing to the end." - T#1B12P
-  "A classic, smooth, and professional game." - Photonic Symmetry
-  "One of the best platformers out there." - awk888

EVERY LEVEL IS POSSIBLE. SOMETIMES YOU HAVE TO USE THE FLOW.
If a stage is taking a long time, you can press the Skip Stage button. It adds a 2 minute time penalty, though.

Based on the real life game Exit Path: armorgames.com/play/5917/exit-path
Post a spinoff with your time to get on the highscores!

Add /embedded?editor=no&&width=900&&height=600 to the end of the URL for a big screen

How to beat Level 10:
{
    Go back, not forward. It's a trick.
}

**/
var daTime = 0, gamestate = "logo", endTime, end;
angleMode = "degrees";
scale(width / 600, height / 400);
textFont(createFont("Arial"), 12);

var mouse = {
    get x() {   return mouseX * (600 / width);  },
    get y() {   return mouseY * (400 / height); },
    get pressed() { return mouseIsPressed;      },
    clicking: false,
    over: function(x, y, w, h) {
        return this.x >= x && this.x <= x + w &&
               this.y >= y && this.y <= y + h;
    },
    clickOn: function(x, y, w, h) {
        return this.clicking && this.over(x, y, w, h);
    }
}, player, done = 0, paused = false;

var textHeight = function () {
    return textAscent() + textDescent();
};

var button = function(x, y, w, h, txt) {
    txt = trim(txt.toString());
    var offset = mouse.over(x, y, w, h) ? mouse.pressed ? 0 : 1 : 2;
    pushStyle();
    stroke(196, 196, 196);
    strokeWeight(3);
    fill(0, 0, 0);
    rect(x, y, w, h, 5);
    pushMatrix();
    translate(offset, -offset);
    noFill();
    if (mouse.over(x, y, w, h)) {
        fill(255, 255, 255, 100);
    }
    if (mouse.pressed) {
        fill(255, 255, 255, 200);
    }
    rect(x, y, w, h, 5);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text(txt, x + w * 0.1, y, w * 0.8, h * 0.8);
    popMatrix();
    popStyle();
    if (mouse.over(x, y, w, h)) { cursor(HAND); }
    return mouse.clickOn(x, y, w, h);
};

var preformance = function (data) {
    if (data >= 61) {
        return 'Smooth';
    }
    if (data >= 59) {
        return 'Normal';
    }
    if (data >= 50) {
        return 'Mediocre';
    }
    if (data >= 40) {
        return 'Choppy';
    }
    if (data >= 30) {
        return 'Slow';
    }
    if (data >= 20) {
        return 'Very Slow';
    }
    if (data >= 10) {
        return 'Near Crash';
    }
    return 'About To Crash';
};

mouseReleased = function () { mouse.clicking = true; };

var logo = function(w) {
    noStroke();
    background(255, 255, 255);
    textAlign(LEFT, CENTER);
    textFont(createFont("Impact Bold"), 50);
    fill(0, 0, 0, min(frameCount, 200));
    rect(frameCount * 3, 80, 600, 10);
    rect(0, 100, w - frameCount * 3, 10);
    rect(20, 0, 10, frameCount * 3 - 150);
    rect(w - 40, 0, 10, frameCount * 3 - 150);
    var heading = "Lionofgd";
    for (var i = 0; i < name.length; i++) {
        fill(0, 0, 0, min(frameCount - 10 * i, 200));
        text(heading.charAt(i), w / 2 - textWidth(heading) / 2 + textWidth(heading.substring(0, i)), 150);
    }
    textSize(80);
    var subtitle = "Games";
    for (var i = 0; i < name.length; i++) {
        fill(0, 0, 0, min(frameCount - 10 * i - 85, 200));
        text(subtitle.charAt(i), w / 2 - textWidth(subtitle) / 2 + textWidth(subtitle.substring(0, i)), 230);
    }
    if (mouse.clicking || frameCount > 300) {
        mouse.clicking = false;
        frameCount = 0;
        gamestate = 'presenting';
    }
};

var PRESENTING = function() {
    var FC = frameCount;
    var A = FC - 128;
    background(0, 0, 0);
    textFont(createFont("Arial Bold"));
    textAlign(CENTER, TOP);
    textSize(30);
    fill(255, 255, 255, 255 - FC * 2);
    text("PRESENTS...", 300, 20);
    if (A > 0) {
        pushMatrix();
        translate(300, 50);
        scale(max(50 - A / 5, 1));
        fill(255, 255, 255);
        text("EXIT PATH", 0, 0);
        popMatrix();
        if (50 - A / 5 < 1) {
            pushMatrix();
            translate(min((A - 200) * 2 - 300, 200), 100);
            translate(100, 0);
            textSize(15);
            text("Click to continue", 0, 0);
            popMatrix();
        }
    }
    if (mouse.clicking) {
        frameCount = 0;
        gamestate = "game";
    }
};

var highscores = [];
var score = function(name, amount) {
    highscores.push({ name: name, score: amount });
    highscores.sort(function(a, b) {
        return parseFloat(a.score.replace(/:/, '')) - parseFloat(b.score.replace(/:/, '')); 
    });
    highscores.splice(12);
};

//Functions for all of the images
var images = {
    'runner-normal': function () {
        background(0, 0, 0, 0);
        fill(0, 206, 255);
        noStroke();
        rect(0, 0, 20, 20);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'runner-flow': function () {
        background(0, 0, 0, 0);
        noFill();
        stroke(0, 206, 255, 50);
        strokeWeight(5);
        rect(0, 0, 20, 20);
        stroke(0, 206, 255, 100);
        rect(3, 3, 14, 14);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'runner-flow-trail': function () {
        background(0, 0, 0, 0);
        noFill();
        stroke(255, 255, 255, 50);
        strokeWeight(5);
        rect(0, 0, 20, 20);
        stroke(255, 255, 255, 100);
        rect(3, 3, 14, 14);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'block': function () {
        background(0, 0, 0, 0);
        fill(128, 128, 128);
        noStroke();
        rect(0, 0, 20, 20);
        fill(0, 0, 0, 100);
        rect(1, 1, 18, 18, 1);
        stroke(128, 128, 128);
        strokeWeight(1);
        rect(2, 2, 15, 15, 1);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'block-2': function () {
        background(0, 0, 0, 0);
        fill(96, 96, 96);
        noStroke();
        rect(0, 0, 20, 20);
        fill(96, 96, 96);
        rect(1, 1, 18, 18, 1);
        stroke(0, 0, 0, 200);
        strokeWeight(2);
        rect(2, 2, 15, 15);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'bouncy': function () {
        background(0, 0, 0, 0);
        fill(128, 128, 128);
        noStroke();
        rect(0, 0, 20, 20);
        stroke(0, 0, 0, 100);
        strokeWeight(2);
        rect(2, 2, 15, 15, 0.5);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'bouncy-top': function () {
        background(0, 0, 0, 0);
        fill(196, 196, 196);
        noStroke();
        rect(0, 0, 20, 3);
        return get (0, 0, 20 * width / 600, 3.5 * height / 400);
    },
    'bouncy-2': function () {
        background(0, 0, 0, 0);
        fill(0, 0, 0);
        noStroke();
        rect(0, 0, 20, 20);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'bouncy-top-2': function () {
        background(0, 0, 0, 0);
        fill(0, 0, 0);
        noStroke();
        rect(0, 0, 20, 3);
        return get (0, 0, 20 * width / 600, 3.5 * height / 400);
    },
    'spike': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(255, 255, 255);
        triangle(0, 20, 5, 20, 5, 0);
        triangle(10, 20, 15, 20, 15, 0);
        fill(196, 196, 196);
        triangle(5, 0, 5, 20, 10, 20);
        triangle(15, 0, 15, 20, 20, 20);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'wheel': function () {
        background(0, 0, 0, 0);
        var wheel = function(spokes, sharpness, size) {
            pushMatrix();
            translate(200, 200);
            noStroke();
            for (var i = 0; i < spokes; i++) {
                rotate(360 / spokes);
                beginShape();
                vertex(-360 / spokes, size);
                vertex(0, size + sharpness);
                vertex(360 / spokes, size);
                endShape();
            }
            ellipse(0, 0, size * 2 + 2, size * 2 + 2);
            popMatrix();
        };
        pushMatrix();
        translate(-130, -130);
        fill(212, 212, 212);
        wheel(20, 40, 30);
        fill(182, 182, 182);
        wheel(20, 40, 10);
        popMatrix();
        return get (0, 0, 140 * width / 600, 140 * height / 400);
    },
    'wheel-2': function () {
        background(0, 0, 0, 0);
        var wheel = function(spokes, sharpness, size) {
            pushMatrix();
            translate(200, 200);
            noStroke();
            for (var i = 0; i < spokes; i++) {
                rotate(360 / spokes);
                beginShape();
                vertex(-360 / spokes, size);
                vertex(0, size + sharpness);
                vertex(360 / spokes, size);
                endShape();
            }
            ellipse(0, 0, size * 2 + 2, size * 2 + 2);
            popMatrix();
        };
        pushMatrix();
        translate(-130, -130);
        fill(0, 0, 0);
        wheel(20, 40, 30);
        fill(32, 32, 32);
        wheel(20, 40, 10);
        popMatrix();
        return get (0, 0, 140 * width / 600, 140 * height / 400);
    },
    'slab': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(128, 128, 128);
        rect(0, 0, 20, 8);
        fill(64, 64, 64);
        rect(0, 8, 20, 2);
        return get (0, 0, 10 * width / 600, 10 * height / 400);
    },
    'mover': function () {
        fill(64, 64, 64);
        noStroke();
        rect(0, 0, 20, 20);
        fill(255, 255, 255, 100);
        textFont("Arial", 8);
        textAlign(CENTER, CENTER);
        text("> > >", 10, 7.5);
        return get (0, 0, 20 * width / 600, 15 * height / 400);
    },
    'crusher-top': function () {
        background(0, 0, 0, 0);
        fill(255, 255, 255);
        noStroke();
        rect(5, 0, 10, 20);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'crusher': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(255, 255, 255);
        rect(0, 0, 20, 3);
        triangle(0, 2, 5, 2, 5, 20);
        triangle(10, 2, 15, 2, 15, 20);
        fill(196, 196, 196);
        triangle(5, 2, 5, 20, 10, 2);
        triangle(15, 2, 15, 20, 20, 2);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'crusher-top-2': function () {
        background(0, 0, 0, 0);
        fill(0, 0, 0);
        noStroke();
        rect(5, 0, 10, 20);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'crusher-2': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(0, 0, 0);
        rect(0, 0, 20, 3);
        fill(196, 196, 196);
        triangle(0, 2, 5, 2, 5, 20);
        triangle(10, 2, 15, 2, 15, 20);
        fill(0, 0, 0);
        triangle(5, 2, 5, 20, 10, 2);
        triangle(15, 2, 15, 20, 20, 2);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'downspike': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(255, 255, 255);
        triangle(0, 0, 5, 0, 5, 20);
        triangle(10, 0, 15, 0, 15, 20);
        triangle(20, 0, 25, 0, 25, 20);
        fill(196, 196, 196);
        triangle(5, 0, 5, 20, 10, 0);
        triangle(15, 0, 15, 20, 20, 0);
        triangle(25, 0, 25, 20, 30, 0);
        return get (0, 0, 30 * width / 600, 20 * height / 400);
    },
    'downspike-2': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(0, 0, 0);
        triangle(0, 0, 5, 0, 5, 20);
        triangle(10, 0, 15, 0, 15, 20);
        triangle(20, 0, 25, 0, 25, 20);
        fill(128, 128, 128);
        triangle(5, 0, 5, 20, 10, 0);
        triangle(15, 0, 15, 20, 20, 0);
        triangle(25, 0, 25, 20, 30, 0);
        return get (0, 0, 30 * width / 600, 20 * height / 400);
    },
    'upspike': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(255, 255, 255);
        triangle(0, 20, 5, 20, 5, 0);
        triangle(10, 20, 15, 20, 15, 0);
        triangle(20, 20, 25, 20, 25, 0);
        fill(196, 196, 196);
        triangle(5, 20, 5, 0, 10, 20);
        triangle(15, 20, 15, 0, 20, 20);
        triangle(25, 20, 25, 0, 30, 20);
        return get (0, 0, 30 * width / 600, 20 * height / 400);
    },
    'upspike-2': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(0, 0, 0);
        triangle(0, 20, 5, 20, 5, 0);
        triangle(10, 20, 15, 20, 15, 0);
        triangle(20, 20, 25, 20, 25, 0);
        fill(128, 128, 128);
        triangle(5, 20, 5, 0, 10, 20);
        triangle(15, 20, 15, 0, 20, 20);
        triangle(25, 20, 25, 0, 30, 20);
        return get (0, 0, 30 * width / 600, 20 * height / 400);
    },
    'flag-1': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(128, 128, 128);
        rect(0, 0, 2, 20);
        return get (0, 0, 20 * width / 600, 20 * height / 400);
    },
    'flag-2': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(128, 128, 128);
        rect(0, 0, 2, 30);
        fill(0, 206, 255);
        rect(0, 0, 15, 10);
        return get (0, 0, 20 * width / 600, 30 * height / 400);
    },
    'teleporter': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(255, 255, 255);
        rect(0, 0, 20, 3);
        rect(0, 23, 20, 7);
        fill(0, 0, 0, 50);
        stroke(255, 255, 255);
        strokeWeight(0.5);
        rect(0, 3, 20, 20);
        return get (0, 0, 20 * width / 600, 30 * height / 400);
    },
    'teleporter-2': function () {
        background(0, 0, 0, 0);
        noStroke();
        fill(0, 0, 0);
        rect(0, 0, 20, 3);
        rect(0, 23, 20, 7);
        fill(255, 255, 255, 50);
        stroke(0, 0, 0);
        strokeWeight(0.5);
        rect(0, 3, 20, 20);
        return get (0, 0, 20 * width / 600, 30 * height / 400);
    },
};

//Name generator
var id = function() {
    //Choose from array of famous names
    var arr = [
        "Aidabaida",
        "IronMan44",
        "#1B12P",
        "Blue Leaf",
        "Swax97",
        "Kevin23",
        "Ryan Kee",
        "Thunder",
        "Lordats",
        "(Otisw)",
        "GleamDawn",
        "KK007",
    ];
    var a = arr[floor(random(arr.length))];
    //Add whitespace so that it will be drawn properly (return MUST be 9 chars)
    for (var i = 0; i < 9 - a.length; i++) {
        a += " ";
    }
    return a;
};

//Cache for storing game information
var cache = {
    //Screen transparency
    transparency: 0,
    //Holds ingame images
    images: {},
    //Holds name
    name: id(),
    //Holds level art
    art: {
        1:  function () {
            fill(96, 96, 96);
            stroke(128, 128, 128);
            strokeWeight(1);
            rect(345, 200, 110, 40);
            textFont(createFont("Arial"), 10);
            textAlign(CENTER, CENTER);
            fill(230, 230, 230);
            rect(390, 203, 20, 20);
            rect(412, 212, 25, 5);
            rect(363, 212, 25, 5);
            noStroke();
            triangle(353, 215, 364, 205, 364, 224);
            triangle(447, 215, 436, 205, 436, 224);
            text("A/D or LEFT/RIGHT", 400, 230);
            textFont(createFont("Arial"), 7.5);
            textAlign(LEFT, TOP);
            text('"Freedom" allocated in\n\n\n\ndays', 182, 180);
            stroke(128, 128, 128);
            fill(64, 64, 64);
            for (var i = 0; i < 6; i++) {
                rect(182 + 17 * i, 190, 15, 25);
            }
            textFont(createFont("Arial"), 18);
            fill(128, 128, 128);
            text("_ O P E N _", 184.5, 192);
            fill(64, 64, 64);
            rect(21, 235, 5, 45);
            rect(26, 272, 50, 5);
            rect(77, 255, 5, 25);
            stroke(0, 0, 0);
            fill(255, 255, 255);
            rect(26, 250, 5, 10);
            fill(81, 0, 150);
            rect(26, 260, 50, 12);
        },
        2:  function () {
            fill(96, 96, 96);
            stroke(128, 128, 128);
            strokeWeight(1);
            rect(80, 110, 310, 35);
            rect(507, 110, 110, 35);
            rect(740, 72, 520, 210);
            fill(230, 230, 230);
            textFont(createFont("Arial"), 9);
            textAlign(LEFT, TOP);
            text("UP OR W TO JUMP", 95, 130);
            text("HOLD LONGER TO JUMP HIGHER", 240, 130);
            text("S OR DOWN TO SLIDE", 515, 130);
            textSize(22);
            text("WELCOME RUNNER, YOUR RUNNER ID IS", 750, 92);
            textSize(9);
            text("YOUR COMPLETION OF THIS SERIES OF OBSTACLES MAY RESULT IN YOUR IMMEDIATE RELEASE*", 750, 220);
            fill(128, 128, 128);
            textSize(6);
            text("*THAT IS NOT TO SAY THAT YOU WILL BE COMPLETELY FREE. UNDER OUR GOVERNMENT AND LAWS THERE ARE SPECIFIC RULES AND OBLIGATIONS THAT WILL REQUIRE YOU TO CONTINUE TO OBEY OUR RULES UNDER A GOVERNED BODY OF SELF-APPOINTED INDIVIDUALS. ALL RUNNERS WILL ALSO UNDERSTAND THAT THIS RELEASE DOES NOT INDICATE ANY SOURCE OF LIBERTY AND THAT ALL MATTERS, IN ACCORDANCE WITH THE LAW WE PROVIDED, WILL HAVE A FINAL SAY BY THE GOVERNED BODY REGARDLESS OF WHAT HAS ALREADY BEEN SAID. COOPERATION IS MANDATORY AND NECESSARY. ANY DISAGREEMENT WITH THESE TERMS WILL NOT BE TOLERATED AND SUBJECT TO FINE", 750, 240, 510, Infinity);
            fill(230, 230, 230);
            noStroke();
            rect(140, 113.5, 15, 15);
            rect(130, 118, 3, 11);
            rect(525, 113.5, 15, 15);
            rect(545, 120, 25, 3);
            rect(590, 121, 15, 7.5);
            rect(590, 113, 15, 4);
            triangle(126.5, 118, 131.5, 113, 136.5, 118);
            triangle(570, 116.5, 580, 121.5, 570, 126.5);
            pushMatrix();
            translate(140, 0);
            for (var i = 1; i < 4; i++) {
                translate(30, 0);
                fill(230, 230, 230, i * 100);
                rect(140, 113.5, 15, 15);
                rect(130, 118, 3, 11);
                triangle(126.5, 118, 131.5, 113, 136.5, 118);
            }
            popMatrix();
            pushMatrix();
            translate(750, 130);
            stroke(255, 255, 255);
            strokeWeight(2);
            for (var i = 0; i < 9; i++) {
                fill(64, 64, 64);
                rect(0, 0, 45, 80);
                fill(255, 255, 255);
                textSize(50);
                textAlign(CENTER, TOP);
                text(cache.name.charAt(i).toUpperCase(), 22.5, 10);
                translate(50, 0);
            }
            popMatrix();
        },
        3:  function () {
            fill(96, 96, 96);
            stroke(128, 128, 128);
            strokeWeight(1);
            rect(25, 215, 430, 35);
            rect(865, 50, 55, 175);
            rect(1210, 200, 125, 30);
            rect(1432, 200, 95, 30);
            noStroke();
            fill(255, 0, 0);
            rect(1475, 202.5, 15, 15);
            fill(128, 128, 128);
            rect(1300, 202.5, 15, 15);
            fill(230, 230, 230);
            rect(30, 220, 15, 15);
            rect(1235, 202.5, 15, 15);
            rect(1255, 209, 35, 3);
            triangle(1290, 206, 1290, 215, 1295, 210.5);
            textSize(9);
            textAlign(LEFT, TOP);
            text("RUN", 30, 240);
            text("SURVIVORS GET FREED!", 1215, 220);
            text("DEATH CAN OCCUR", 1434, 220);
            textAlign(CENTER, TOP);
            text("HOLD UP\nTO JUMP\nHIGHER", 892, 190);
            textAlign(RIGHT, TOP);
            text("PUSH SPACE OR SHIFT", 450, 240);
            rect(895, 55, 15, 15);
            rect(880, 65, 5, 115);
            rect(50, 225, 300, 5);
            triangle(350, 222.5, 350, 232.5, 360, 227.5);
            triangle(877.5, 65, 882.5, 60, 887.5, 65);
            pushMatrix();
            translate(360, 5);
            for (var i = 0; i < 3; i++) {
                fill(230, 230, 230, i * 50 + 50);
                translate(20, 0);
                rect(0, 215, 15, 15);
            }
            popMatrix();
        },
        4:  function () {
            fill(96, 96, 96);
            stroke(128, 128, 128);
            strokeWeight(1);
            rect(165, 135, 110, 35);
            rect(685, 135, 110, 35);
            fill(230, 230, 230);
            noStroke();
            rect(200, 140, 15, 15);
            rect(220, 146.5, 30, 3);
            triangle(250, 143.5, 250, 152.5, 255, 148);
            rect(720, 146.5, 45, 3);
            triangle(765, 143.5, 765, 152.5, 770, 148);
            textSize(9);
            textAlign(LEFT, TOP);
            text("TIME TO SURVIVE!", 180, 160);
            text("DON'T FORGET FLOW", 690, 160);
        },
        11: function () {
            fill(64, 64, 64);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(320, 20, 470, 200);
            textSize(23);
            textAlign(LEFT, TOP);
            fill(128, 128, 128);
            text("ATTENTION SURVIVING RUNNER:", 340, 40);
            textSize(9);
            fill(255, 225, 192);
            text("CONGRATULATIONS. YOU MAY BE CHOSEN FOR A MANDATORY AUDIT OF YOUR ABILITIES.", 340, 75);
            fill(192, 192, 192);
            text("PLEASE PASS THROUGH THE TURNSTILE TO RECIEVE FURTHER INFORMATION ABOUT YOUR FREEDOM* AND THE PROCESS TOWARDS YOUR EVENTUAL RELEASE.", 340, 95, 430, Infinity);
            fill(255, 255, 255);
            textSize(80);
            text("AUDIT", 340, 120);
            textSize(8);
            fill(128, 128, 128);
            text("*PLEASE NOTE THAT UNDER STATUE (c)435.43 THAT ALL PROCEEDING AUDITS ARE TO BE HANDLED UNDER THE BEST OF ONE'S OWN ABILITY. ANY LIABLILTY CAUSED BY A \"MISAUDIT\" CAN BE FILED ONCE THE CORPSE HAS BEEN FOUND IN THE AUDIT TEST AREA. PLEASE NOTE THAT ANY LEGAL JUDGEMENT PASSED ON THE AUDIT IS SUBJECT TO FURTHER SCRUTINY BY THE OFFICIALS OF SUCH EVENTS.", 590, 120, 190, Infinity);
        },
        16: function () {
            fill(64, 64, 64);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(300, 120, 470, 140);
            textSize(20);
            textAlign(LEFT, TOP);
            fill(128, 128, 128);
            text("THANK YOU FOR YOUR PARTICIPATION", 320, 130);
            fill(255, 255, 255);
            textSize(9);
            text("YOUR ARRIVAL AT THIS POINT CONFIRMS YOUR SKILL IN THE STADIUM CHALLENGE YOU HAVE BEEN ISSUED*. CONTINUE INTO THE NEXT ROOM TO PROCEED TO THE EXIT PATH.", 320, 160, 430, Infinity);
            fill(192, 192, 192);
            textSize(6);
            text("* THE STADIUM CHALLENGE CAN CHANGE AT ANY TIME. THE OUTCOME FOR FINISHING THE STADIUM CHALLENGE CAN CHANGE AT ANY TIME. THE CIRCUMSTANCES FOR WHICH A CHALLENGE IS ISSUED CAN CHANGE AT ANY TIME. THE OUTCOME OF A CHALLENGE, REGARDLESS OF WHAT WAS SAID IN PREVIOUS ARTICLES, CAN CHANGE AT ANY TIME. THANK YOU FOR YOUR PATIENCE.", 320, 190, 430, Infinity);
        },
        17: function () {
            fill(64, 64, 64);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(770, 310, 80, 40);
            rect(730, 230, 80, 40);
            rect(350, 90, 320, 200);
            fill(192, 192, 192);
            rect(780, 312.5, 15, 15);
            rect(800, 318.5, 20, 3);
            triangle(820, 317.5, 820, 324, 825, 321);
            textSize(11);
            textAlign(LEFT, TOP);
            text("FREEDOM*", 780, 330);
            textSize(7);
            text("*AS DEEMED NECESSARY BY THE GOVERNING BODY OF THIS GREAT NATION OF OURS, AND PENDING FURTHER REVIEW", 365, 260, 300, Infinity);
            textSize(8);
            textAlign(CENTER, CENTER);
            text("AUTHORIZED\nPERSONNEL ONLY", 770, 250);
            fill(255, 255, 255);
            textSize(17);
            textAlign(LEFT, TOP);
            text("RUNNER NOTICE OF RIGHTS", 365, 105);
            textSize(9);
            text("CONGRATULATIONS ON FINISHING THE COURSE. WE HAVE DEEMED YOU SUFFICIENT FOR AN INCREDIBLY IMPORTANT ROLE IN OUR COUNTRY'S FUNCTION. THIS ROLE IS MANDATORY AND PART OF YOUR FREEDOM*.", 365, 145, 300, Infinity);
            textSize(13);
            text("PLEASE CONTINUE DOWN THIS CORRIDOR", 365, 225);
            fill(255, 0, 0);
            textFont(createFont("Comic Sans MS Bold"), 40);
            textAlign(CENTER, CENTER);
            pushMatrix();
            translate(510, 195);
            rotate(-30);
            text("THERE IS NO\nFREEDOM!", 0, 0);
            popMatrix();
            textFont(createFont("Arial"));
        },
        18: function () {
            fill(64, 64, 64);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(0, 280, 80, 35);
            rect(540, 270, 85, 30);
            fill(192, 192, 192);
            rect(20, 305, 40, 2);
            triangle(20, 304, 20, 309, 15, 306.5);
            textSize(8);
            textAlign(CENTER, CENTER);
            text("TO RUNNER\nEXTERMINATION", 40, 292.5);
            textSize(7);
            text("EXTERMINATION\nDISCUSSION\nPROHIBITED", 582.5, 285);
        },
        20: function () {
            fill(64, 64, 64);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(10, 200, 300, 100);
            fill(255, 0, 0);
            textSize(25);
            textAlign(CENTER, TOP);
            text("THIS IS NOT AN EXIT", 155, 210);
            fill(192, 192, 192);
            textSize(10);
            text("DEATH CAN OCCUR ALONG THIS PATH. THIS ROOM IS\nNOT MEANT FOR HUMAN USE. DO NOT ENTER.", 155, 250);
        },
        25: function () {
            fill(48, 48, 48);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(590, 20, 320, 150);
            fill(255, 255, 255);
            textSize(25);
            textAlign(LEFT, TOP);
            text('!', 610, 30);
            fill(255, 0, 0);
            text('CITY LIMITS AHEAD', 640, 30);
            fill(196, 196, 196);
            textSize(11);
            text('IMPOSSIBLY DIFFICULT PROTECTION MECHANISMS AHEAD, DO NOT EXIT OR RISK IMMEDIATE DEATH', 610, 70, 300, Infinity);
            fill(128, 128, 128);
            textSize(9);
            text('NO CITIZEN IS ALLOWED TO LEAVE THE CITY WITHOUT PRIOR AUTHORIZATION AND REASON. PLEASE RETURN TO THE CITY IMMEDIATELY UNLESS OTHERWISE CRENDITIALED', 610, 115, 300, Infinity);
        },
        26: function () {
            fill(48, 48, 48);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(20, 40, 340, 150);
            fill(255, 255, 255);
            textSize(25);
            textAlign(LEFT, TOP);
            text('!', 40, 50);
            fill(255, 0, 0);
            text('400 FEET TO CITY LIMIT', 60, 50);
            fill(196, 196, 196);
            textSize(11);
            text('NOTE THAT ALL CITIZENS ARE NOT ALLOWED IN THIS AREA AND ARE NOW IN VIOLATION OF SECTIONS (c) 452-52566 TO 452-52569', 40, 90, 300, Infinity);
            fill(128, 128, 128);
            textSize(9);
            text('NO CITIZEN IS ALLOWED TO LEAVE THE CITY WITHOUT PRIOR AUTHORIZATION AND REASON. PLEASE RETURN TO THE CITY IMMEDIATELY UNLESS OTHERWISE CRENDITIALED', 40, 135, 300, Infinity);
        },
        27: function () {
            fill(48, 48, 48);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(20, 40, 340, 150);
            fill(255, 255, 255);
            textSize(25);
            textAlign(LEFT, TOP);
            text('!', 40, 50);
            fill(255, 0, 0);
            text('300 FEET TO CITY LIMIT', 60, 50);
            fill(196, 196, 196);
            textSize(11);
            text('PLEASE NOTE THAT DISREGARD TO THE PREVIOUS SIGN IS NOW IN VIOLATION OF SECTION (c)452- 52570', 40, 90, 300, Infinity);
            fill(128, 128, 128);
            textSize(9);
            text('NO CITIZEN IS ALLOWED TO LEAVE THE CITY WITHOUT PRIOR AUTHORIZATION AND REASON. PLEASE RETURN TO THE CITY IMMEDIATELY UNLESS OTHERWISE CRENDITIALED', 40, 135, 300, Infinity);
        },
        28: function () {
            fill(48, 48, 48);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(20, 40, 340, 150);
            fill(255, 255, 255);
            textSize(25);
            textAlign(LEFT, TOP);
            text('!', 40, 50);
            fill(255, 0, 0);
            text('200 FEET TO CITY LIMIT', 60, 50);
            fill(196, 196, 196);
            textSize(11);
            text('NOTE THAT WHILE THE GOVERNMENT WORKS PASSIVELY THROUGH THESE SERIES OF SIGNS, YOU WILL STILL BE HELD ACCOUNTABLE FOR YOUR ACTION', 40, 90, 300, Infinity);
            fill(128, 128, 128);
            textSize(9);
            text('NO CITIZEN IS ALLOWED TO LEAVE THE CITY WITHOUT PRIOR AUTHORIZATION AND REASON. PLEASE RETURN TO THE CITY IMMEDIATELY UNLESS OTHERWISE CRENDITIALED', 40, 135, 300, Infinity);
        },
        29: function () {
            fill(48, 48, 48);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(20, 90, 340, 150);
            fill(255, 255, 255);
            textSize(25);
            textAlign(LEFT, TOP);
            text('!', 40, 100);
            fill(255, 0, 0);
            text('100 FEET TO CITY LIMIT', 60, 100);
            fill(196, 196, 196);
            textSize(11);
            text('Lorem ipsum dolor sit amet, consectetur adepisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 40, 140, 300, Infinity);
            fill(128, 128, 128);
            textSize(9);
            text('PLEASE REPLACE THIS TEXT WITH GOVERNMENT ISSUED TEXT. ALTHOUGH THIS LIMIT MOST LIKELY WILL NOT BE REACHED BY AN INDIVIDUAL PLEASE REPLACE BY SIGN (S)99.4392 (34-23) by 8/23/32', 40, 195, 300, Infinity);
        },
        30: function () {
            fill(48, 48, 48);
            stroke(192, 192, 192);
            strokeWeight(1);
            rect(90, 40, 320, 100);
            textAlign(CENTER, TOP);
            fill(255, 255, 255);
            textSize(20);
            text('THE CITY', 250, 50);
            textSize(10);
            fill(192, 192, 192);
            text('POPULATION: 252,914,852   ELEVATION: 12FT', 250, 90);
            fill(128, 128, 128);
            textSize(12);
            text('CITY LIMIT', 250, 75);
            textAlign(LEFT, TOP);
            textSize(9);
            text('THIS CITY IS UNAVAILABLE FOR ENTRY BY NON-CITIZENS. IF YOU ARE A CITIZEN OF THE CITY YOU NEED TO RETURN IMMEDIATELY.', 100, 110, 300, Infinity);
        },
    },
    //Current level
    level: 0,
    //Arrays containing level information
    levels: {
        1:  [
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■       ■",
            "■       ■",
            "■       ■",
            "■       ",
            "■ P",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■",
            "■",
            "■",
            "■",
            "■",
        ],
        2:  [
            "■■                               ■■■                            ■",
            "■■                               ■■■                            ■",
            "■■                               ■■■                            ■",
            "■■                               ■■■                            ■",
            "■■                               ■■■                            ■",
            "■■                               ■■■                            ■",
            "■■                               ■■■                            ■",
            "■■                               ¯¯■                            ■",
            "■■                     ■■■■■■■■■■■ ■                            ■",
            "■■P    ■■              ■■■■■■■■■■■ ■                            ■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ ■                            ■",
            "■■■    ■■      ■■      ■■       ■■ ■                            ■",
            "■■■    ■■      ■■      ■■       ■■ ■                            ■",
            "■■■    ■■      ■■      ■■       ■■ ■                            ■",
            "■■■    ■■      ■■      ■■       ■■ ■                            ■",
            "■■■    ■■      ■■      ■■       ■■ ■            ■■■             ■",
            "■■■    ■■      ■■      ■■       ■■ ■            ■■■",
            "■■■    ■■      ■■      ■■       ■■",
            "■■■    ■■      ■■      ■■       ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■■■    ■■      ■■      ■■       ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
        ],
        3:  [
            "                           ■■■■                ■■■■■",
            "                           ■■■■                ■■■■■",
            "                           ■■■■                ■■■■■",
            "                           ■■■■                ■■■■■",
            "                           ■■■■                ■   ■",
            "                           ■■■■                ■   ■",
            "                           ■■■■                ■ ■ ■",
            "                           ■■■■                ■ ■ ■",
            "                           ■■■■                ■ ■ ■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "                           ■■■■                ■ ■ ■",
            "                           ■■■■                ■ ■ ■",
            "                           ■■■■                ■ ■ ■",
            "                           ■■■■                ■ ■ ■       ■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ ■ ■      ■■■■■■■■■■■■■■■■■■■■",
            "■ P                                              ■ ■     ■■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ ■ ■    ■■■■■■■■■■■■■■■■■■■■■■",
            "                           ■■■■                ■ ■ ■   ■■■■■■■■■■■■■■■■■■■■■■■",
            "                           ■■■■                ■ ■    ■■■■■■■■■■■■■■■■■■■■■■■■",
            "                           ■■■■        ■■■■■■■■■ ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "                           ■■■■        ■■■■■■■■■□■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
        ],
        4:  [
            "■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■",
            "",
            "P",
            "■■■■■■■■■■■■■■■■■■    ■■■■■■    ■■■■■■■■■■■■■■■■",
            "■■■■■■■                                        ■",
            "■■■■■■■             #         #                ■",
            "■■■■■■■                                        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■                                                                     ■■",
            "■■■■■■■                                                                     ■■",
            "■■■■■■■    #",
            "■■■■■■■",
            "■■■■■■■       *",
            "■■■■■■■#",
            "■■■■■■■",
        ],
        5:  [
            "",
            "",
            "",
            "",
            "                                #",
            "                                ■■■■■■■■■",
            "                                ■    ■■■■■",
            "              U                 ■    ■■■■■■",
            "P                       F       ■  ■    ■■■■■■■■■■■■",
            "■■■■■■■                ■■       ■  ■■■■           ¯¯",
            "      ■■■■■■■■■■■■■■■■■■■          ■■■■■■■■■■■■■■■■■■■",
            "                        ■          ■                ■■",
            "                        ■          ■                ■■",
            "                        ■          ■",
            "                        ■          ■",
            "                        ■          ■",
            "                        ■ꜛꜛꜛꜛꜛꜛꜛꜛ□□■",
            "                        ■■■■■■■■■■■■"
        ],
        6:  [
            "                                              *",
            "",
            "                                                 #",
            "■■■■■■■                            ■■            ",
            "P     ■                      F     ¯¯             ",
            "■■■■■ ■                ■■■■■■■■■■■■■",
            "    ■ ■                ■■                           ■",
            "    ■ ■                            #                ■",
            "    ■ ■                                    ■■■■■■■■",
            "    ■ ■                                   ■■■■■■■■■",
            "    ■",
            "    ■■■■■■    ■■□                    ■■■■■■■■     ■■■■■",
            "                                                     ■■",
            "            #                                 ■■■    ■■",
        ],
        7:  [
            "                                            &",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "P",
            "■■■■■■■>>>>>>>>>                                                           <<<<<<<<<■■■■■■■",
            "■■■■■■■■■■■■■■■■>>>>>>>>>                                         <<<<<<<<<■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■>>>>>>>>>□□                   □□<<<<<<<<<■■■■■■■■■■■■■■■■■■■■■■■■■",
            "", 
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "                                             &"
        ],
        8:  [
            "",
            "",
            "              ■■■■■■■■",
            "              ■■■`   ■",
            "              ■■`    ■■■■■■■■■",
            "              ■`        ■■■■■■",
            "              ■           ■■■■■■■■",
            "              ■              ¯¯¯¯■■",
            "              ■    ■■■■■■■■■■■    ■",
            "              ■    ■!!!!!!!!■■    ■",
            "             ■■    ■        ■■    ■",
            "■■■■■■■■■■■■■■",
            "    ■■■■■■■■■                   F",
            "P ■ ꜛꜛꜛꜛꜛꜛꜛꜛꜛ      ■■■■■■■■■■■■■■■■■■■■■   ■■   >>>>>>>>>>>",
            "■■■■■■■■■■■■■■■□□□□■                  ■■   ■■   ■■■■■■■■■■■",
            "                                                  ■■■■■■■■■",
        ],
        9:  [
            "        ■■■■■□■■■   *",
            "        ■    ■",
            "■          ■ ■",
            "■         ■  ■  ■   *",
            "■ P ■    ■     ■                        ■■■■",
            "■■■■■   ■■■■■■■■■                          ■",
            "   ■    !!!!!!!!!    ■     1               ■",
            "   ■                 ■■■■■■■■■■■■■■■■■■■■  ■",
            "   ■              F                     ■■ ■",
            "   ■■■■■         ■■ꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛ¯¯ ■      #",
            "  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "  ■",
            "  ■",
            "  ■1 F",
            "  ■■■■>>>>>>>>>>>>>>>>>      <<<<<<<<<<<<<<<■",
            "                                              ",
            "                                              #",
            "",
            "                                                 ■■■■■■■",
        ],
        10: [
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!■",
            "                                                               ■",
            "                                                               ■",
            "                                                               ■",
            "  P   ꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛ■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "    ■`   `  `    ``   ```     ``     ",
            "   1■",
            "   ■■",
            "",
            "  F                                                    1       2",
            "■■■■■□■■■□■■□■■■■□□■■■□□□■■■■■□□■■■■■ * * * * * *■■■□■■■■■■■■■■■",
            "■    ■",
            "■    ■2",
            "■    ■■■■",
            "■",
            "■",
            "■ F",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■                        ■■■■■■■■",
        ],
        11: [
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■                                                 ■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■    ■■    ■",
            "■■■■■■■■■■■■■■■■■■■■■■■■           ■",
            "■■■■■■■■■■■■■■■■■■■■■■      ■■■■  ■■■■■■■■■■■■■■■■■■■■■",
            "■                         ■■■■■■",
            "■P                       ■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
        ],
        12: [
            "■                ■■■■                       *",
            "■                ■■■■",
            "■                ■■■■                         *",
            "■                ■■■■",
            "■",
            "■                                   ■■■■■■■",
            "■                       ■■■       ■■■■■■■■■",
            "■■                      ■",
            "■■■■■      ■■   ■  F   ■■                 ■■■■■",
            "■■■■■      ■■   ■■■■■                        ■■",
            "                  ■        #          ■■■    ■■",
            "P                 ■",
            "■■■■■             ■             ■■■■■",
            "    ■             ■",
            "    ■             ■",
            "    ■            ■■■",
            "    ■            ■■■",
            "    ■   #       ■■■■■",
            "    ■■■■■■■■■■□■■■■■■■□■",
        ],
        13: [
            "       ■■■■",
            "       ! ■                                                              #",
            " P       ■",
            "■■■      ■         F",
            "  ■■     ■  1     ■■",
            "  ■■■■■  ■  ■■■   ■■                   ...    #",
            "      ■  ■  ■■■■■■■#■■■■             ■■■■■■■                              #",
            "      ■■ ■                         ■■■■■■■■■■",
            "      ■  ■                                 ■■■■■",
            "      ■ ■■               ■■  ■■■■■■■■■■       ■■■",
            "      ■  ■               ■                    ■■■",
            "      ■■ ■■              ■                            ■>>>>>>>>>",
            "      ■   ■        ■     ■      ■■■  ■■■■<<<<<<<<<■■■■■■■■■■■■■■",
            "      ■. .■        ■     ■■■■■■",
            "      ■■ ■■        ■                                                   ■■■■",
            "      ■   ■        ■                                                   ■",
            "      ■  .■                                                            ■",
            "      ■ ■■■  ■■■■                                                      ■",
            "      ■      ■■■■    ... F                                            1■",
            "      ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■            ■■■■■■■■■■■",
        ],
        14: [
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■        !!!         `        ■",
            "■                   3         ■",
            "■                  ■  ■■■■■■  ■            #",
            "■                  `  ```■    ■",
            "■P                       ■  ■■■",
            "■■■■ *  *■■■ *  *        ■    ■",
            "■                        ■■■  ■",
            "■                        ■    ■",
            "■                        ■  ■■■",
            "■                        ■       F",
            "■3    F■       #         ■■■■■■■■■",
            "■■■■■■■■",
            "■",
            "■                             #",
            "■   #                                        □□□",
            "■                 ■■□                        ■■■",
            "■",
            "■",
            "■",
        ],
        15: [
            "■                                  ■■■■■■■",
            "■                                  !!!   ■          #",
            "■                                        ■ 1   F",
            "■                                        ■■■■■■■",
            "■                                        ■",
            "■  P               #     2  F         3  ■",
            "■■■■>>>>>>>>>>           ■■■■■ *  *■■■■■■■          *",
            "             ■           `````     ``````",
            "             ■",
            "      3  ■4  ■",
            "      ■■■■■■■■           #                  #       #",
            "      ```````",
            "   2",
            "■■■■■■■■■■■■■■",
            "        !!!!!■.......                  #       *",
            "             ■■■■■■■■",
            "              `````",
            "                                            #   *",
            "   4           F  1",
            "■■■■■■■□■■□■■□■■■■■■■                            ■■■■",
        ],
        16: [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■",
            "■P",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
        ],
        17: [
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■                                                     ■■■",
            "■■■■■■■■■■■",
            "■■■■■■■■■■■",
            "■■■■■■■■■■■                                                 ■■■■■■■",
            "■■■■■■■■■■■                          ■■■■■■■■■■            ■■■■■■■■",
            "                                   ■■■        ■■■■■■■■■■■■■■■■■■■■■",
            "                                  ■■                  ■■■■■■■■■■■■■",
            "P                                                         ■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■  * *      * *",
            "                                                        #",
        ],
        18: [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "                        *",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "              !!!                ````  ■■",
            "                                        ■ ■■",
            "                    *   F   *    ....   ¯ ■",
            " P  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■■■■■",
            "         #",
        ],
        19: [
            "                         ■■■■■■■■■■□",
            "                         ■         ■",
            "                                   ■",
            "                             F *   ■",
            "                           ■■■     ■",
            "                           ■ ■     ■",
            "                           ■ ■     ■                   ■■■■■■■■■",
            "                           ■ ■     ■                   ■",
            "                           ■ ■     ■                   ■",
            "                           ■ ■     ■                   ■■      ■",
            "                           ■ ■     ■                    ■      ■",
            " P                         ■ ■     ■                    ■■    ■■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■□■ ■    *■     *  *     *      ■    ■",
            "■■■■■                        ■     ■  *        *     *  *■■  ■■",
            "                             ■     ■                         ■",
            "                             ■     ■                        ■■",
            "                             ■                                *",
            "                             ■>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
        ],
        20: [
            "                            #",
            "                                 #",
            "                       #",
            "",
            "",
            "                   #",
            "",
            "",
            "                                                           ■■■■■■■■",
            "",
            "                                        #",
            "",
            "                                                          >>>>>>>>>",
            "",
            "                                              #",
            "",
            "P",
            "■■■■■>>>>>>>>>>>>>>>>>>>>>□",
            "",
            "",
            "",
            "",
            "                                     &",
            "",
            "",
            "                                                    &",
        ],
        21: [
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■                                                          ■■■■■■■■■■■■■■■■■■■■■",
            "■                                                          ■",
            "■                                                          ■",
            "■                                                          ■",
            "                                                           ■",
            " P                                                         ■",
            "■■                                                         ■",
            "■■                                                         ■",
            "■■■                                                        ■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■□■",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
        ],
        22: [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            " P",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
        ],
        23: [
            "",
            "",
            "",
            "",
            "                                                    #",
            "",
            "",
            "                        #                  ",
            "                            ■             ■                #",
            "            ■■■■            ■             ■*",
            "                            ■  ■  *       ■                  ■■",
            "                ꜛꜛꜛꜛ           ■    ■     ■                   ■■■■■■■■■■■■■■■■■■■■■■■■■",
            "     *        * ■■■■           ■ ■■ ■ ■■  ■     ■■    ■■      ■■",
            " P     >>>>>    ■■■■■  F■■       ꜛꜛ   ■■      F ■■  # ■■      ¯¯ ꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛ",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "                                                           #",
        ],
        24: [
            "                                                                ■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "                                                                !!!!!!!!!!!!!!!!!!!!!!!!!!!!",
            "",
            "                                                          F",
            "      F                   ■■■■■         ■■■■■         ■■■■■■■",
            "1  ■■■■■■                 `````         ■````     F   ``````■",
            "■■■■!!!!■■        ■■■■■■         ■■■>>         ■■■■■        ■",
            "                  ■1   ■  .      `````    .    `````        ■",
            "                  ■■■■ ■  ■■■■■         ■■■■■         #     ■",
            "               #  ```` `  `````         `````               ■",
            "                                 ■■■■■         ■■■■■        ■",
            "                                 `````         `````        ■",
            "                                        ■■■>>               ■   ■■■                 ■■",
            "       ■                                ````■               ■           ■■",
            "      ■    ■■       *       *                  ■■■■■        ■                  ■■",
            " P   ■  F  ■■ *                                             ■         ■     ■",
            "■■■■■■■■■■■■■■■■■■■■■■■  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "",
        ],
        25: [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            " P",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
        ],
        26: [
            "                                                #",
            "",
            "",
            "",
            "",
            "                                                #",
            "",
            "                                 ■□■",
            "",
            "",
            "■■■■■■■                                #        #",
            "■P    ■",
            "■■■■■ ■                                  ■   ■",
            "                                         ■   ■■■■■■",
            "                              ■□■        ■        ■■■■",
            "                                         ■           ■■■■             ■■■■■",
            "■>>>>>>>>>>        ■■■                   ■■■■■■         ■■■■■■■■■■     ■■■■",
            "                        F                     ■■■■",
            "            #      ■■■■■■■■■□■                   ■■■■      ■■■■■      ■■",
            "                                                    ■■■■■■        ■■■■■",
        ],
        27: [
            "                                                #",
            "",
            "                     ■■■",
            "                     !!!   ■2   *                        ■",
            "                           ■■■                           ■",
            "                                         #    ■2         ■",
            "                               *  ■□■         ■■■■■■■■■  ■",
            "                                                      ■  ■",
            "                                                      ■  ■",
            "                                *                     ■  ■",
            "■■■■■■■                                               ■  ■",
            "■P        #                                #          ■  ■",
            "■■■■  ■             .   .                             ■  ■",
            "                    ■   ■                             ■  ■       ■■",
            "                    ■   ■   #                         ■  ■       !■",
            "                    ■   ■                             ■  ■        ■",
            "■>>>>>>>>>>>>>>□■   ■  ■■                 #           ■  ■        ■■■",
            "                    `   `                                         ■■■",
            "                       F                              >>>>■■",
            "            #        ■■■■■■■■■■■■□■                              ■■",
            "                                                             #",
        ],
        28: [
            "                                                 ■",
            "                   ■■■■■■■■                      ■",
            "                   ``````■■                      ■",
            "                         ■■  ■■■                 ■",
            "                         ■■  ■■■                 ■",
            "                         ■■  ■■■              3  ■",
            "                         ■■  ■■■             ■■■■■■■■■■■■■■■■■■■■■■■■■",
            "                         ■■  ■■■   #     #   ■■■``                   ■",
            "                   ■     ■■  ■■■             ■■■2                    ■",
            "                   ■     ■■  ■■■             ■■■■■■■■■■■■■■■■■■■■■■■■■",
            "■■■■■■■■■■■■■■■■■□■■   ■□■■  ■■■             ■■■!!!!!!!!!!!!!!!!!!!!!!",
            "■P                   ■■■■■■  ■■■      #      ■■■",
            "■■■■■■■■■.■.■.■.■.■.■■ !!■■  ■■■             ■■■",
            "!!!!!!!!!■ ■ ■ ■ ■ ■     ■■  ■■■             ■■■",
            "         ! ! ! ! ! !     ■■  ■■■             ■■■",
            "                         ■■  ■■■   #     #   ■■■",
            "                        ■■■..■■■             ■■■  ■",
            "  ■                       ■■■■■■             ■■■",
            "3                       F2                   ■■■4 F",
            "■■■■■■■■■          ■■■■■■■■■■■■■4            ■■■■■■■■■■■■■■■■■■■■■■■■■□                                 ",
        ],
        29: [
            '',
            '4 F             .               .    F',
            '■■■■■<<      <<■■■>>    <<<<   ■■   ■■       ■',
            '             !!!!!!!    !!!!        ■        ■',
            '                                    ■     #  ■',
            '                                    ■        ■',
            '                                    ■        ■',
            '                                    ■        ■',
            '                                    ■      * ■',
            '                                    ■        ■',
            '                                    ■        ■',
            '                                    ■#       ■',
            '                                    ■        ■',
            '■■■■■■■                          4  ■        ■',
            '■P    ■                       * ■■■■■■         ',
            '■■■■■ ■■              *   ■■    ■■■■■■         ',
            '■      ■          ■■    ■■■■    ■■■■■■         ',
            '■               ■■■■    ■■■■    ■■■■■■  #      ',
            '■         ..  ■■■■■■    ■■■■    ■■■■■■         ',
            '■>>>>>>>>>■■■■■■■■■■    ■■■■    ■■■■■■■■■■■■■■■',
            ''
        ],
        30: [
            "                          ■",
            "                          ■",
            "                          ■",
            "                          ■",
            "                          ■■■■■■■■■■■■■■■■■■■■■■■",
            "                          !!!!!!!!!!!!!!!!!!!!!!!■■■■■■■■",
            "                                                 !!!!!!!!■■■■■■■■",
            "                                                         !!!!!!!!■■■■■■■■",
            "                                                                 !!!!!!!!■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "    ■■■■■■                                                               !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
            "    ■■■■■■",
            "   ■■■                 F",
            "   ■■■ ■■■           ■■■■■■■■■■■■   ■■■■■■■■    ■■■■■■    ■■■■    ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
            "       ■■■           ■",
            "■      ■■■           ■           ...        ....      ....    ....",
            "■      ■■■           ■           ■■■        ■■■■      ■■■■    ■■■■",
            "■P   ■□■ ■      ■■■■□■",
            "■■■■■■■■ ■■■■■■■■■■■■■",
        ],
        31: [
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■",
            "■P",
            "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
        ],
    },
    //Level messages
    levelMessages: {
        1:  "Getting Out",
        2:  "Getting Out",
        3:  "Getting Out",
        4:  "The Stadium",
        5:  "The Stadium",
        6:  "The Stadium",
        7:  "The Stadium",
        8:  "The Stadium",
        9:  "The Stadium",
        10: "The Stadium",
        11: "The Audit",
        12: "Lab Testing",
        13: "Lab Testing",
        14: "Lab Testing",
        15: "Lab Testing",
        16: "The Path to Freedom",
        17: "The Path to Freedom",
        18: "Backrooms",
        19: "Backrooms",
        20: "Backrooms",
        21: "Outside",
        22: "Outside",
        23: "Outside",
        24: "Outside",
        25: "Outside",
        26: "Skyline City Limits",
        27: "Skyline City Limits",
        28: "Skyline City Limits",
        29: "Skyline City Limits",
        30: "Skyline City Limits",
    },
};

//Stores images in cache
for (var img in images) {
    resetMatrix();
    scale(width / 600, height / 400);
    pushStyle();
    cache.images[img] = images[img]();
    popStyle();
}

//Function for displaying images
var displayImage = function(id, x, y, w, h) {
    image(
        cache.images[id],
        x, y,
        w === undefined ? cache.images[id].width : w,
        h === undefined ? cache.images[id].height : h
    );
};

//Function for rect-circle collisions
var RCInt = function (circle, rect) {
    var distX = Math.abs(circle.x - rect.x - rect.w / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.r)) { return false; }
    if (distY > (rect.h / 2 + circle.r)) { return false; }

    if (distX <= (rect.w / 2)) { return true; } 
    if (distY <= (rect.h / 2)) { return true; }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return dx * dx + dy * dy <= circle.r * circle.r;
};
//Function for rect-rect collisions
var RRInt = function(rect1, rect2) {
    return rect1.x < rect2.x + rect2.w &&
           rect1.x + rect1.w > rect2.x &&
           rect1.y < rect2.y + rect2.h &&
           rect1.y + rect1.h > rect2.y;
};
/**CREDIT TO BOB LYON**/
//Function to rotate a point
var RP = function (cx, cy, angle, p) {
  var s = sin(angle);
  var c = cos(angle);

  // translate point back to origin:
  p.x -= cx;
  p.y -= cy;

  // rotate point
  var xnew = p.x * c - p.y * s;
  var ynew = p.x * s + p.y * c;

  // translate point back:
  p.x = xnew + cx;
  p.y = ynew + cy;
  return p;
};

var coords2Points = function (x1, y1) {
    var i, j, points = [];
    for (i = j = 0; i < arguments.length; j++) {
        points[j] = {
            x: arguments[i++],
            y: arguments[i++]
        };
    }
    return points;
};
    
var rotatePoint = function (x, y, theta, sine) {
    var cosine = theta;
    if (sine === undefined) {
        cosine = cos(theta);
        sine = sin(theta);
    }
    return {
        x: cosine * x + sine * y,
        y: -sine * x + cosine * y
    };
};
    
var rectangleMode = function (mode) {
    if (mode !== undefined) {
        rectangleMode.mode = mode;
    }
    return rectangleMode.mode;
};
    
var rect2Points = function (x, y, w, h, theta) {
    var p;
    if (rectangleMode.mode === CORNERS) {
        w -= x;
        h -= y;
    }
    if (theta) {
        var cosine = cos(-theta);
        var sine = sin(-theta);
        if (rectangleMode.mode === CENTER) {
            w /= 2;
            h /= 2;
            p = [
                rotatePoint(-w, -h, cosine, sine),
                rotatePoint(+w, -h, cosine, sine),
                rotatePoint(+w, +h, cosine, sine),
                rotatePoint(-w, +h, cosine, sine)
            ];
        } else {
            p = [
                {
                    x: 0,
                    y: 0
                },
                rotatePoint(w, 0, cosine, sine),
                rotatePoint(w, h, cosine, sine),
                rotatePoint(0, h, cosine, sine)
            ];
        }
        for (var i = 0; i < p.length; i++) {
            p[i].x += x;
            p[i].y += y;
        }
    } else if (rectangleMode.mode === CENTER) {
        w /= 2;
        h /= 2;
        p = coords2Points(x - w, y - h, x + w, y - h, x + w, y + h, x - w, y + h);
    } else {
        p = coords2Points(x, y, x + w, y, x + w, y + h, x, y + h);
    }
    return p;
};
    
var isBetween = function (c, a, b) {
    return (a - c) * (b - c) <= 0;
};
    
var isInRect = function (x, y, rx, ry, w, h, theta) {
    if (theta) {
        var p = rotatePoint(x - rx, y - ry, theta);
        x = p.x + rx;
        y = p.y + ry;
    }
    if (rectangleMode.mode === CORNERS) {
        w -= rx;
        h -= ry;
    } else if (rectangleMode.mode === CENTER) {
        rx -= w / 2;
        ry -= h / 2;
    }
    return isBetween(x, rx, rx + w) && isBetween(y, ry, ry + h);
};
    
var overlap = function (a, b, c, d) {
    return isBetween(c < d ? c : d, a, b) || isBetween(a < b ? a : b, c, d);
};
    
var SAT = function (poly1, poly2) {
    var polys = [
            poly1,
            poly2
        ];
    var project = function (poly, axis) {
        var mn = Infinity;
        var mx = -Infinity;
        for (var i = 0; i < poly.length; i++) {
            var dot = poly[i].x * axis.x + poly[i].y * axis.y;
            mx = max(mx, dot);
            mn = min(mn, dot);
        }
        return {
            min: mn,
            max: mx
        };
    };
    var getAxes = function (poly) {
        var axes = [];
        for (var i = 0; i < poly.length; i++) {
            var n = (i + 1) % poly.length;
            axes[i] = {
                y: poly[i].x - poly[n].x,
                x: -(poly[i].y - poly[n].y)
            };
        }
        return axes;
    };
    for (var p = 0; p < polys.length; p++) {
        var axes = getAxes(polys[p]);
        for (var i = 0; i < axes.length; i++) {
            var axis = axes[i];
            var p1 = project(poly1, axis);
            var p2 = project(poly2, axis);
            if (!overlap(p1.min, p1.max, p2.min, p2.max)) {
                return false;
            }
        }
    }
    return true;
};
    
var RRInt2 = function (x1, y1, w1, h1, theta1, x2, y2, w2, h2, theta2) {
    if (theta1 === 0 && theta2 === 0) {
        if (rectangleMode.mode === CORNERS) {
            w1 -= x1;
            h1 -= y1;
            w2 -= x2;
            h2 -= y2;
        } else if (rectangleMode.mode === CENTER) {
            x1 -= w1 / 2;
            y1 -= h1 / 2;
            x2 -= w2 / 2;
            y2 -= h2 / 2;
        }
        return overlap(x1, x1 + w1, x2, x2 + w2) && overlap(y1, y1 + h1, y2, y2 + h2);
    } else {
        return SAT(rect2Points(x1, y1, w1, h1, theta1), rect2Points(x2, y2, w2, h2, theta2));
    }
};
/**CREDIT TO BOB LYON**/
//Keycode
var keys = {};
keyPressed = function () {
    keys[keyCode] = keys[key.toString().toLowerCase()] = true;
};
keyReleased = function () {
    keys[keyCode] = keys[key.toString().toLowerCase()] = false;
};

var time = function (data) {
    var minutes = floor(data / 3600);
    var seconds = ((data / 60) % 60).toFixed(2);
    if (seconds < 10) { seconds = "0" + seconds; }
    if (minutes < 10) { minutes = "0" + minutes; }
    return minutes + ":" + seconds;
};

//Object constructors for every ingame object:
var window;
var blocks = [];
var Block = function (x, y, img) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.draw = function() {
        if (!window.view(this)) { return; }
        displayImage(img, this.x, this.y, this.w, this.h);
    };
};
var bouncies = [];
var Bouncy = function (x, y, test) {
    this.x = x;
    this.y = y - 2;
    this.w = 20;
    this.h = 22;
    this.animation = 0;
    this.draw = function() {
        //Draw and animate bouncy
        if (!window.view(this)) { return; }
        if (this.animation > 0) { this.animation -= 1.1; }
        this.animation = constrain(this.animation, 0, 20);
        displayImage(test ? 'bouncy-top-2' : 'bouncy-top', this.x, this.y - this.animation / 1.8 - 4, 20, 3.5);
        stroke(test ? color(0, 0, 0) : color(196, 196, 196));
        strokeWeight(1);
        //Lines to keep the top from flying off
        line(this.x, this.y + 2, this.x + this.w - 1, this.y - this.animation / 1.8 - 2);
        line(this.x + this.w, this.y + 2, this.x + 1, this.y - this.animation / 1.8 - 2);
        displayImage(test ? 'bouncy-2' : 'bouncy', this.x, this.y + 2, this.w, 20);
    };
};
var wheels = [];
var Wheel = function (x, y, r, img) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.draw = function() {
        imageMode(CENTER);
        pushMatrix();
        translate(this.x, this.y);
        rotate(-frameCount * 1.5);
        displayImage(img, 0, 0, this.r * 3, this.r * 3);
        popMatrix();
        imageMode(CORNER);
    };
};
var slabs = [];
var Slab = function (x, y) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 9;
    
    this.draw = function() {
        displayImage('slab', this.x, this.y, this.w, this.h + 1);
    };
};
var flags = [];
var Flag = function (x, y) {
    this.x = x;
    this.y = y - 10;
    this.w = 20;
    this.h = 30;
    this.complete = false;
    this.draw = function() {
        if (this.complete) {
            displayImage('flag-2', this.x, this.y, this.w, this.h);
            return;
        }
        displayImage('flag-1', this.x, this.y, this.w, this.h);
    };
};
var spikes = [], spikeTime = 0;
var Spike = function (x, y, orient) {
    this.x = x;
    this.y = y;
    this.w = 20; this.h = 20;
    this.up = false;
    this.time = spikeTime * 3;
    spikeTime++;
    switch (orient) {
        case LEFT:
            this.set = {
                x: this.x + 20,
                y: this.y
            };
        break;
        case RIGHT:
            this.set = {
                x: this.x - 20,
                y: this.y
            };
        break;
        case UP:
            this.set = {
                x: this.x,
                y: this.y + 20
            };
        break;
        case DOWN:
            this.set = {
                x: this.x,
                y: this.y - 20
            };
        break;
    }
    
    this.draw = function() {
        if (!window.view(this)) { return; }
        if (this.up) {
            displayImage('spike', this.x, this.y, this.w, this.h);
        }
        else {
            displayImage('spike', this.set.x, this.set.y, this.w, this.h);
        }
        this.up = (frameCount - this.time) % 180 <= 90;
    };
};
var DownSpike = function (x, y, test) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 2;
    this.up = true;
    
    this.draw = function() {
        displayImage(test ? 'downspike-2' : 'downspike', this.x, this.y, this.w, this.h + 8);
    };
};
var UpSpike = function (x, y, test) {
    this.x = x;
    this.y = y + 10;
    this.w = 20;
    this.h = 10;
    this.up = true;
    
    this.draw = function() {
        displayImage(test ? 'upspike-2' : 'upspike', this.x, this.y, this.w, this.h);
    };
};
var movers = [];
var Mover = function (x, y, dir) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    //Direction
    this.dir = dir;
    
    this.draw = function() {
        pushMatrix();
        translate(this.x, this.y);
        /*Dont want to have to bother creating another mover image for left
        movement, so just flip the image lengthwise*/
        if (this.dir === LEFT) {
            translate(this.w, 0);
            scale(-1, 1);
        }
        displayImage('mover', 0, 0, this.w, this.h);
        popMatrix();
    };
};
var crushers = [];
var Crusher = function (x, y, test) {
    //Original y position
    this.oy = y;
    this.x = x + (cache.level !== 30 ? 5 : 0);
    this.y = y;
    this.w = cache.level !== 30 ? 10 : 20;
    this.h = cache.level !== 30 ? 2 : 15;
    //Fallback stop position is 400
    this.stop = 400;
    
    this.initialize = function () {
        //Loop through array of blocks to find block to stop at
        for (var i = 0; i < blocks.length; i++) {
            //Check if block and this have same x position
            if (blocks[i].x !== this.x - (cache.level !== 30 ? 5 : 0)) { continue; }
            /*We are looking for the closest block that has a y greater
            than our original y, so continue if block does not fit our
            specifications*/
            if (blocks[i].y > this.stop) { continue; }
            if (blocks[i].y < this.y) { continue; }
            //If closest, set new stop position
            this.stop = blocks[i].y;
        }
        //If no blocks work, go through bouncies next
        if (this.stop === 400) {
            for (var i = 0; i < bouncies.length; i++) {
                //Check if block and this have same x position
            if (bouncies[i].x !== this.x - 5) { continue; }
            /*We are looking for the closest bouncy that has a y greater
            than our original y, so continue if bouncy does not fit our
            specifications*/
            if (bouncies[i].y > this.stop) { continue; }
            if (bouncies[i].y < this.y) { continue; }
            //If closest, set new stop position
            this.stop = bouncies[i].y;
            }
        }
        this.initialized = true;
    };
    
    this.draw = function () {
        if (this.y > this.oy) {
            displayImage(test ? 'crusher-top-2' : 'crusher-top', this.x - (cache.level !== 30 ? 5 : 0), this.oy, this.w + (cache.level !== 30 ? 10 : 0), this.y - this.oy);
        }
        displayImage(test ? 'crusher-2' : 'crusher', this.x - (cache.level !== 30 ? 5 : 0), this.y, this.w + (cache.level !== 30 ? 10 : 0), this.h + (cache.level !== 30 ? 20 : 5));
    };
    
    this.update = function () {
        if (!this.initialized) { this.initialize(); }
        //If player intersects this crusher's y slice, make it fall!
        if (RRInt(player, { x: this.x, y: 0, w: this.w, h : 400 })) {
            this.falling = true;
        }
        //If crusher has his stop location, stop falling
        if (this.y + this.h + (cache.level !== 30 ? 18 : 5) >= this.stop) {
            this.falling = false;
        }
        //Handles speed
        if (this.falling) {
            this.y += 3;
        }
        else {
            this.y--;
        }
        //Keep y within constraints
        this.y = constrain(this.y, this.oy, this.stop - this.h - (cache.level !== 30 ? 18 : 5));
    };
};
/**BASED ON TRIG AND FORCES/THEKHAN TEAM**/
var pendulums = [];
var Pendulum  = function (ox, oy, armLength) {
    this.origin = new PVector(ox, oy);
    this.armLength = armLength;
    this.position = new PVector();
    this.angle = PI/4;
    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    
    // Arbitrary ball radius
    this.ballRadius = 48.0;      
    this.dragging = false;
    
    this.draw = function() {
        // Polar to cartesian conversion
        this.position = new PVector(
           this.armLength * sin(this.angle),
           this.armLength * cos(this.angle));
        this.position.add(this.origin);
        stroke(0, 0, 0);
        strokeWeight(2);
        // Draw the arm
        line(this.origin.x, this.origin.y, this.position.x, this.position.y);
        fill(175, 175, 175);
    };
    
    this.update = function () {
        // Arbitrary constant
        var gravity = 0.2;
        this.aAcceleration = (-1 * gravity / this.armLength) * sin(this.angle);
        // Increment velocity
        this.aVelocity += this.aAcceleration;
        // Increment angle
        this.angle += this.aVelocity;
    };
};
/**BASED ON TRIG AND FORCES/THEKHAN TEAM**/
var teleporters = [], tId = 0;
var Teleporter = function (x, y, sync, test) {
    this.x = x;
    this.y = y - 10;
    this.w = 20;
    this.h = 30;
    //Number to link to
    this.sync = sync;
    //Unique ID for each teleporter
    this.id = tId;
    tId++;
    this.animation = 0;
    this.color = [255, 0, 0];
    if (this.sync === 2) {
        this.color = [255, 255, 0];
    }
    if (this.sync === 3) {
        this.color = [0, 255, 0];
    }
    if (this.sync === 4) {
        this.color = [0, 0, 255];
    }
    this.initialize = function () {
        //Loop through array of teleporters
        for (var i = 0; i < teleporters.length; i++) {
            //Find sister teleporter
            if (teleporters[i].sync === this.sync &&
                teleporters[i].id !== this.id) {
                //Set teleportation coordinates
                this.tx = teleporters[i].x;
                this.ty = teleporters[i].y + 10;
                //Save that teleporter's array index for later use
                this.alt = i;
                this.initialized = true;
                //Break the loop
                return;
            }
        }
        //If cannot find a teleporter to sync to, just bring player to his last checkpoint
        this.tx = player.start.x - 40;
        this.ty = player.start.y;
        this.initialized = true;
    };
    
    this.draw = function () {
        if (this.animation) {
            noStroke();
            fill(this.color[0], this.color[1], this.color[2], this.animation * 5);
            rect(this.x, 0, this.w, this.y + this.h);
        }
        displayImage(test ? 'teleporter-2' : 'teleporter', this.x, this.y, this.w, this.h);
    };
    
    this.update = function () {
        //Initialize ONCE
        if (!this.initialized) { this.initialize(); }
        //Handles animation
        this.animation--;
        this.animation = constrain(this.animation, 0, Infinity);
    };
};
var Player = function (x, y) {
    //Checkpoint position
    this.start = {
        x: x,
        y: y,
    };
    //Tracking past positions
    this.past = {
        1: { x: x, y: y },
        2: { x: x, y: y },
        3: { x: x, y: y },
        4: { x: x, y: y },
        5: { x: x, y: y },
    };
    //Normal position
    this.x = x;
    this.y = y;
    //When level is complete
    this.complete = Infinity;
    //Velocity
    this.vx = 0;
    this.vy = 0;
    //Width and height
    this.w = 20;
    this.h = 20;
    //Jumping?
    this.jumping = false;
    //Bouncing?
    this.bouncing = false;
    //Speed
    this.speed = 3.5;
    //Under a slab?
    this.underSlab = false;
    //Amount of flow
    this.flowAmount = 0;
    //Flow threshhold
    this.threshhold = 20;
    //Flowing?
    this.flowing = false;
    //Works with movers
    this.offset = 0;
    //WASD or Arrow Keys getters
    Object.defineProperty(this, "left", {
        get: function() {
            return keys[LEFT] || keys.a;
        }
    });
    Object.defineProperty(this, "right", {
        get: function() {
            return keys[RIGHT] || keys.d;
        }
    });
    Object.defineProperty(this, "up", {
        get: function() {
            return keys[UP] || keys.w;
        }
    });
    Object.defineProperty(this, "down", {
        get: function() {
            return (keys[DOWN] || keys.s) && !this.jumping && !this.underSlab;
        }
    });
    Object.defineProperty(this, "canFlow", {
        get: function() {
            var correctLevel = cache.level > 2 && cache.level !== 17;
            if (this.flowAmount > this.threshhold) {
                return correctLevel;
            }
            return this.flowing && correctLevel;
        }
    });
    Object.defineProperty(this, "flow", {
        get: function() {
            return this.canFlow && (keys[SHIFT] || keys[" "]);
        }
    });
    
    //FUNCTION FOR ALL INGAME COLLISIONS!
    this.applyCollisions = function (vx, vy) {
        if (!vx && !vy) { return; }
        //Apply block collisions
        for (var i = 0; i < blocks.length; i++) {
            if (!window.view(blocks[i])) { continue; }
            if (!RRInt(blocks[i], this)) { continue; }
            var block = blocks[i];
            if (vx < 0) {
                this.vx = 0;
                this.x = block.x + block.w;
            } //From left
            if (vx > 0) {
                this.vx = 0;
                this.x = block.x - this.w;
            } //From right
            if (vy < 0) {
                this.vy = 0;
                this.y = block.y + block.h;
            } //From bottom
            if (vy > 0) {
                this.vy = 0;
                this.y = block.y - this.h;
                this.jumping = false;
                this.bouncing = false;
            } //From top
        }
        //Apply bouncy collisions
        for (var i = 0; i < bouncies.length; i++) {
            if (!window.view(bouncies[i])) { continue; }
            if (!RRInt(bouncies[i], this)) { continue; }
            var bouncy = bouncies[i];
            if (vy < 0) {
                this.vy = 0;
                this.y = bouncy.y + bouncy.h;
            } //From bottom
            if (vy >= 0) {
                this.y = bouncy.y - this.h;
                var extra = this.flowing ? 2 : 0;
                this.vy = this.up ? -10.55 + extra : -6;
                this.jumping = true;
                this.bouncing = true;
                bouncies[i].animation = 20;
            } //From top
        }
        //Apply wheel collisions
        for (var i = 0; i < wheels.length; i++) {
            if (!RCInt(wheels[i], this)) { continue; }
            this.reset();
        }
        //Apply slab collisions
        for (var i = 0; i < slabs.length; i++) {
            if (this.down) { break; }
            if (vx === 0) { break; }
            if (!window.view(slabs[i])) { continue; }
            if (!RRInt(this, slabs[i])) { continue; }
            this.underSlab = true;
        }
        //Apply flag collisions
        for (var i = 0; i < flags.length; i++) {
            if (!window.view(flags[i])) { continue; }
            if (!RRInt(flags[i], this)) { continue; }
            if (flags[i].complete) { continue; }
            flags[i].complete = true;
            this.start = {
                x: flags[i].x,
                y: flags[i].y
            };
        }
        //Apply spike collisions
        for (var i = 0; i < spikes.length; i++) {
            if (!window.view(spikes[i])) { continue; }
            if (!spikes[i].up) { continue; }
            if (!RRInt(this, spikes[i])) { continue; }
            this.reset();
        }
        //Apply mover collisions
        for (var i = 0; i < movers.length; i++) {
            if (!window.view(movers[i])) { continue; }
            if (!RRInt(movers[i], this)) { continue; }
            var mover = movers[i];
            this.offset = mover.dir === LEFT ? -2 : 2;
            if (vx < 0) {
                this.vx = 0;
                this.x = mover.x + mover.w;
            }
            if (vx > 0) {
                this.vx = 0;
                this.x = mover.x;
            }
            if (vy < 0) {
                this.vy = 0;
                this.y = mover.y + mover.h;
            } //From bottom
            if (vy > 0) {
                this.vy = 0;
                this.y = mover.y - this.h;
                this.jumping = false;
                this.bouncing = false;
                if (this.left) {
                    this.offset--;
                }
                if (this.right) {
                    this.offset++;
                }
            } //From top
            
        }
        //Apply crusher collisions
        for (var i = 0; i < crushers.length; i++) {
            if (!window.view(crushers[i])) { continue; }
            if (!RRInt(crushers[i], this)) { continue; }
            this.reset();
        }
        //Apply teleportation
        for (var i = 0; i < teleporters.length; i++) {
            if (!window.view(teleporters[i])) { continue; }
            if (!RRInt(teleporters[i], this)) { continue; }
            teleporters[i].animation = 30;
            try {
                teleporters[teleporters[i].alt].animation = 30;
            }
            catch (e) {}
            this.x = teleporters[i].tx + 40;
            this.y = teleporters[i].ty;
            this.vx = 0;
            this.vy = 0;
        }
    };
    
    //Draws player
    this.draw = function () {
        if (this.flow) {
            for (var i in this.past) {
                if (this.down || this.underSlab) {
                    displayImage('runner-flow-trail', this.past[i].x, this.past[i].y + 10, this.w, 10);
                }
                else {
                    displayImage('runner-flow-trail', this.past[i].x, this.past[i].y, this.w, this.h);
                }
            }
            if (this.down || this.underSlab) {
                displayImage('runner-flow', this.x, this.y + 10, this.w, 10);
                return;
            }
            displayImage('runner-flow', this.x, this.y, this.w, this.h);
            return;
        }
        if (this.down || this.underSlab) {
            displayImage('runner-normal', this.x, this.y + 10, this.w, 10);
            return;
        }
        displayImage('runner-normal', this.x, this.y, this.w, this.h);
    };
    
    //Updates player
    this.update = function () {
        if (this.left) {
            this.vx -= 0.3;
            if (!this.flowing) {
                this.flowAmount += 0.23;
            }
        }
        else if (this.right) {
            this.vx += 0.3;
            if (!this.flowing) {
                this.flowAmount += 0.23;
            }
        }
        //Slow down if no left or right
        if (!this.left && !this.right) {
            this.vx *= 0.8;
        }
        if (Math.abs(this.vx) < 1 && !this.flow) { 
            this.flowAmount -= 2.5;
        }
        if (this.flow && this.flowAmount > 1) {
            this.flowAmount -= 0.5;
            this.flowing = true;
        }
        else {
            this.flowing = false;
        }
        if (this.up && !this.jumping && !this.down) {
            this.vy -= 3;
            this.jumping = true;
        }
        if (this.up && this.vy < 0 && !this.bouncing) {
            this.vy -= 0.11;
        }
        if (this.down) {
            this.speed *= 0.95;
        }
        else {
            this.speed = this.underSlab && !this.flowing ? 0.8 : 3.5;
        }
        if (this.flow) {
            this.vx = constrain(this.vx, -this.speed * 3 + this.offset, this.speed * 3 + this.offset);
        }
        else {
            this.vx = constrain(this.vx, -this.speed + this.offset, this.speed + this.offset);
        }
        this.jumping = true;
        this.x += this.vx + this.offset;
        this.underSlab = false;
        this.offset = 0;
        this.applyCollisions(this.vx, 0);
        this.y += this.vy;
        this.applyCollisions(0, this.vy);
        if (this.y > 400) {
            this.reset();
        }
        if (frameCount % 4 === 0) {
            for (var i = 5; i > 1; i--) {
                this.past[i] = {
                    x: this.past[i - 1].x,
                    y: this.past[i - 1].y,
                };
            }
            this.past[1] = {
                x: this.x,
                y: this.y,
            };
        }
        this.vy += 0.2;
        //Go to next level if past max X
        if (this.x > this.complete) {
            cache.load();
        }
    };
    
    this.reset = function () {
        this.x = this.start.x;
        this.y = this.start.y;
        this.vx = 0;
        this.vy = 0;
        this.flowAmount = 0;
        this.offset = 0;
    };
};
//You
player = new Player(0, 0);

//Object containing transformation data
window = {
    x: 300 - player.x,
    left: -Infinity,
    apply: function() {
        //Applies window
        this.x = constrain(300 - player.x, this.left, 0);
        translate(this.x, 0);
    },
    get display() {
        //Returns an area object containing the windows dimensions
        return {
            x: -this.x,
            y: 0,
            w: 600,
            h: 400
        };
    },
    view: function(that) {
        //Returns if the window can see the object
        if (that instanceof Wheel) { return RCInt(this.display, that); }
        return RRInt(this.display, that) || that.x < 0;
    },
};
//Function that parses a level array of strings into a level
cache.load = function (string) {
    //If last level, do nothing
    if (this.levels[this.level + 2] === undefined) {
        end = true;
        endTime = daTime;
    }
    if (this.levels[this.level + 1] === undefined) {
        daTime = 0;
        this.level = 0;
        end = false;
        frameCount = 0;
        endTime = 0;
        done = 0;
    }
    //Add one to the current stage
    this.level++;
    //Clear all arrays
    blocks = [];
    bouncies = [];
    slabs = [];
    wheels = [];
    flags = [];
    spikes = [];
    movers = [];
    crushers = [];
    pendulums = [];
    teleporters = [];
    //Reset ID counters
    spikeTime = 0;
    tId = 0;
    //In testing rooms?
    var test = cache.level > 11 && cache.level < 16 && !end;
    //Special variable to figure out length of level
    var longest = "";
    //Special function to parse a single character
    var evaluate = function (data) {
        switch (data) {
            case "□":
                bouncies.push(new Bouncy(row * 20, col * 20, test));
            break;
            case "■":
                blocks.push(new Block(row * 20, col * 20, test ? 'block-2' : 'block'));
            break;
            case "¯":
                slabs.push(new Slab(row * 20, col * 20));
            break;
            case "&":
                wheels.push(new Wheel(row * 20, col * 20 - 30, 120, test ? 'wheel-2' : 'wheel'));
            break;
            case "#":
                wheels.push(new Wheel(row * 20, col * 20 + 30, 40, test ? 'wheel-2' : 'wheel'));
            break;
            case ">":
                movers.push(new Mover(row * 20, col * 20, RIGHT));
            break;
            case "U":
                //pendulums.push(new Pendulum(row * 20, col * 20 - 20, 100));
            break;
            case "`":
                spikes.push(new DownSpike(row * 20, col * 20, test));
            break;
            case ".":
                spikes.push(new UpSpike(row * 20, col * 20, test));
            break;
            case "!":
                crushers.push(new Crusher(row * 20, col * 20, test));
            break;
            case "<":
                movers.push(new Mover(row * 20, col * 20, LEFT));
            break;
            case "*":
                wheels.push(new Wheel(row * 20, col * 20 + 30, 20, test ? 'wheel-2' : 'wheel'));
            break;
            case "ꜛ":
                spikes.push(new Spike(row * 20, col * 20, UP));
            break;
            case "ꜜ":
                spikes.push(new Spike(row * 20, col * 20, DOWN));
            break;
            case "￫":
                spikes.push(new Spike(row * 20, col * 20, RIGHT));
            break;
            case "￩":
                spikes.push(new Spike(row * 20, col * 20, LEFT));
            break;
            case "P":
                player.start = {
                    x: row * 20,
                    y: col * 20
                };
                player.reset();
            break;
            case "F":
                flags.push(new Flag(row * 20, col * 20));
            break;
            case " ":
                
            break;
            default:
                if (!isNaN(parseInt(data, 10))) {
                    teleporters.push(new Teleporter(row * 20, col * 20, parseInt(data, 10), test));
                }
            break;
        }
    };
    //Some special stuff for level 10 *wink*
    if (cache.level === 10) {
        for (var i = 0; i < 400; i += 20) {
            blocks.push(new Block(-40, i, 'block'));
        }
        blocks.push(new Block(-20, 240, 'block'));
    }
    if (string) {
        for (var col = 0; col < string.length; col++) {
            //Calculates longest row in level
            if (string[col].length > longest.length) {
                longest = string[col];
            }
            //Loops through rows
            for (var row = 0; row < string[col].length; row++) {
                //Evaluate every character
                evaluate(string[col].charAt(row));
            }
        }
    }
    else {
        //Loops through columns
        for (var col = 0; col < this.levels[this.level].length; col++) {
            //Calculates longest row in level
            if (this.levels[this.level][col].length > longest.length) {
                longest = this.levels[this.level][col];
            }
            //Loops through rows
            for (var row = 0; row < this.levels[this.level][col].length; row++) {
                //Evaluate every character
                evaluate(this.levels[this.level][col].charAt(row));
            }
        }
    }
    //Calculate window ending
    window.left = longest.length * -20 + 600;
    //Calculate when the player passes the level
    player.complete = longest.length * 20;
    //Reset screen cool white burst thingy
    if (this.level > 1) {
        this.transparency = 255;
    }
};

cache.load(); //Load the first level

var exitPath = function () {
    if ((frameCount > 240 || cache.level !== 1) && !paused) {
        daTime++;
    }
    background(0, 0, 0);
    pushMatrix();
    window.apply();
    if (cache.level > 11 && cache.level < 16) {
        background(240, 240, 240);
        stroke(255, 255, 255);
        strokeWeight(1);
        for (var y = 20; y < 400; y += 15) {
            line(0, y, player.complete, y);
        }
        for (var x = 20; x < player.complete; x += 15) {
            line(x, 0, x, 400);
        }
    }
    if (cache.level > 20 && cache.level < 31) {
        background(64, 64, 64);
        pushMatrix();
        //Place buildings every 300 blocks until level end
        for (var k = 0; k < player.complete; k += 300) {
            fill(k % 600 === 0 ? color(32, 32, 32) : color(180, 180, 180));
            stroke(192, 192, 192);
            rect(200, 100, 90, 300);
            rect(300, 200, 50, 200);
            fill(k % 600 === 0 ? color(0, 0, 0) : color(32, 32, 32));
            rect(120, 320, 70, 80);
            fill(k % 600 === 0 ? color(192, 192, 192) : color(220, 220, 220));
            for (var j = 0; j < 2; j++) {
                for (var i = 0; i < 7; i++) {
                    rect(210 + 40 * j, 110 + 40 * i, 30, 30);
                }
            }
            for (var i = 0; i < 5; i++) {
                rect(312.5, 210 + 35 * i, 25, 25);
            }
            translate(300, 0);
        }
        popMatrix();
    }
    if (cache.art[cache.level]) {
        pushStyle();
        cache.art[cache.level]();
        popStyle();
    }
    for (var crusher = 0; crusher < crushers.length; crusher++) {
        crushers[crusher].draw();
        if (!paused) {
            crushers[crusher].update();
        }
    }
    for (var bouncy = 0; bouncy < bouncies.length; bouncy++) {
        bouncies[bouncy].draw();
    }
    for (var spike = 0; spike < spikes.length; spike++) {
        spikes[spike].draw();
    }
    for (var block = 0; block < blocks.length; block++) {
        blocks[block].draw();
    }
    for (var wheel = 0; wheel < wheels.length; wheel++) {
        wheels[wheel].draw();
    }
    for (var mover = 0; mover < movers.length; mover++) {
        movers[mover].draw();
    }
    for (var pendulum = 0; pendulum < pendulums.length; pendulum++) {
        pendulums[pendulum].draw();
        if (!paused) {
            pendulums[pendulum].update();
        }
    }
    for (var teleporter = 0; teleporter < teleporters.length; teleporter++) {
        teleporters[teleporter].draw();
        teleporters[teleporter].update();
    }
    for (var flag = 0; flag < flags.length; flag++) {
        flags[flag].draw();
    }
    //Level 17 animation stuff
    if (cache.level === 17) {
        if ((done === 0) ||
        (done === 1 && frameCount < 10) ||
        (done === 2 && frameCount < 10) ||
        (done === 3 && frameCount < 30) ||
        (done === 4 && frameCount < 5))
        {
            noStroke();
            for (var i = 0; i < 150; i++) {
                fill(300 - i * 2, 300 - i * 2, 300 - i * 2);
                rect(i, 300, 1, 60);
            }
            fill(0, 0, 0);
            rect(0, 0, player.complete, 300);
            rect(0, 360, player.complete, 40);
        }
        if (player.x > 800 && !done) {
            done++;
            frameCount = 0;
        }
        if (done === 1 && frameCount >= 10) {
            done++;
            frameCount = 0;
        }
        if (done === 2 && frameCount >= 10) {
            done++;
            frameCount = 0;
        }
        if (done === 3 && frameCount >= 30) {
            done++;
            frameCount = 0;
        }
        if (done === 4 && frameCount >= 5) {
            done++;
            frameCount = 0;
        }
    }
    if ((frameCount > 240 || cache.level !== 1) && !paused) {
        player.update();
    }
    player.draw();
    for (var slab = 0; slab < slabs.length; slab++) {
        slabs[slab].draw();
    }
    if (end) {
        pushStyle();
        fill(128, 128, 128);
        stroke(64, 64, 64);
        strokeWeight(1);
        rect(100, 100, 400, 200);
        rect(600, 100, 400, 200);
        fill(255, 255, 255);
        textFont(createFont("Arial Bold"));
        textSize(30);
        textAlign(CENTER, CENTER);
        text("CONGRATULATIONS", 300, 130);
        text("HIGH SCORES", 800, 130);
        textFont(createFont("Arial"));
        fill(196, 196, 196);
        textSize(15);
        textAlign(CENTER, TOP);
        text("You have successfully completed the Khan Academy version of Exit Path. Save this as a spinoff as proof of your time!", 120, 155, 360, Infinity);
        textSize(12);
        fill(64, 64, 64);
        for (var i = 0; i < highscores.length; i++) {
            textAlign(LEFT, TOP);
            var h = highscores[i];
            text((i + 1) + ': ' + h.name + ' (' + h.score + ')', 620 + i * 200 - floor(i / 2) * 400, 150 + floor(i / 2) * 25);
        }
        textAlign(CENTER, TOP);
        textFont(createFont("Arial Bold"));
        textSize(22);
        fill(255, 255, 255);
        text("YOUR TIME:", 300, 210);
        textSize(40);
        text(time(endTime), 300, 230);
        textSize(15);
        text('(' + endTime + ' frames)', 300, 275);
        textFont(createFont("Arial"));
        popStyle();
    }
    popMatrix();
    fill(255, 255, 255, cache.transparency);
    rect(0, 0, player.complete, 400);
    if (!end) {
        var test = cache.level > 11 && cache.level < 16;
        fill(230, 230, 230);
        textFont(createFont("Arial"), 12);
        textAlign(RIGHT, TOP);
        text("Stage " + cache.level + "\n" + cache.levelMessages[cache.level], 595, 3);
        textFont(createFont("Arial"), 35);
        fill(test ? color(0, 0, 0) : color(200, 200, 200));
        text(time(daTime), 595, 360);
    }
    textFont(createFont("Arial Bold"), 10);
    cursor(ARROW);
    textAlign(LEFT, TOP);
    textSize(11);
    fill(128, 128, 128);
    if (mouse.over(10, 190, textWidth("Pause"), 11)) {
        fill(255, 255, 255);
        cursor(HAND);
    }
    text("Pause", 10, 190);
    fill(128, 128, 128);
    if (mouse.over(10, 205, textWidth("Skip Stage"), 11)) {
        fill(255, 255, 255);
        cursor(HAND);
    }
    text("Skip Stage", 10, 205);
    if (mouse.clickOn(10, 190, textWidth("Pause"), textHeight()) && (cache.level !== 1 || frameCount > 240)) {
        paused = !paused;
    }
    if (mouse.clickOn(10, 205, textWidth("Skip Stage"), textHeight()) && (cache.level !== 1 || frameCount > 240) && cache.levels[cache.level + 1]) {
        daTime += 7200;
        cache.load();
    }
    textFont(createFont("Arial"), 12);
    player.flowAmount = constrain(player.flowAmount, 0, player.threshhold * 4);
    if (cache.level > 2 && cache.level !== 17) {
        fill(196, 196, 196);
        textAlign(RIGHT, TOP);
        text("FLOW", 142, 8);
        stroke(0, 0, 0);
        strokeWeight(0.5);
        noFill();
        rect(150, 8, 300, 22);
        noStroke();
        fill(player.flowAmount > player.threshhold || player.flowing ? color(255, 255, 255) : color(196, 196, 196));
        rect(150, 8, 300 / (player.threshhold * 4) * player.flowAmount, 22);
        fill(32, 32, 32);
        rect(150, 8, 75, 10);
        rect(150, 28, 75, 3);
        rect(235, 18, 215, 13);
        triangle(225, 8, 225, 18, 235, 8);
        triangle(235, 18, 235, 30, 222.5, 30);
        stroke(128, 128, 128);
        line(225, 8, 225, 30);
        if (player.flowAmount > player.threshhold || player.flowing) {
            fill(255, 255, 255);
            textAlign(LEFT, TOP);
            textSize(11);
            text("FLOW READY (HOLD SPACE BAR)", 235, 20);
        }
    }
    if ( cache.level === 1 && frameCount <= 270) {
        if (frameCount <= 240 && cache.level !== 17) {
            textSize(50);
            textAlign(CENTER, CENTER);
            pushMatrix();
            translate(300, 200);
            if (frameCount <= 60) {
                scale(1 + Math.sin(frameCount / 60));
                fill(255, 255, 255, frameCount * 255 / 60);
                text("3", 0, 0);
            }
            else if (frameCount <= 120) {
                scale(1 + Math.sin((frameCount - 60) / 60));
                fill(255, 255, 255, (frameCount - 60) * 255 / 60);
                text("2", 0, 0);
            }
            else if (frameCount <= 180) {
                scale(1 + Math.sin((frameCount - 120) / 60));
                fill(255, 255, 255, (frameCount - 120) * 255 / 60);
                text("1", 0, 0);
            }
            else {
                scale(1 + Math.sin((frameCount - 180) / 60));
                fill(255, 255, 255, (frameCount - 180) * 255 / 60);
                text("GO!", 0, 0);
            }
            popMatrix();
        }
    }
    cache.transparency -= cache.transparency < 0 ? 0 : 5;
    //Peg the transparency between 0 and 255
    cache.transparency = peg(cache.transparency);
};

var menu = function () {
    background(128, 128, 128);
    cursor(ARROW);
    textAlign(CENTER, TOP);
    textSize(100);
    fill(50, 135, 50);
    text("Exit Path", 300, 10);
    button(100, 150, 400, 100, "Play");
};

var create = function () {
    
};

draw = function() {
    if (gamestate === "logo") { logo(600); }
    if (gamestate === "presenting") { PRESENTING(); }
    if (gamestate === "game") { exitPath(); }
    if (gamestate === "menu") { menu(); }
    if (gamestate === "create") { create(); }
    mouse.clicking = false;
};

var begin = function() {this[["KAInfiniteLoopSetTimeout"][0]](40000);}; begin();


score('Lionofgd', '4:31.65');
score('Arongil', '18:01.80');
score('FUSION BLAST', '29:36.52');
score('Iron Man Mark 44', '9:58.72');
score('#1 Suicune Pro...', '20:00.00');
score('J#$H', '6:16.58');
score('Kirigaya Kazuto', '4:16.07');
score('Frustrated Pro...', '11:41.00');
score('dovakin50', '4:24.65');
score('Master Beef', '7:37.05');
score('IzzyF', '7:59.58');
score('#1B12P', '15:22.47');
score('Eli Tolman', '5:25.10');
score('Jevan Soh', '7:29.98');
score('Yosef Simnegar', '13:57.20');
score('yjz2002', '7:54.00');
score('NeonByte', '7:46.27');
score('Quantum Analyzer', '10:39.12');
score('lincolnpepper111', '7:22.42');
score('Jett Burns', '5:23.53');
score('Damien McNeff', '15:29.15');
score('Tarakanath Peddi', '47:08.28');
score('The Blue Ninja', '8:38.37');
score('Yaya0926', '8:29.72');
score('Gleam of Dawn', '7:50.92');
score('Jonny (The Peppa King)', '6:56.15');
//2900 lines!!!!!!
