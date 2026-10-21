/*
Notas para el profesor:

-Todo el código está hecho 100% sin IA o codigo de otras personas, excepto por 
el estupido Copilot que VS Code decidió instalar de un momento a otro.
-El código está en inglés por mañas que tengo y por como aprendí a programar.
-Aunque no he podido atender las clases debido a una electiva, aun voy a seguir
desarrollando el código y mostrandoselo.
-El resto de los juegos están en el Github, por el momento tengo
a la serpiente (Snake) y a el juego propio mío (M32) que no he terminado pero
está operativo.
-Si necesita algo o tiene alguna crítica de alguno de los juegos,
voy a intentar despejar el lunes para hablarle en persona.

Dejo todo el resto a mis compañeros

Odio Copilot
*/

/*
To do:

- Implement the dealer
- Blackjack check
- Cards are drawn weird but I don't wanna do that math
- Difficulty maybe, random normal and analytical dealers are always fun
- FINISH THOSE STUPID FUCKING CHECKERS YOU'VE BEEN IGNORING
- Make the Prairie of the Journey King copy you've been bragging about
- Make the UI that'll unify the games
- 学习中文, 不到两个月后是HSK2的考式啊
*/

let board = document.getElementById("board");
let b = board.getContext("2d");

let drawButton = document.getElementById("drawCardButton");
let stayButton = document.getElementById("stayButton");

board.height = Math.floor(9 * window.innerHeight / 10);
board.width = Math.floor(9 * window.innerHeight / 10);

//Amount of first dealt cards
let cardAmount = 2

let cardsLeft = 52;

//Waiting time between turns
let waitingTime = 1500
//Slot of next handed card
let slot = 1;

//Pretty useless variable
let cardMaxAmount = 11;
let cardSize = Math.floor(board.height / cardMaxAmount);
let fontSize = Math.floor(board.height / (cardMaxAmount * 1.5));


//Prevents involuntary actions
let gameEnded = false;

//RNG for cards
let number;
let suit;

let points = 0;
let aces = 0;

let suits = ["♥", "♦", "♣", "♠"];
let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];

let availableCards = [];

//To let them differ between 21 and BJ (not implemented yet)
let allowBlackjack = true;

drawButton.addEventListener("click", drawACard);
stayButton.addEventListener("click", stay);

//Creates 2D array to check which cards have and haven't been dealt

function newDeck() {
    availableCards = [];
    for (let i = 0; i < 4; i++) {
        let debug = [];
        for (let j = 0; j < 13; j++) {
            debug.push(1);
        }
        availableCards.push(debug);
    }
    cardsLeft += 52;
    console.log("New deck created");
}
    b.font = "50px serif"

//First draw

function newGame() {
    for (let i = 0; i < cardAmount; i++) {
        drawACard();
    }
}

//Aesthetics

function prepareNewGame() {
    newDeck();
    slot = 1;
    points = 0;
    gameEnded = false;
    b.fillStyle = "#FFFFFF";
    b.fillRect(0, 0, board.width, board.height);
    newGame();
}

//Can you read?
function drawACard() {
    //Still haven't coded a blackjack check.
    number = Math.floor(Math.random() * 12);
    suit = Math.floor(Math.random() * 4);

    if (cardsLeft == 0) {
        newDeck();
    }

    if (availableCards[suit][number] == 1 && points <= cardAmount * 10 + 1 && !gameEnded) {
        availableCards[suit][number] = 0;
        cardsLeft -= 1;
        console.log(cardsLeft + " cards left")
        b.strokeText(cards[number], ((cardMaxAmount - slot) * cardSize), board.height * 0.9);
        if (suit < 2 && points < 21) {
            b.fillStyle = "#FF0000";
        }
        else {
            b.fillStyle = "#000000"
        }
        b.fillText(suits[suit], ((cardMaxAmount - slot) * cardSize), board.height * 0.9 - fontSize);

        b.strokeRect(((cardMaxAmount * 0.975)-slot)* cardSize, (board.height * 0.9) - (2 * fontSize), cardSize, 2.5 * fontSize);
    
        if (number == 0) {
            aces++;
            points += 11;
        }
        else {
            if (number >= 9) {
                points += 10;
            }
            else {
                points += number + 1;
            }
        }

        slot++;
    }
    else if (availableCards[suit][number] == 0) {
        drawACard();
    }

    if (points > cardAmount * 10 + 1) {
        if (aces > 0) {
            aces--;
            points -= 10;
        }
        else {
            console.log("Busted: " + points + " points");
            setTimeout(prepareNewGame, waitingTime);
            gameEnded = true;
        }
    }


}

function stay() {
    if (!gameEnded) {
        console.log("You stayed with " + points + " points");
        setTimeout(prepareNewGame, waitingTime);
        gameEnded = true;
    }
}

prepareNewGame();

console.log(board.height)