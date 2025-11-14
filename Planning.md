Game: Yahtzee

---Variables to track state of game---

// will create and object gameState with following keys


data for each player:

diceNumber: array to assign value to dices (0 initial value) [0,0,0,0,0]
held: boolean array with 5 elements (dices) []
rolls: 3(will be reduced after every roll) 
scores: object with status of score card. Key will be the option and value the score {}
total score: initial value of 0, will be modified by the movements on score card.

const gameState={
    players:[{player1 data},{player2 data} ],
    round: 1// will keep number of round and will change up to 13,
    currentPlayerIndex: 0 //this will be a challenge while writing the functions
    maxRounds: 13// not sure if this one is necessary
}


---Cached Elements---

const resetBtnEl= document.querySelector('#reset');
const rollDiceEl=document.querySelector('#roll');
const keepEl=document.querySelector('#keep');
const nextRoundEl=document.querySelector('#next-round');
const Scorecard=document.querySelector('.board'); //player will select the cell with value(assigned by function with the score that wants for that round)
const messageEl=document.querySelector('#message'); 



-- Functions----

const assignScore =()=>{
    // will be created to keep the value of dice and then keep rolling dice rolldice()
    //will include and accumulator to keep track of past selections

};

const updateMessage=()=>{//message based on status of game (winner and switch in turns)
};

const init=()=>{
    // will clean the score card, messages and results
};

const rollDice=()=>{
    //will roll the dice to start the game and up to 3 times (not held dice)
    //will assign a value to with Math method
};

const keepDice=()=>{
    //will change status (held) of dice when keeping it
}

const sumDice=()=>{
    //will be adding the value of dice with same value and filling the scorecard
    //if five with same value are found a score of 50 will be assigned to the correct cell (yahtzee)
}

const threeOfKind=()={ // same functions will be created for 4
    //will check value of dice comparing value and adding it's value if they meet the criteria and add it to score cards
}

const fullHouse=()={/
    // will check value of dice and determine if full criteria is met
}

const straight=()={
    // will explore if large or small straights were achieved and adding 40 to the score card cell that corresponds
}

const checkFinalScore=()=>{
    //will look through the state to find who won (highest score) when rounds=maxRounds
    //will display if player one or two was the winner (call the updateMessage function)
}

---Buttons to add functionality---

a. "Reset" button (id="reset") will be created on html and an event listener will be added on JS to the cached element resetBtnEl when clicking it. This will call a function to reset(re start) the game


b. "Roll Dice" button (id="roll")will be created and and an event listener will be added on JS to the cached element rollDice when clicking it. This will call a function to roll the dice (5 the first time and the remaining during the players turn).This will be disabled once the player assigns it's desired score to the score card or the player reaches 3 rolls.

c. "Keep" button (id="keep") will be created and and an event listener will be added on JS to the cached element keepEl when clicking it. This will call a function to keep the selected dice and just keep rolling the rest.

d. "Switch Player" button (id="switch") will be will be created and and an event listener will be added on JS to the cached element nextRoundEl when clicking it. This will call a function to switch player.

e. "Next Round" button (id="next-round") will be created and and an event listener will be added on JS to the cached element nextRoundEl when clicking it. This will call a function to switch player.


