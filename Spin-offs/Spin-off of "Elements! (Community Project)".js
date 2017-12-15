// Link:  https://www.khanacademy.org/cs/spin-off-of-elements-community-project/5782990732001280
// Created:  07/30/2015 08:04




//Other versions: http://www.kongregate.com/games/N0V1CE/the-interactive-periodic-table-of-the-elements

//I've been programming 30 months, and I have learned ~70% of Intro to JS (pretty much everything EXCEPT object oriented code), ~65% of Intro to HTML and CSS.
//WARNING: THIS MAY LAG/CRASH SOMETIMES!!!
/*

INSTRUCTIONS

Click on an element to read up info on it.
Click on the "x" in the top right corner to close the popup.
Click 'n' drag to read a portion of the text at a much higher textSize, move your mouse Up and Down to control what you read.

*/
/**HELP NEEDED: 
   If you are willing to help, please submit an entry in the Comments section for a particular element.
   Your entry must have:

 * At least 2 paragraphs
 * No more than 400 characters
 * Proper grammar and spelling!
 * The element's Weight, Density, and Atomic Radius at the end. (on separate lines)

 * AND must be written by you.

   Thank you.
*/

/** 
 * Changelog
 * 
 * v1.0.0 a- Created the expanding pop-up "thing".
 * v1.0.1 a- Added info on Hydrogen
 * v1.0.2 a- Did elements up to Neon
 * v1.0.3 a- Added info on Helium and Lithium.
 * v1.0.4 a- Did elements up to Xenon
 * v1.0.5 a- Added info on Beryllium, Boron, and Carbon
 * v1.0.6 a- Started development on Element Finder
 * v1.0.7 a- Completed periodic table of elements
 * v1.0.8 a- Element Finder in beta stage
 * v1.0.9 a- Added Nitrogen, Oxygen, Neptunium, and Plutonium
 * v1.1.0 a- Added Chromium and Molybdenum
 * v1.1.1 a- Added the Spinning Credits
 * v1.1.2 a- Added Small text, and tiny text
 * v1.1.3 a- Added Zoom into text function
 * v1.1.4 b- INTO BETA!
 * v1.1.5 b- Debugged Element Finder
 * v1.1.6 b- Added the changelog (:P)
 * v1.1.7 b- Added Americanium and Medivelium
 * v1.1.8 b- Added Sodium
 * v1.1.9 b- Another Credit (not element) Box!!! Part 1 & 2!
 * v1.2.0 b- Changed the "Credits" from flipping to bouncing in textSize.
 * v1.2.1 b- Added Californium
 * v1.2.2 b- Added Magnesium, Calcium, and Actinium
 * v1.2.3 b- Converted "bouncing credits" from the flucuating textSize to flucuating in scale, much less lag.
 * v1.2.4 b- Made expansion of boxes much smoother, less lag. Changed textSize to scale. :)
 * v1.2.5 b- Added iron and fixed Americanium
 * v1.2.6 b- Added palladium, arsenic, silver, rutherfordium, and Terbium
 * v1.2.7 b- Fixed the click and drag to show a fraction of text instead of pieces of 200.
 * v1.2.8 b- Added Tungsten
 * v1.2.9 b- Credits screen now shows amount contributed and how many more elements to go.
 * v1.3.0 b- Added Technetium and Lanthanum
 * v1.3.1 b- Added Polonium, Gold, Lawrencium, Nobelium and Radium
 */ 


var lessLag = false;
var lesserLag = false;
var fancyBackground = true;
var fancyMouse = false;

//Variables for the "Find the element" Game.
var elements = [];
var findIt = 0;
var findProtons = 0;
var gotIt = false;
var game = false;
var start = 0;
var end = 0;
//By the way, if you got it under 1000 ms (PRO), 1500 ms (Advanced), 2000 ms (Intermediate), 3000 ms (Beginner), 5000 ms (...), 10 seconds (erm), a minute (Lag??), or 2 minutes (I got a problem now)
//Fyi, those for for da lols^ :P

var providers = ["Thomas Li (Novice Programming)", "Δανιαλ Αημαδ", "The #1 Elongated Head(s)", "molybdenum42", "Chromium", "sydney.moore", "Ajay.Balaje", "Trodo Proudfoot", "Elements", "Jett Burns", "WhiteShadow786 (Team Teeny)"];
var providen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/*
 * Types:
 * 
 * 1- Alkali metals
 * 2- Alkali earth metals
 * 3- Transition metals
 * 4- Ordinary metals
 * 5- Metalloids
 * 6- Nonmetals
 * 7- Halogens
 * 8- Noble Gases
 * 9- Lanthanides
 * 10-Actinides
 * 
 */
