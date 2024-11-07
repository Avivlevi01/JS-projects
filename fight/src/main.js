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

    addCard(card) {
        this.drawPile.push(card);
        //console.log(`card ${card.number} added to Paclet ${this.name}`);
    }

    shuffle(){
        for(let i=0; i<this.discordPile.length;i++){
            swap(discordPile , i , (Math.floor(Math.random() * discordPile.length)))// מחליף את הקלף במקום האי עם הקלף במקום האקראי בין 0 ל- לאורך המערך
        }
        this.drawPile = this.discordPile;
    }

  }

  function swap(arr, ind1, ind2){
        let temp = arr[ind1];
        arr[ind1] = arr[ind2];
        arr[ind2] = temp
  }
  
  function winerCard (card1 , card2){  // פונקיצה זמנית תשודרג בהמשך
    if (card1.number > card2.number) 
        return card1;
    else if (card1.number < card2.number)
        return card2;
    else 
        return null; 
  }