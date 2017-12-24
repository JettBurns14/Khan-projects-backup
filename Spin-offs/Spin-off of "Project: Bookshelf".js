// Link:  https://www.khanacademy.org/cs/spin-off-of-project-bookshelf/4716463444328448
// Created:  08/24/2015 16:53




var book = [
        {   title: "How to know God exists",
            author: "Ray Comfort",
        },
        {
            title: "Holy Bible",
        },
        {
            title: "The Hobbit",
            author: "Tolkien",
        }
];
// draw shelf
fill(173, 117, 33);
rect(0, 120, width, 10);

    for (var i = 0; i < book.length; i++) {
    
    // Draw book
    fill(64 * i);
    rect(132 * i + 8, 20, 90, 100);
    
    // Text
    fill(255, 255, 255);
    text(book[i].title, 131 * i + 23, 28, 75, 40);
    image(getImage("cute/Star"), 34, 42, 38, 54);
    image(getImage("cute/CharacterBoy"), 297, 34, 39, 62);
        
    // Draw author
    text(book[i].author, 138 * i + 21, 112);
    
    }

