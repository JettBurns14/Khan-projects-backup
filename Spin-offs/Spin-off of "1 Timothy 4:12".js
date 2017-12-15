// Link:  https://www.khanacademy.org/cs/spin-off-of-1-timothy-412/5692283497349120
// Created:  08/21/2015 13:48




/**

1 Timothy 4:12 (NIV) -
"Don’t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity."


This is a spin-off of "love is...".

**/


textFont(createFont("Franklin Gothic Medium"));
textSize(90);
fill(0, 0, 0);
text("D", 7, 100);    // the giant "DON'T"
text("O", 60, 100);
text("N", 110, 100);
text("'T", 163, 100);


fill(0, 164, 173);
textSize(47);
text("let", 237, 63);   // "let"


fill(0, 255, 179);
text("anyone", 236, 99);    // "anyone"


fill(87, 223, 230);
textSize(22);
text("LOOK DOWN ON YOU", 188, 124);    // "look down on you"

noStroke();
textSize(17);
fill(0, 164, 173);
rect(17, 127, 371, 35);
fill(252, 252, 252);
text("BEACUSE YOU ARE", 19, 150);   // "because you are"...
textSize(40);
text("YOUNG,", 165, 157);   // "young"


fill(0, 0, 0);
textSize(38);
text("but set an", 77, 191);    // "but set an"...
fill(0, 255, 179);
text("example", 246, 191);      // "example"


textSize(27);
fill(87, 223, 230);
text("for believers", 20, 216);     // "for believers"

textSize(109);
stroke(0, 0, 0);
noFill();
rect(175, 194, 146, 100);
fill(0, 164, 173);
textSize(18);
text("IN SPEECH,", 200, 210);   // "in speech"
text("IN CONDUCT,", 200, 230);  // "in conduct"
text("IN LOVE,", 200, 250);     // "in love"
text("IN FAITH,", 200, 270);    // "in faith"
text("AND IN PURITY.", 200, 290); // "and in purity"

textSize(43);
fill(0, 0, 0);
text("1 TIMOTHY 4:12", 18, 350);    // verse reference
textSize(13);
text("(NIV)", 323, 332);            // Bible version used

stroke(0, 0, 0);
line(20, 365, 380, 365);    // line underneath "1 Timothy 4:12"
