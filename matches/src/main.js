var prompt = require('prompt-sync')();


console.log("Wecome to Matches game");
let NumberMatches = Number(prompt('Enter number of beginning matches '));
let MaxDrawMatches  = Number(prompt('Enter number of max draw matches '));
let Turn = Number(prompt('Enter 1 to start first or 0 to let the computer start first '));
let RandomTemp;
while(NumberMatches > 0){
    if(Turn===1){// Player turn
        if (NumberMatches===1){
            console.log('Sorry bady, it is simes that you lose this is the last matches in the pack ,maby next time ');
            break;
        }
        else{
            NumberMatches -= (Number(prompt('Enter number of matches you wont to take lass then ')));
            Turn = 0;
        }
    }

    else if(Turn===0){// Computer turn
        if(NumberMatches===1){
            console.log('well done you win!');
            break;
        }
        else if(NumberMatches>=1 && ((NumberMatches-1)%(MaxDrawMatches+1)===0)){
            RandomTemp = Math.floor(Math.random() * MaxDrawMatches) + 1;
            NumberMatches-= RandomTemp;
            console.log('The computer take`s ' + RandomTemp +' matches, now left ' + NumberMatches + 'matches ');
            Turn = 1;
        }
        else {
            console.log('The computer take`s ' + (NumberMatches-1)%(MaxDrawMatches+1) + 'matches, now left ' + (NumberMatches - (NumberMatches-1)%(MaxDrawMatches+1)) + ' matches ');
            NumberMatches-=(NumberMatches-1)%(MaxDrawMatches+1);
            Turn = 1;
        }
    }

}