frameRate(30);
//Selects element to be expansioned. NaN = Not a Number, basically like undefined or null.
var selectedElement = NaN;
var expansion = {
    state: 0,
    expansion: 0,
    expand: 0,
    contract: 0,
    show: 0,
};
{
var angle = 0;
var mp = false;
var particles = 6;
var atom = function(x, y, size){
    translate(x, y);
    scale(size);
    for(var i=0; i<particles+1; i++){noStroke();fill(200, 200, 200, 100);ellipse(0+(cos(angle+(i*(360/particles)))*6), 0+(sin(angle+(i*(360/particles)))*4), 12, 12);fill(255, 0, 0, 100);ellipse(0+(cos(angle+(i*(360/particles)))*4), 0+(sin(angle+(i*(360/particles)))*6), 7, 7);fill(0, 255, 255, 100);
        if((i*4) >= 12){ellipse(0+(cos(angle+(i*90)))*8, 0+(sin(angle+(i*75))*15), 5, 5);}else{ellipse(0+(cos(angle+(i*(360/(particles)))))*12, 0+(sin(angle+(i*(360/(particles))))*9), 5, 5);}}
    resetMatrix();
};
}//Code copied from Thomas Li (Novice Programming)'s Graphics (Yes, just in case someone flags me)
{
var main = true;
var main2 = 0.1;
var fm = function(){
    return main2;
}; //flucuate
var flucuate = function(){
    if(main){
        main2 *= 1.1;
        if(main2 >= 10){
            main = false;
        }
    }else{
        main2 /= 1.1;
        if(main2 <= 0.1){
            main = true;
        }
    }
};}//Code copied from Thomas Li (Novice Programming)'s Cells (Heh heh, this is getting silly)
var giveData = function(comment, datapoint){
    if(datapoint !== 8){
        return "Information provided by: " + providers[datapoint] + comment + " (" + providen[datapoint] + ")";
    }else{
        return providers[datapoint] + comment + " (" + providen[datapoint] + ")";
    }
};
var element = function(x, y, type, name, symbol, info, PROTONS, smallText, provider){
    
    if(findProtons === PROTONS){
        findIt = name;
    }
    
    if(frameCount - 5 === PROTONS){
        elements.push(name);
    }
    if(smallText === undefined || info === ""){
        smallText = false;
    }
    if(provider === undefined){
        provider = "Thomas Li (Novice Programming)";
        if(info === ""){
            provider = "Elements";
        }
    }
    if(info === ""){
        //Adds asterix to string if there isn't any infomation.
        name += "*";
        symbol += "*";
    }
    
    
    
    //Add the "amount contributed" ONCE!
    if(frameCount === 30){
        for(var i = 0; i < providers.length; i++){
            if(providers[i] === provider){
                providen[i] ++;
                break;
            }
        }
    }
    //Reset it if it is repeated
    if(frameCount === 29){
        providen = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    
    //Color
    switch(type){
            case NaN:
                fill(255, 255, 0);
            break;
            case 1:
                fill(0, 115, 0);
            break;
            case 2:
                fill(0, 255, 0);
            break;
            case 3:
                fill(0, 170, 170);
            break;
            case 4:
                fill(185, 60, 0);
            break;
            case 5:
                fill(255, 140, 0);
            break;
            case 6:
                fill(125, 50, 0);
            break;
            case 7:
                fill(255, 153, 0);
            break;
            case 8:
                fill(255, 15, 15);
            break;
            case 9:
                fill(0, 70, 255);
            break;
            case 10:
                fill(125, 160, 255);
            break;
        }
    stroke(0, 0, 0);
    if(selectedElement === PROTONS){
        rect(x - (x * expansion.expansion) + (50 * expansion.expansion), y - (y * expansion.expansion) + (50 * expansion.expansion), 20 + (280 * expansion.expansion), 20 + (280 * expansion.expansion), (10 * expansion.expansion));
        if(expansion.state !== 3){
            fill(0, 0, 0);
            var pushX = x+10 - ((x+10) * expansion.expansion) + (200 * expansion.expansion);
            var pushY = y+10 - ((y+10) * expansion.expansion) + (200 * expansion.expansion);
            //textSize(17 - (symbol.length * 3) + (expansion.expansion * pushX));
            resetMatrix();
            var scaling = expansion.expansion * 10;
            scale(scaling);
            textSize(25 - (symbol.length * 3));
            text(symbol, pushX / scaling, pushY / scaling);
            resetMatrix();
        }
    }
    //TEXT!!!
    if(expansion.state === 0){
        switch(type){
            case NaN:
                fill(255, 255, 0);
            break;
            case 1:
                fill(0, 115, 0);
            break;
            case 2:
                fill(0, 255, 0);
            break;
            case 3:
                fill(0, 170, 170);
            break;
            case 4:
                fill(185, 60, 0);
            break;
            case 5:
                fill(255, 140, 0);
            break;
            case 6:
                fill(125, 50, 0);
            break;
            case 7:
                fill(255, 153, 0);
            break;
            case 8:
                fill(255, 15, 15);
            break;
            case 9:
                fill(0, 70, 255);
            break;
            case 10:
                fill(125, 160, 255);
            break;
        }
        stroke(0, 0, 0);
        rect(x, y, 20, 20);
        textSize(17 - (symbol.length * 3));
        fill(0, 0, 0);
        
        text(symbol, x + 10, y + 10);
        //Check if mouse is on element square
        if(mouseX >= x && mouseX <= (x + 20) && mouseY >= y && mouseY <= (y + 20)){
            if(expansion.state === 0){
                fill(255, 255, 255, 150);
                rect(x, y, 20, 20);
                if(game && mouseIsPressed){
                    if(round(findProtons) === round(PROTONS)){
                        if(!gotIt){   //Don't update when you got it if you won already.
                            end = millis();
                        }
                        gotIt = true; //Set winning variable
                    }else{
                        noStroke();
                        fill(255, 0, 0, 100);
                        rect(x + fm() / 2, y + fm() / 2, 20 - fm(), 20 - fm());
                    }
                }
            }
            if(mp && !game){
                selectedElement = PROTONS;
                expansion.state = "START";
            }
        }
    }else if(selectedElement === PROTONS || expansion.expansion <= 0.5){
        fill(0, 0, 0, expansion.show);
        if(provider.length >= 3){
            textSize(15 / (provider.length / 14));
            textAlign(RIGHT, CENTER);
            text("- " + provider, 345, 340);
            textAlign(LEFT, CENTER);
        }else{
            textAlign(RIGHT, CENTER);
            textSize(8);
            text("- " + "Thomas Li (Novice Programming)", 345, 340);
            textAlign(LEFT, CENTER);
        }
        textSize(35);
        textAlign(LEFT, CENTER);
        text(name, 60, 75);
        textSize(12);
        if(smallText === "Tiny"){
            textSize(7);
        }else if(smallText){
            textSize(10);
        }else{
            textSize(12);
        }
        if(mouseIsPressed){
            textSize(15);
            text(("  " + info + "\n\nAtomic Number: " + PROTONS).substring(info.length*mouseY/400, (400 * info.length) / mouseY), 60, 125, 290, 205);
        }else{
            text(("  " + info + "\n\nAtomic Number: " + PROTONS), 60, 95, 290, 260);
        }
        var typeName = "";
        //The element's type, numbers that represent them are at the top.
        textSize(12);
        switch(type){
            case NaN:
                typeName = "";
            break;
            case 1:
                typeName = "Alkali Metal";
            break;
            case 2:
                typeName = "Alkali Earth Metal";
            break;
            case 3:
                typeName = "Transition Metal";
            break;
            case 4:
                typeName = "Ordinary Metal";
            break;
            case 5:
                typeName = "Metalloid";
            break;
            case 6:
                typeName = "Nonmetal";
            break;
            case 7:
                typeName = "Halogen";
            break;
            case 8:
                typeName = "Noble Gas";
            break;
            case 9:
                typeName = "Lanthanide";
            break;
            case 10:
                typeName = "Actinide";
            break;
        }
        text(typeName, 65, 95);
        if(info === ""){
            textAlign(CENTER, CENTER);
            text("Sorry! This element has no information\nyet, but feel free to add\nan entry in the comments.\nThey're 118 elements after all!", 200, 200);
        }
    }
};
var mousePressed = function(){
    mp = true;
};
var draw = function() {
    textFont(createFont("monospace"));
    textAlign(CENTER, CENTER);
    background(255, 255, 255);
    if(fancyBackground){
        atom(200, 200, 12);
    }
    angle += 3;
    fill(0, 0, 0);
    textSize(35);
    text("The Periodic\nTable of Elements", 200, 74);
    textSize(12);
    text("*No information", 300, 379);
    textSize(15);
    text("Coded by Thomas Li (Novice Programming)", 200, 120);
    element(20, 130, NaN, "Hydrogen", "H", "Hydrogen is a highly flammable\ngas at room temperature that was\ndiscovered in 1776 by Henry Cavendish\nand named by Antoine Lavoisier in 1783.\nIts most common compound is water which\nis the most important molecule to life.\n\n   Hydrogen also what powers our sun\nto create light and heat. It is\nconverted into helium and energy in the\nSun's core.\n\nAtomic weight: 1.00794\nDensity: 0.000899\nAtomic Radius: 53pm", 1);
    element(360, 135, 8, "Helium", "He", "Helium's nucleus by itself is the\nalpha particle, released in the\nradioactive decay of some of the heavier\nless stable elements and their isotopes\nlike uranium and thorium.\n\n   This nonreactive gas is also a great\nreplacement for hydrogen in airships.\nAs a noble gas, helium rarely reacts\nto other elements, making it quite\nstable.\n\nAtomic Weight: 4.002602\nDensity: 0.0001785\nAtomic Radius: 31pm", 2);
    element(20, 155, 1, "Lithium", "Li", "Lithium is a soft, light metal. It'll\nfloat on water while steadily reacting\nwith it, releasing hydrogen because it's\nan Alkali Metal. Alkali metals will\nreact with water and release hydrogen\ngas. Lithium is used in batteries that\npower countless devices."+"\n\nAtomic Weight: 6.941\nDensity: 0.535\nAtomic Radius: 167pm", 3);
    element(40, 155, 2, "Beryllium", "Be", "Beryllium is another very light metal.\nHowever, its quite dense when compared\nto Lithium (x3 denser).\n\n   Alkali earth metal has\nmany applications because of\nits strength that comes with\nlittle weight (relatively), its\nhigh melting temperature, and\nresistance to corrosion. From missile\nand rocket parts to the windows of x-ray\ntubes, beryllium is quite a useful\nelement. However, it is very toxic\nbeing able to cause fatal lung disease.\n\nAtomic Weight: 9.012182\nDensity: 1.848\nAtomic Radius: 112pm", 4, true);
    element(260, 155, 5,"Boron", "B", "Boron is what silly putty® is made of\nand gives it is interesting properties\nof being moldable and soft in your hand,\nbut yet being bouncy when you throw it.\n\n  This element is usually used in\nbleech and softeners in its compound,\nborax.\n\n  Boron is rarely seen in pure form. Its\nextremely hard, but too brittle to be\nused for any applications' purposes.\n\nAtomic Weight: 10.8111\nDensity: 2.460\nAtomic Radius: 87pm", 5);
    element(280, 155, 6, "Carbon", "C", "Carbon is the element of life, and\nbasically what makes up most of our\nbody from DNA to proteins and all living\nthings on Earth. Without it, we wouldn't\nexist (obivously?).\n\n  Carbon is also important to us. We\nuse coal (form of carbon) to make energy\nto the graphite in our pencil to\ndiamonds! Diamonds are created when\ncarbon is heated to extremely high\ntemperatures under extremely hight\npressures! These diamonds may last\nforever, but at high enough temperatures\nthey will burn up into carbon dioxide.\n\nAtomic Weight: 12.0107\nDensity: 2.260\nAtomic Radius: 67pm", 6, true);
    element(300, 155, 6, "Nitrogen", "N", "Nitrogen is very common in our\natmostsphere, about 80%. This gas\ndoesn't do much in this form (N2), but\nit is in an important fertilizer called\nammonia.\n\n  However, nitrogen really loves\nbond with itself, after all, triple\nbonds are quite hard to break. Fritz\nHaber was a German scientist who\ndiscovered a way to make ammonia, but\nits was for war purposes and explosives,\nnot so much for agriculture.\n\nAtomic Weight: 14.0067\nDensity: 0.001251\nAtomic Radius: 56pm", 7, true);
    element(320, 155, 6, "Oxygen", "O", "Oxygen is part of the Chalcogen Group\non the Periodic Table, Oxygen is what\nmost organisms need in order to live.\nOxygen is highly reactive and is the\ncause of rust on your vehicles. Oxygen\nis also super abundant. Oxygen has an\natomic number of 8.\n\n  Oxygen is useful to us for many\nreasons. For one, it keeps us alive,\nwhich is the most important! Secondly,\noxygen is responsible for eliminating\npollutants from the atmosphere and plays\nan important role in photosynthesis.\n\nAtomic Weight: 15.9994\nDensity: 0.001429\nAtomic Radius: 48pm", 8, true, "Δανιαλ Αημαδ");
    element(340, 155, 7, "Fluorine", "F", "Fluorine is a pale yellow toxic gas\n It has the highest\nelectronegativity (4.0) and is therefore\none of the most reactive. Fluorine is a\ndiatomic molecule that appears as F₂ in\npure form. It is also a greenhouse gas\nwith warming potential 100-20000 times\nthat of carbon dioxide.\nFun Fact: Fluorite, a mineral source of\nfluorine, was used to lower the melting\npoint of metal ores.\n\nAtomic Weight: 18.9984032\nDensity: 0.001696\nAtomic Radius: 42pm", 9, false, "The #1 Elongated Head(s)");
    element(360, 155, 8, "Neon", "Ne", "Neon lights up and emits a orange glow when electricity runs though it. Interesting! In fact, most \"Neon\" light DO contain neon!\n\n  Because this is a noble gas, Neon has no valence electrons and will refuse to bond to anything!\n\nAtomic Weight: 20.1797\nDensity: 0.000900\nAtomic Radius: 38pm", 10);
    element(20, 175, 1, "Sodium", "Na", "Sodium is explosive. You may think its table salt, but that is a MUCH more stable compound (NaCl). Put sodium in water, and you will get an explosion as more hydrogen forms as sodium reacts to water. If you have to witness one, I'd suggest chucking a chunk of sodium (NOT TABLE SALT) into a river or lake at a safe distance or just search it up on Youtube! \n\nAtomic Weight: 22.989770\nDensity: 0.968\nAtomic Radius: 190pm", 11);
    element(40, 175, 2, "Magnesium", "Mg", "Magnesium is a mineral that is present in relatively large amounts in the human body. Researchers estimate that the average person's body contains about 25 grams of magnesium., and about half of it is in the bones. Magnesium is cheap, compared to other elements, at only 37 cents per gram In 1618, a farmer in England attempted to give his cows water from his well. The cows refused to drink it, because of the bitter taste. However, the farmer noticed that the water seemed to heal scratches and rashes. What he discovered is now called Magnesium.\n\n  Magnesium is a chemical element with atomic number 12.Magnesium is the ninth most abundant element in the universe, and the fourth most common element in the Earth (below iron, oxygen and silicon). It is the third most abundant element dissolved in seawater, after sodium and chlorine.", 12, true,"sydney.moore and Ajay.Balaje");
    element(260, 175, 4, "Aluminum", "Al", "", 13);
    element(280, 175, 5, "Silicon", "Si", "", 14);
    element(300, 175, 6, "Phosphorus", "P", "", 15);
    element(320, 175, 6, "Sulfur", "S", "", 16);
    element(340, 175, 7, "Chlorine", "Cl", "", 17);
    element(360, 175, 8, "Argon", "Ar", "", 18);
    element(20, 195, 1, "Potassium", "K", "", 19);
    element(40, 195, 2, "Calcium", "Ca", "This element has been known from the first century, but was not isolated until 1808 when Sir Humphry Davy was able to produce a sample of this metal. Calcium is abundant naturally, although never found in nature as a pure element. Some common forms of calcium are limestone and gypsum. Calcium is an important element in the tissues of both plants and animals. It occurs in the leaves and other tissues of plants, and in the bones and teeth of animals and humans. Calcium metal is silver and has a hard texture. It will readily oxidize when exposed to air, and is chemically active upon contact with water.\n\n  Finding examples of calcium use is not difficult. The construction industry owes much to this element since calcium compounds are essential components in concrete and mortar. Calcium is an element regularly mentioned in connection with health. Every crustacean is indebted to calcium for helping form its shell, and we rely on green leafy vegetables, which are rich in calcium, for healthy teeth and bones. Calcium also has an important role in the health and function of the nervous system.\n\nAtomic Weight: 40.08", 20, "Tiny", "Lucius (kingcodefish.com)");
    element(60, 195, 3, "Scandium", "Sc", "", 21);
    element(80, 195, 3, "Titanium", "Ti", "", 22);
    element(100, 195, 3, "Vanadium", "V", "", 23);
    element(120, 195, 3, "Chromium", "Cr", "Chromium is an extremely hard industrial-\nquality transition metal often known for its use\nin electroplating, the process in which a metal\ncoating is made by dissolving solid metal\ncations with an electric current. Due to its\nhigh durability and and luster, chromium is\nvalued strongly in industrial purposes, and is\nalso a component in stainless steel.\n\n  Discovered by Louis-Nicholas Vauquelin,\nchromium gets its name from the Latin root\nchrom, meaning color, referring to the wide\nvariety of colors of its compounds (for\ninstance, lead chromate which is yellow, chromium\noxide which is green, and ruby, which is red.)\nIt is also highly corrosion resistant, as it is\none of the four metals that do not rust.\n\nDensity: 7.15 grams per cubic centimeter\nAtomic Weight: 51.9961\nAtomic Radius: 128 pm", 24, "Tiny", "Chromium");
    element(140, 195, 3, "Manganese", "Mn", "", 25);
    element(160, 195, 3, "Iron", "Fe", "Iron is a chemical element. It is by mass the most common element on Earth, forming most of the Earth’s inner and outer core. It is the fourth most common element in the Earth’s crust. In the beginning of the 14th century, when iron was rare, some iron kitchen utensils of Edward III where classified as jewelry, and iron accessories were preferentially pursued by robbers. Iron has been known and used since prehistoric times. The writings of the most early civilizations refer to it, and there is evidence that it was known more than 7000 years ago; in China the usage of steel goes back to 2550 BC. ", 26, true, "sydney.moore");
    element(180, 195, 3, "Cobalt", "Co", "", 27);
    element(200, 195, 3, "Nickel", "Ni", "", 28);
    element(220, 195, 3, "Copper", "Cu", "", 29);
    element(240, 195, 3, "Zinc", "Zn", "", 30);
    element(260, 195, 4, "Gallium", "Ga", "", 31);
    element(280, 195, 5, "Germanium", "Ge", "", 32);
    element(300, 195, 5, "Arsenic", "As", "Arsenic occurs in many minerals, usually in conjunction with sulfur and metals, and also as a pure elemental crystal. The main use of metallic arsenic is for strengthening alloys of copper and especially lead (for example, in car batteries). A few species of bacteria are able to use arsenic compounds as respiratory metabolites. Trace quantities of arsenic are an essential dietary element in the rat, hamster, goat, chicken, and presumably many other species, including humans. However, the element can be toxic for multicellular life if present in quantities larger than needed.", 33, true, "Ajay.Balaje");
    element(320, 195, 6, "Selenium", "Se", "", 34);
    element(340, 195, 7, "Bromine", "Br", "", 35);
    element(360, 195, 8, "Krypton", "Kr", "", 36);
    element(20, 215, 1, "Rubidium", "Rb", "", 37);
    element(40, 215, 2, "Strontium", "Sr", "", 38);
    element(60, 215, 3, "Yttrium", "Y", "", 39);
    element(80, 215, 3, "Zirconium", "Zr", "", 40);
    element(100, 215, 3, "Niobium", "Nb", "", 41);
    element(120, 215, 3, "Molybdenum", "Mo", "Molybdenum is a chemical element with symbol\nMo and atomic number 42. The name is from\nNeo-Latin molybdaenum, from Ancient Greek\nΜόλυβδος molybdos, meaning lead, since its ores\nwere confused with lead ores.[5] Molybdenum\nminerals have been known throughout history, but\nthe element was discovered (in the sense of\ndifferentiating it as a new entity from the\nmineral salts of other metals) in 1778 by Carl\nWilhelm Scheele. The metal was first isolated in\n1781 by Peter Jacob Hjelm.\n\nMolybdenum does not occur naturally as a free\nmetal on Earth, but rather in various oxidation\nstates in minerals. The free element, which is a\nsilvery metal with a gray cast, has\nthe sixth-highest melting point of any element.\nIt readily forms hard, stable carbides in\nalloys, and for this reason most of\nworld production of the element (about 80%) is\nin making many types of steel alloys, including\nhigh strength alloys and superalloys.\n\nAtomic Weight: 95.94\nDensity: 10.280\nAtomic Radius: 190pm", 42, "Tiny", "molybdenum42");
    element(140, 215, 3, "Technetium", "Tc", "Technetium comes from the Greek word for artificial, technetos. Technetium was the first artificially produced element. It was isolated by Carlo Perrier and Emilio Segre in 1937. Technetium was created by bombarding molybdenum atoms with deuterons that had been accelerated by a device called a cyclotron. Small amounts of technetium can retard the corrosion of steel, although this protection can only be applied to closed systems due to technetium's radioactivity. Technetium can also be used as a medical tracer and to calibrate particle detectors.\n\nFun Fact: Technetium’s most stable isotope has a half life of about 4.2 million years!", 43, true, "sydney.moore");
    element(160, 215, 3, "Ruthenium", "Ru", "", 44);
    element(180, 215, 3, "Rhodium", "Rh", "", 45);
    element(200, 215, 3, "Palladium", "Pd", "Palladium is silvery white and can be found in Russia, Africa, and in small parts of Canada and the USA. It has a melting point of 18.28 K (2030.82 F). It was discovered by William Hyde in 1802. Palladium is used in hydrogen storage, electronics, dentistry and occasionally in coins. Palladium was named after the asteroid Pallas, itself named after Pallas Athena.", 46, false, "Trodo Proudfoot");
    element(220, 215, 3, "Silver", "Ag", "A soft, white, lustrous transition metal, it possesses the highest electrical conductivity, thermal conductivity and reflectivity of any metal. The metal occurs naturally in its pure, free form (native silver), as an alloy with gold and other metals, and in minerals such as argentite and chlorargyrite. Most silver is produced as a byproduct of copper, gold, lead, and zinc refining.\n\n  Silver has long been valued as a precious metal. More abundant than gold, silver metal has in many premodern monetary systems functioned as coinable specie, sometimes even alongside gold. In addition, silver has numerous applications beyond currency, such as in solar panels, water filtration, jewelry and ornaments, high-value tableware and utensils (hence the term silverware), and also as an investment in the forms of coins and bullion. Silver is used industrially in electrical contacts and conductors, in specialized mirrors, window coatings and in catalysis of chemical reactions. Its compounds are used in photographic film and X-rays. Dilute silver nitrate solutions and other silver compounds are used as disinfectants and microbiocides (oligodynamic effect), added to bandages and wound-dressings, catheters and other medical instruments.", 47, "Tiny", "Ajay.Balaje");
    element(240, 215, 3, "Cadmium", "Cd", "", 48);
    element(260, 215, 4, "Indium", "In", "", 49);
    element(280, 215, 4, "Tin", "Sn", "", 50);
    element(300, 215, 5, "Antimony", "Sb", "", 51);
    element(320, 215, 5, "Tellurium", "Te", "", 52);
    element(340, 215, 7, "Iodine", "I", "", 53);
    element(360, 215, 8, "Xenon", "Xe", "", 54);
    element(20, 235, 1, "Cesium", "Cs", "", 55);
    element(40, 235, 2, "Barium", "Ba", "", 56);
    element(60, 295, 9, "Lanthanum", "La", "The name Lanthanum comes from the greek word lanthaneia, which means “ to lie hidden”. Lanthanum was discovered by Carl Gustaf Mosander, a Swedish chemist, in 1839. Mosander was searching for impurities he believed existed within samples of Cerium. He treated cerium nitrate with dilute nitric acid, and found a new substance he named Lanthana. Lanthanum is one of the rare earth elements used to make carbon arc lights which are used in the motion picture industry for studio lighting and projector lights. It also makes up about 25% of Micsh metal, a material that is used to make flints for lighters.", 57, false, "sydney.moore");
    element(80, 295, 9, "Cerium", "Ce", "", 58);
    element(100, 295, 9, "Praseodymium", "Pr", "", 59);
    element(120, 295, 9, "Neodymium", "Nd", "", 60);
    element(140, 295, 9, "Promenthium", "Pm", "", 61);
    element(160, 295, 9, "Samarium", "Sm", "", 62);
    element(180, 295, 9, "Europium", "Eu", "", 63);
    element(200, 295, 9, "Gadolinium", "Gd", "", 64);
    element(220, 295, 9, "Terbium", "Tb", "Terbium is a silvery-white rare earth metal that is malleable, ductile and very hard. Terbium is never found in nature as a free element, but it is contained in many minerals, including cerite, gadolinite, monazite, xenotime and euxenite.\n\n  Swedish chemist Carl Gustaf Mosander, discovered terbium as a separate elemental compound, in 1843. He detected it as an impurity in yttrium oxide, Y2O3. Yttrium and terbium are named after the village of Ytterby in Sweden. Terbium was not isolated in pure form until the advent of ion exchange techniques.\n\n  Terbium is used to dope calcium fluoride, calcium tungstate and strontium molybdate, materials that are used in solid-state devices, and as a crystal stabilizer of fuel cells which operate at elevated temperatures. As a component of Terfenol-D (an alloy that expands and contracts when exposed to magnetic fields more than any other alloy), terbium is of use in actuators, in naval sonar systems and in sensors.\n\n  Most of the world's terbium supply is used in green phosphors. Terbium oxide is in fluorescent lamps and TV tubes. Terbium green phosphors are combined with divalent europium blue phosphors and trivalent europium red phosphors to provide \"trichromatic\" lighting technology, a high-efficiency white light used for standard illumination in indoor lighting.", 65, "Tiny", "Ajay.Balaje");
    element(240, 295, 9, "Dysprosium", "Dy", "", 66);
    element(260, 295, 9, "Holmium", "Ho", "", 67);
    element(280, 295, 9, "Erbium", "Er", "", 68);
    element(300, 295, 9, "Thulium", "Tm", "", 69 +" :P"); //lel
    element(320, 295, 9, "Ytterbium", "Yb", "", 70);
    element(340, 295, 9, "Lutetium", "Lu", "", 71);
    element(80, 235, 3, "Hafnium", "Hf", "", 72);
    element(100, 235, 3, "Tantalum", "Ta", "", 73);
    element(120, 235, 3, "Tungsten", "W", "Tungsten, also known as wolfram, is a chemical element. The word tungsten comes from the Swedish language tung sten directly translatable to heavy stone, though the name is volfram in Swedish.Naturally occurring tungsten consists of five isotopes whose half-lives are so long that they can be considered stable.In 1781, a self-made chemist and scientist, Carl Wilhelm Scheele, and Torbern Bergman, a Swedish chemist and mineralogist, suggested it might be possible to obtain a new metal buy reducing tungstic acid.\n\nFast Fact: in 1783, Jose and Fausto Elhuyar were the first to isolate tungsten through the reduction of this acid with charcoal. For this reason, they are credited with the discovery of this element.", 74, true, "sydney.moore");
    element(140, 235, 3, "Rhenium", "Re", "", 75);
    element(160, 235, 3, "Osmium", "Os", "", 76);
    element(180, 235, 3, "Irdium", "Ir", "", 77);
    element(200, 235, 3, "Platinium", "Pt", "", 78);
    element(220, 235, 3, "Gold", "Au", "Gold is a chemical element with symbol Au and atomic number 79. In its purest form, it is a bright, slightly reddish yellow, dense, soft, malleable and ductile metal. Chemically, gold is a transition metal and a group 11 element. It is one of the least reactive chemical elements, and is solid under standard conditions. The metal therefore occurs often in free elemental form, as nuggets or grains, in rocks, in veins and in alluvial deposits. It occurs in a solid solution series with the native element silver and also naturally alloyed with copper and palladium. Less commonly, it occurs in minerals as gold compounds, often with tellurium.\n\nAtomic weight: 197.0", 79, true, "Jett Burns");
    element(240, 235, 3, "Mercury", "Hg", "", 80);
    element(260, 235, 4, "Thallium", "Tl", "", 81);
    element(280, 235, 4, "Lead", "Pb", "", 82);
    element(300, 235, 4, "Bismuth", "Bi", "", 83);
    element(320, 235, 5, "Polonium", "Po", "Note: same as radium\n\nThey were found by Maria Skłodowska Curie (The fist female scientist to get a Noble Prize, and so far the only person to get 2 noble prizes.) She found both the elements at the same time. She found them because when doing experiments on a radioactive mineral. The mineral was three times more radioactive than uranium (a element part of the mineral ; already found). When she extracted the elements from the mineral, she found out about Radium and Polonium.  She named Polonium after her homeland (Poland), and she named Radium for its radioactivity. Radium is used for many things, like X-rays and glow in the dark clock. Don't worry - its radioactivity is not able to harm you in these things. Polonium is also radioactive, but it does not have so many uses.", 84, true, "WhiteShadow786 (Team Teeny)");
    element(340, 235, 7, "Astatine", "At", "", 85);
    element(360, 235, 8, "Radon", "Rn", "", 86);
    element(20, 255, 1, "Francium", "Fr", "", 87);
    element(40, 255, 2, "Radium", "Ra", "Note: same as polonium\n\nThey were found by Maria Skłodowska Curie (The fist female scientist to get a Noble Prize, and so far the only person to get 2 noble prizes.) She found both the elements at the same time. She found them because when doing experiments on a radioactive mineral. The mineral was three times more radioactive than uranium (a element part of the mineral ; already found). When she extracted the elements from the mineral, she found out about Radium and Polonium.\n\nShe named Polonium after her homeland (Poland), and she named Radium for its radioactivity. Radium is used for many things, like X-rays and glow in the dark clock. Don't worry - its radioactivity is not able to harm you in these things. Polonium is also radioactive, but it does not have so many uses.", 88, true, "WhiteShadow786 (Team Teeny)");
    element(60, 315, 10, "Actinium", "Ac", "Actinium is a soft, silvery-white radioactive metal that has a half-life of 21.7 years. It is a very powerful source of alpha rays, but is rarely used outside research. Actinium was discovered in 1899 by Andre De Debierne at Paris. He extracted it from uranium ore. Friedrich Otto Giesel independently extracted it from the same mineral, and, unaware that it was already known, gave it the name emanium.\n\nFun Fact: Actinium glows blue in the dark, because it's intense radioactivity excites the air around it.", 89, false, "sydney.moore");
    element(80, 315, 10, "Thorium", "Th", "", 90);
    element(100, 315, 10, "Protactinium", "Pa", "", 91);
    element(120, 315, 10, "Uranium", "U", "", 92);
    element(140, 315, 10, "Neptunium", "Np", "Neptunium is a radioactive element\nwith many radioisotopes with half-lives\nranging from 2.14 million years to less\nthan 50 minutes. Neptunium is often\ncreated in uranium nuclear reactions,\nand also as a byproduct of creating\nplutonium.\n\n  Neptunium has a low melting point for\na metal (636° C), a property it shares\nwith its neighbor plutonium.\nFun Fact: Uranium, Neptunium, and\nPlutonium were named after Uranus,\nNeptune, and Pluto.\n\nAtomic Weight: 237\nDensity: 20.450\nAtomic Radius: 175pm", 93, true, "The #1 Elongated Head(s)");
    element(160, 315, 10, "Plutonium", "Pu", "Plutonium is a dangerously radioactive\nelement, and the last to be found in\nnature. It has a half life\nof 80 million years.\n\n  Plutonium is used in nuclear fission,\nwhere a neutron is fired at uranium or\nplutonium and the atom is split into\nsmaller elements, releasing large\namounts of energy. The destructive power\nof this energy was used in the atomic\nbomb named 'Fat man', dropped on\nNagasaki in 1945.\nFun fact: Plutonium tarnishes from\nsilver to dark gray in air.\n\nAtomic Weight: 244\nDensity: 19.816\nAtomic Radius: 175pm", 94, true, "The #1 Elongated Head(s)");
    element(180, 315, 10, "Americium", "Am", "Americium was discovered in 1944 by the American scientists Glenn T. Seaborg, Ralph A. James, Leon O. Morgan, and Albert Ghiorso. The element was named after America, because it is located below Europium, which was named after Europe. It can be produced in kilogram quantities, and has a half life of 432.2 years.\n\nFun Fact: The researchers at first referred to americium as \"pandemonium\" owing to the difficulties they encountered trying to isolate it from another new element with which it was very closely associated, curium.", 95, false,"sydney.moore");
    element(200, 315, 10, "Curium", "Cm", "", 96);
    element(220, 315, 10, "Berkelium", "Bk", "", 97);
    element(240, 315, 10, "Californium", "Cf", "If you want to buy some Californium, you'd have to win the lottery first. To buy one gram of it, you will need $27 million! Elements at the end of the periodic table have to be created in a nuclear reactor. Californium is radioactive and toxic. Californium was discovered in 1950 by a research team at the University of California. Californium is a great neutron emitter, great for kick-starting nuclear reactors. It can make effective small scale weapons, but it's not likely to be used for full scale ones, because it is so expensive.", 98, false, "sydney.moore");
    element(260, 315, 10, "Einsteinium", "Es", "", 99);
    element(280, 315, 10, "Fermium", "Fm", "", 100);
    element(300, 315, 10, "Mendelevium", "Md", "Named after the famous scientist Dmitri Mendeleev, who was one of the people to complete the Periodic Table of the Elements. Mendelevium is a heavy element with an atomic mass of 258 AMU (Atomic Mass Unit). Mendelevium is a part of the Actinide Series and is quite Radioactive! In fact, Mendelevium was discovered through a bombardment or a mistake! Mendelevium is my favourite element right after Einsteinium! :P", 101, false, "Δανιαλ Αημαδ");
    element(320, 315, 10, "Nobelium", "No", "Nobelium is named for Alfred Nobel, the inventor or dynamite and benefactor of science. Like all elements with an atomic number over 100, nobelium can only be produced in particle accelerators by bombarding lighter elements with charged particles. A total of twelve nobelium isotopes are known to exist; the most stable one has a half-life of about 58 minutes. The first announcement of the discovery of nobelium was announced by physicists at the Nobel Institute in Sweden in 1957. The team reported that they had bombarded curium with carbon ions for twenty-five hours in half-hour intervals.", 102, true, "sydney.moore");
    element(340, 315, 10, "Lawrencium", "Lr", "Lawrencium was discovered by A. Ghioroso, T. Sikkelan, A.E. Larsh, and R.M. Latimer in March 1961. An isotope of this member of the actinide series was synthesized with a half-life of 8 seconds. In 1965, a team of scientists produced an isotope of lawrencium with a half-life of 30 seconds.\n\n  The studies that have been possible on these isotopes indicate that the properties of this element resemble the elements earlier in the actinide series rather than those closer to it in the series. Currently there is no commercial use for lawrencium.", 103, true, "Jett Burns");
    element(80, 255, 3, "Rutherfordium", "Rf", "In the 1960s, small amounts of rutherfordium were produced in laboratories in the former Soviet Union and in California. The priority of the discovery and therefore the naming of the element was disputed between Soviet and American scientists, and it was not until 1997 that International Union of Pure and Applied Chemistry (IUPAC) established rutherfordium as the official name for the element.", 104, false, "Ajay.Balaje");
    element(100, 255, 3, "Dubnium", "Db", "", 105);
    element(120, 255, 3, "Seaborgium", "Sg", "", 106);
    element(140, 255, 3, "Bohrium", "Bh", "", 107);
    element(160, 255, 3, "Hassium", "Hs", "", 108);
    element(180, 255, 3, "Meithnerium", "Mt", "", 109);
    element(200, 255, 3, "Darmstadium", "Ds", "It is an extremely radioactive synthetic element. The most stable known isotope, darmstadtium-281, has a half-life of approximately 10 seconds. Darmstadtium was first created in 1994 by the GSI Helmholtz Centre for Heavy Ion Research near the city of Darmstadt, Germany, after which it was named.  Darmstadtium is calculated to have similar properties to its lighter homologues, nickel, palladium, and platinum.", 110, false, "Ajay.Balaje");
    element(220, 255, 3, "Roentgenium", "Rg", "", 111);
    element(240, 255, 3, "Copernicium", "Cn", "", 112);
    element(260, 255, 4, "Ununtrium", "Uut", "", 113);
    element(280, 255, 4, "Flerovium", "Fl", "", 114);
    element(300, 255, 4, "Ununpentium", "Uup", "", 115);
    element(320, 255, 4, "Livermorium", "Lv", "", 116);
    element(340, 255, 7, "Ununseptium", "Uus", "", 117);
    element(360, 255, 8, "Ununoctium", "Uuo", "", 118);
    
    
    
    //These aren't an element. :P
    element(160, 155, NaN, "Credits", "Pt1", "\nCoded by: Thomas Li (Novice Programming)\nHelp with less lag by: DY (darryl-yeo.com)\n\n"+ giveData(" :P", 0) + "\n" + giveData("", 1) + "\n" + giveData("", 2) + "\n" + giveData("", 3) + "\n" + giveData("", 4) + "\n" + giveData("", 5) + "\n" + giveData("", 6) + "\n" + giveData("", 7) + "\n" + giveData(" to go:", 8) + "\n\nMore people to be added.", "THIS AIN'T AN ELEMENT!", true);
    
    
    
    element(180, 155, NaN, "Credits", "Pt2", "\nSearch Engine: GOOGLE!\nResearch: Wikipedia and similar sites\nResearch: Theodore Gray, The Elements,\n2009", "N/A", false);
    if(expansion.state === 0){
        /*textSize(8 + 1.2*fm());
        fill(0, 0, 0);
        translate(210, 130);
        rotate(25);
        //translate(-200, -200);
        //scale(1);
        //translate(200, 200);
        text("Credits", 0, 20);*/
        resetMatrix();
        textSize(10);
        rotate(25);
        translate(245, 48);
        scale(1 + fm() / 10);
        
        text("Credits", 0, 0);
        resetMatrix();
    }
    
    fill(0, 0, 0);
    textSize(8);
    textAlign(CENTER, CENTER);
    text("Element Finder: The Game", 60, 360);
    if(elements.length < 117){
        fill(255, 255, 255);
        rect(10, 370, 100, 20);
        fill(0, 0, 0, 150);
        rect(10, 370, 100 * (elements.length / 118), 20);
        textSize(7);
        fill(0, 0, 0);
        if(frameCount >= 128){
            fill(255, 0, 0);
            text("Initializing failed!", 60, 380);
            if(frameCount >= 200){
                frameCount = 0;
                elements = [];
            }
        }else{
            text("Loading elements... " + (elements.length / 1.18).toFixed(1), 60, 380);
        }
    }else{
        if(!game){
            fill(255, 255, 255);
            rect(10, 370, 100, 20);
            textSize(13);
            fill(0, 0, 0);
            text("Play!", 60, 380);
            if(mouseX >= 10 && mouseX <= 110 && mouseY >= 370 && mouseY <= 390){
                fill(0, 0, 0, 100);
                rect(10, 370, 100, 20);
                if(mp){
                    game = true;
                    mp = false;
                    start = millis();
                }
            }
        }else{
            fill(255, 255, 255);
            rect(10, 370, 100, 20);
            textSize(10);
            fill(0, 0, 0);
            if(gotIt){
                textSize(12);
                text("You found it!", 60, 380);
                textSize(8);
                text("after " + (end - start) + "ms", 60, 396);
            }else{
                text("Find "+findIt, 60, 380);
            }
        }
    }
    if(game){
        if(findIt === 0){
            findProtons = round(random(0, elements.length-1));
            if(findProtons >= 70){
                findIt = elements[findProtons-2];
            }else{
                findIt = elements[findProtons-1];
            }
        }
        if(game && mouseX >= 10 && mouseX <= 110 && mouseY >= 370 && mouseY <= 390){
            if(gotIt){
                if(mp){
                    findIt = 0;
                    findProtons = 0;
                    game = false;
                    gotIt = false;
                    mp = false;
                    end = 0;
                    start = 0;
                }
                fill(0, 255, 0);
                rect(10, 370, 100, 20);
                fill(0, 0, 0);
                text("Reset!", 60, 380);
            }else{
                if(mp){
                    findIt = 0;
                    findProtons = 0;
                    game = false;
                    gotIt = false;
                    mp = false;
                    start = 0;
                    end = 0;
                }
                fill(255, 0, 0);
                rect(10, 370, 100, 20);
                fill(0, 0, 0);
                text("Quit?", 60, 380);
            }
        }
    }
    //For the Expansion to work, multiplication and division used for smooth transitions.
    expansion.expansion = (expansion.expand - expansion.contract);
    switch(expansion.state){
        case 0:
            //Do nothing.
        break;
        case "START":
            //Expansion must be greater than zero or the expanding fails.
            expansion.expand = 1.2;
            expansion.contract = 1;
            expansion.state = 1;
            if(lesserLag){
                expansion.expand = 1.2;
                expansion.contract = 0.1;
            }
        break;
        case 1:
            //Expand!
            if(expansion.contract > 0.1){
                expansion.contract /= 1.07;
            }else{
                expansion.contract = 0.1;
                expansion.state = 2;
            }
        break;
        case 2:
            //Contract!
            if(expansion.expand > 1.1){
                expansion.expand /= 1.05;
            }else{
                expansion.expand = 1.1;
                expansion.state = 3;
            }
        break;
        case 3:
        case "FADE":
            if(expansion.state !== "FADE"){
                if(expansion.show < 255){
                    expansion.show += 5;
                }else{
                    expansion.show = 255;
                }
            }else{
                if(expansion.show > 0){
                    expansion.show -= 5;
                }else{
                    expansion.show = 0;
                    expansion.state = 4;
                    if(lessLag){
                        expansion.state = 5;
                    }
                }
            }
            fill(255, 255, 255, expansion.show);
            stroke(0, 0, 0, expansion.show);
            if(mouseX >= 315 && mouseX <= 340 && mouseY >= 60 && mouseY <= 85){
                fill(232, 232, 232, expansion.show);
                if(mp){
                    expansion.state = "FADE";
                }
            }
            rect(315, 60, 25, 25, 5);
            fill(255, 0, 0, expansion.show);
            textSize(25);
            textAlign(CENTER, CENTER);
            text("x", 327.5, 70);
        break;
        case 4:
            //Contract MORE!
            if(expansion.expand > expansion.contract){
                expansion.expand /= 1.07;
            }else{
                expansion.expand = expansion.contract;
                expansion.state = 5;
            }
        break;
        case 5:
            //Reset parameters
            expansion.state = 0;
            expansion.expand = 0;
            expansion.contract = 0;
            expansion.show = 0;
            selectedElement = NaN;
        break;
    }
    mp = false;
    flucuate();
    resetMatrix();
    //The cute atom for a mouse! :D
    
    if(fancyMouse){
        cursor("NONE");
        if(mouseIsPressed){
            atom(mouseX, mouseY, 0.75);
        }else{
            atom(mouseX, mouseY, 1);
        }
    }else{
        cursor();
    }
};
