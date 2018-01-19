// Link:  https://www.khanacademy.org/computer-programming/shadows/5147778416771072
// Created:  11/17/2015 12:49





noStroke();
for (var i = 0; i < 30; i++) {
        fill(0, 0, 0, 10);
        ellipse(88, 34,(i*i)/5,(i*i)/23);
}
for (var i = 0; i < 22; i++) {
    rect(260, 185, i*i/5, i*i/5);
    rect(281, 277, i*5, i*5);
    rect(230, 277, 50, i*5);
    rect(i+147, 325, i*3, 55);
    rect(i*2, 325, 50, 50);
    rect(20, i*2+218, 50, 50);
}
    for (var i = 0; i < 22; i++) {
    stroke(255, 0, 0);
    line(i*1+87, i*2+150, i*10, i*2+150);
}

/*
var shadow = function(x, y, w, h) {
    noStroke();
    for (var i = 0; i < 17; i++) {
        fill(0, 0, 0, 10);
        ellipse(x, y,(i*i)/w,(i*i)/h);
    }
};
*/
