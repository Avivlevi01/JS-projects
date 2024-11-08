var prompt = require('prompt-sync')();

console.log("Welcome to fight");

class Card {
    constructor(number, shape) {
      this._shape = shape;
      this._number = number;}

    get number (){
        return this._number}
    get shape() {
        return this._shape}
  }

class Packet{
    constructor(name){
        this.name = name;
        this.discordPile = [];
        this.drawPile = [];
    }

    drawCard(){ // שולף קלף מהדראו פיל ומחזיר אותו
        return this.drawPile.shift();
    }

    shuffle(){//פונקציה שמערבבת את הדיסרוקד פיל ומעבירה אותו לחפיסת השליפה בעזרת פונרציה swap
        for(let i=0; i<this.discordPile.length;i++){
            swap(discordPile , i , (Math.floor(Math.random() * discordPile.length)))// מחליף את הקלף במקום האי עם הקלף במקום האקראי בין 0 ל- לאורך המערך
        }
        this.drawPile = this.discordPile;
        this.discordPile = [];
    }

    addCardToDiscord(card){// פונקציה שמכניסה הקלף שמעברים לה לדיסקורד של החבילה המזמנת
        this.discordPile.push(card);
    }

    addCardsToDiscord(card1 , card2){ // פונקציה שמכניסה את שני הקלפים שמועברים לה לדיסקורד של החבילה המזמנת
        this.discordPile.push(card1);
        this.discordPile.push(card2);
    }

    pushArrToDiscord(arr){
        for(let i=0;i<arr.length;i++)
            this.discordPile.push(arr.shift());
    }


  }

function swap(arr, ind1, ind2){// 
        let temp = arr[ind1];
        arr[ind1] = arr[ind2];
        arr[ind2] = temp;
  }


  
function  turn (packet1 , packet2){ 
    if(packet1.drawPile.length===0){packet1.shuffle()}
    if(packet2.drawPile.length===0){packet2.shuffle()}
    const card1 = packet1.drawCard();
    const card2 = packet2.drawCard();
    if(card1.number > card2.number){
        packet1.addCardsToDiscord(card1 , card2);
        console.log( packet1.name + ' win!');
    }
    else if (card1.number < card2.number){
        packet2.addCardsToDiscord(card1 , card2);
        console.log( packet2.name + ' win!');
    }
    else // תיקו
    {  
        let flag = 0;// יכנס לשימוש במקרה שאין 4 קלפים להשלים את המלחמה
        let arr = [card1,card2];

        if(packet1.drawPile.length===0){packet1.shuffle()}
        if(packet2.drawPile.length===0){packet2.shuffle()}

        while(card1 === card2){
            if(packet1.drawPile.length-3<1){flag=packet1.drawPile.length-1;} // במידה ואיך מספיק קלפים למלחמה מעדכן את הערך fleg שיקתין את כמות הקלפים הסגורים
            if((packet2.drawPile.length-3<1) && packet2.drawPile.length < packet1.drawPile.length){flag=packet1.drawPile.length-1;} // אותו דבר עם חפיסה 2
        for(let i=0; i<flag;i++){
            arr.push(packet1.drawCard());
            arr.push(packet2.drawCard());
            } 
        
        card1 = packet1.drawCard();
        arr.push(card1);
        card2 = packet2.drawCard();
        arr.push(card2);
        }// קיים קלף חזק וקיים מערך עם כל הקלפים של אותו תור
        // פונקציה push שמכניסה את האיברים של arr לתור החפיסה של הקלף החזק
        if(card1 > card2){
            packet1.pushArrToDiscord(arr);
            console.log( packet1.name + ' win after a big fight!');
        }
        else {packet2.pushArrToDiscord(arr);
            console.log( packet2.name + ' win after a big fight!');
        }
    }
}
function fPacket(arr){// פונרציה שמקבלת מערך ומחזרה דק קלפים מלא מטיפוס קלף
    const shapeDeck = ['Spades' , 'Hearts' , 'Clubs' , 'Diamonds'];
    for(let i=1; i<14;i++){
        for(let j=0;j<4;j++){
            const card = new Card(i,shapeDeck[j]);
            arr.push(card);
        }
    }
}
function shuffle (arr){ // פונקציה מקבילה לפונקציה העירבוב רק חיצונית
    for(let i=0; i<arr.length;i++){
        swap(arr , i , (Math.floor(Math.random() * arr.length)))// מחליף את הקלף במקום האי עם הקלף במקום האקראי בין 0 ל- לאורך המערך
    }
    this.drawPile = this.discordPile;
}
// main
let AvivPacket = new Packet('Aviv'); // בונה לאביב חפיסה
let ComputerPacket = new Packet('computer'); // בונה למחשב חפיסה
let mainPacket = []; // בונה מערך
fPacket(mainPacket); //מכניס למערך חפיסה ראשית 52 קלפים 13*4 (בלי גוקרים)
shuffle(mainPacket); // מערבבת את החפיסה הראשית
for(let i=0;i<52;i++){
    if(i%2){
        AvivPacket.drawPile.push(mainPacket[i]);
    }
    else{
        ComputerPacket.drawPile.push(mainPacket[i]);
    }
}
console.log('Aviv heve ' + (AvivPacket.drawPile.length + AvivPacket.discordPile.length) +' card');
console.log(AvivPacket.drawPile);
console.log('Computer heve ' + (ComputerPacket.drawPile.length + ComputerPacket.discordPile.length) +' card');
console.log(ComputerPacket.drawPile);

for(let i = 0;i<5;i++){
    turn(AvivPacket,ComputerPacket);
}
console.log('Aviv heve ' + (AvivPacket.drawPile.length + AvivPacket.discordPile.length) +' card');
console.log(AvivPacket.drawPile);
console.log('Computer heve ' + (ComputerPacket.drawPile.length + ComputerPacket.discordPile.length) +' card');
console.log(ComputerPacket.drawPile);