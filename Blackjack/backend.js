let board = document.getElementById("board");
let b = board.getContext("2d");

board.height = Math.floor(9 * window.innerHeight / 10);
board.width = Math.floor(9 * window.innerHeight / 10);

let cardAmount = 10
let fontSize = 50

let cardSize = Math.floor(board.height / 11);

let number;
let suit;

let suits = ["♥", "♦", "♣", "♠"];
let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];

let availableCards = [];

for (let i = 0; i < 4; i++) {
    let debug = [];
    for (let j = 0; j < 13; j++) {
        debug.push(1);
    }
    availableCards.push(debug);
}

    b.font = "50px serif"
    //b.strokeText(cards[i] + "" + suits[j], 100, 100);

for (let i = 0; i < cardAmount; i++) {
    drawACard(i);
}

function drawACard(i) {
    number = Math.floor(Math.random() * 12);
    suit = Math.floor(Math.random() * 4);

    if (availableCards[suit][number] == 1) {
        availableCards[suit][number] = 0;
        b.strokeText(cards[number], ((10 - i) * cardSize), board.height * 0.9);
        if (suit < 2) {
            b.fillStyle = "#FF0000";
        }
        else {
            b.fillStyle = "#000000"
        }
        b.fillText(suits[suit], ((10 - i) * cardSize), board.height * 0.9 - fontSize);

        b.strokeRect((9.75-i)* cardSize, (board.height * 0.9) - (2 * fontSize), cardSize, 3 * fontSize);
    }
    else {
        console.log("1/52 chance")
        drawACard(i);
    }
}