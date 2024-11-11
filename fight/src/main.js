console.log("Welcome to fight");

class Card {
    constructor(number, shape) {
        this._shape = shape;
        this._number = number;
    }

    get number() {
        return this._number
    }

    get shape() {
        return this._shape
    }
}

class Packet {
    constructor(name) {
        this.name = name;
        this.discordPile = [];
        this.drawPile = [];
    }

    drawCard() { // שולף קלף מהדראו פיל ומחזיר אותו
        return this.drawPile.shift();
    }

    shuffleDiscordToDrawPile() {//פונקציה שמערבבת את הדיסרוקד פיל ומעבירה אותו לחפיסת השליפה בעזרת פונרציה swap
        shuffle(this.discordPile)
        this.drawPile = this.discordPile
        this.discordPile = []
        console.log(this.name + ' shuffle: ' + (this.drawPile.length) + ' card in drawPile and ' + this.discordPile.length + ' card in discord pile');
    }

    addCardsToDiscord(card1, card2) { // פונקציה שמכניסה את שני הקלפים שמועברים לה לדיסקורד של החבילה המזמנת
        this.discordPile.push(card1)
        this.discordPile.push(card2)
    }

    pushArrToDiscord(arr) {
        let len = arr.length
        for (let i = 0; i < len; i++)
            this.discordPile.push(arr.shift())
    }

    getCardsCount() {
        return (this.discordPile.length + this.drawPile.length)
    }

}

function swap(arr, ind1, ind2) {// 
    let temp = arr[ind1];
    arr[ind1] = arr[ind2];
    arr[ind2] = temp;
}


function playTurn(packet1, packet2) {
    if (packet1.drawPile.length === 0) {
        packet1.shuffleDiscordToDrawPile()
    }
    if (packet2.drawPile.length === 0) {
        packet2.shuffleDiscordToDrawPile()
    }
    let card1 = packet1.drawCard();
    let card2 = packet2.drawCard();
    if (card1.number > card2.number) {
        packet1.addCardsToDiscord(card1, card2);
        console.log(packet1.name + ' win!');
    } else if (card1.number < card2.number) {
        packet2.addCardsToDiscord(card1, card2);
        console.log(packet2.name + ' win!');
    } else // תיקו
    {
        let flag = 3;// יכנס לשימוש במקרה שאין 4 קלפים להשלים את המלחמה
        let arr = [card1, card2];

        if (packet1.drawPile.length === 0) {
            packet1.shuffleDiscordToDrawPile()
        }
        if (packet2.drawPile.length === 0) {
            packet2.shuffleDiscordToDrawPile()
        }

        while (card1.number === card2.number) {
            if (packet1.drawPile.length - 3 < 1) {
                flag = packet1.drawPile.length - 1;
            } // במידה ואיך מספיק קלפים למלחמה מעדכן את הערך fleg שיקתין את כמות הקלפים הסגורים
            if ((packet2.drawPile.length - 3 < 1) && packet2.drawPile.length < packet1.drawPile.length) {
                flag = packet2.drawPile.length - 1;
            } // אותו דבר עם חפיסה 2
            for (let i = 0; i < flag; i++) {
                arr.push(packet1.drawCard());
                arr.push(packet2.drawCard());
            }

            card1 = packet1.drawCard();
            arr.push(card1);
            card2 = packet2.drawCard();
            arr.push(card2);
        }// קיים קלף חזק וקיים מערך עם כל הקלפים של אותו תור
        // פונקציה push שמכניסה את האיברים של arr לתור החפיסה של הקלף החזק
        if (card1.number > card2.number) {
            packet1.pushArrToDiscord(arr);
            console.log(packet1.name + ' win after a big fight!');
        } else {
            packet2.pushArrToDiscord(arr);
            console.log(packet2.name + ' win after a big fight!');
        }
    }
    console.log('Aviv heve ' + (avivPacket.drawPile.length) + ' card in drawPile and ' + avivPacket.discordPile.length + ' card in discord pile');
    console.log('Computer heve ' + (computerPacket.drawPile.length) + ' card in drawPile and ' + computerPacket.discordPile.length + ' card in discord pile');

}

function fPacket(arr) {// פונרציה שמקבלת מערך ומחזרה דק קלפים מלא מטיפוס קלף
    const shapeDeck = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
    for (let i = 1; i < 14; i++) {
        for (let j = 0; j < 4; j++) {
            const card = new Card(i, shapeDeck[j]);
            arr.push(card);
        }
    }
}

function shuffle(arr) { // פונקציה מקבילה לפונקציה העירבוב רק חיצונית
    for (let i = 0; i < arr.length; i++) {
        swap(arr, i, (Math.floor(Math.random() * arr.length)))// מחליף את הקלף במקום האי עם הקלף במקום האקראי בין 0 ל- לאורך המערך
    }
}

// main
let avivPacket = new Packet('Aviv'); // בונה לאביב חפיסה
let computerPacket = new Packet('computer'); // בונה למחשב חפיסה
let mainPacket = []; // בונה מערך
fPacket(mainPacket); //מכניס למערך חפיסה ראשית 52 קלפים 13*4 (בלי גוקרים)
shuffle(mainPacket); // מערבבת את החפיסה הראשית
for (let i = 0; i < 52; i++) {
    if (i % 2) {
        avivPacket.drawPile.push(mainPacket[i]);
    } else {
        computerPacket.drawPile.push(mainPacket[i]);
    }
}
// console.log('Aviv heve ' + (AvivPacket.drawPile.length + AvivPacket.discordPile.length) + ' card');
// console.log(AvivPacket.drawPile);
// console.log('Computer heve ' + (ComputerPacket.drawPile.length + ComputerPacket.discordPile.length) + ' card');
// console.log(ComputerPacket.drawPile);
let avivCounter, computerCardsCounter
while (true) {
    avivCounter = avivPacket.getCardsCount();
    computerCardsCounter = computerPacket.getCardsCount();
    if (avivCounter === 0 || computerCardsCounter === 0) {
        break
    }
    playTurn(avivPacket, computerPacket);
}
let numberOfCards = computerPacket.drawPile.length + avivPacket.discordPile.length + avivPacket.drawPile.length + computerPacket.discordPile.length;
console.log('number of card is: ' + numberOfCards);
let winner = avivCounter > computerCardsCounter ? avivPacket : computerPacket
console.log(`The winner is: ${winner.name}`);
console.log('end');

//console.log('Aviv heve ' + (AvivPacket.drawPile.length) + ' card in drawPile and ' + AvivPacket.discordPile.length + ' card in discord pile');
//console.log(AvivPacket.drawPile);
//console.log('Computer heve ' + (ComputerPacket.drawPile.length) + ' card in drawPile and ' + ComputerPacket.discordPile.length + ' card in discord pile');
//console.log(ComputerPacket.drawPile);


//TODO: code
//1. Add number of turn
//2. Every time player play card, print it to the screen
//3. Fix all bugs
//4. run 10,000 games, and print the average turn per game.

// -----
// TODO: design
// Think about each function, and move it to the right class
// file for each class: Player , Game, Card
// prints:
// card => ♥5  (♠ ♡ ♦ ♤ ♣)
// Player => Aviv: 5 draw | 22 discard
// Game => Turn 23: aviv-49 computer-3