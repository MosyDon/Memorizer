var errors = 0;
var cardList = [ //all picture components put in an array
    "AlienX",
    "Amphibian",
    "Ben",
    "Diamondhead",
    "Fourarms",
    "Ghostfreak",
    "Goop",
    "Humungousaur",
    "Swampfire",
    "XLR8"
]


var cardSet;
var board = [];
var rows = 4;
var columns =5;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() { //shuffles the cards everytime refresh is hit
    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet);
    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random number 
        //swap for another card and the whole board gets shuffled
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    //arrange the board 4x5
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop(); //shows the card picture
            row.push(cardImg); //JS

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString(); // Coordinates of card , ex: 0-1, 0-2 etc.
            card.src = cardImg + ".jpg"; //selects the image from the array of pictures
            card.classList.add("card");
            card.addEventListener("click", selectCard); //calls the selectCard function
            document.getElementById("board").append(card);

        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 3000); //time to see cards after entering the page
}

function hideCards() { //hide the card after being shown at the start
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString()); 
            card.src = "back.jpg"; 
        }
    }
}

function selectCard() {

    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) { //not selecting the same card twice
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000); // if the cards selected is wrong, then it will go back to being hidden after 1 second
        }
    }

}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1; //error counter is incremented
        document.getElementById("errors").innerText = errors;
    }
// deselects both selected cards 
    card1Selected = null; 
    card2Selected = null;
}