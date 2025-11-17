const gameState={
    players:[
        {
        name: 'Player 1',
        diceValue: [0,0,0,0,0],
        held: [false,false,false,false,false],
        rolls: 0,
        scores: {//object with status of score card. 
            ones: null,
            twos: null,
            threes: null,
            fours: null,
            fives: null,
            sixes: null,
            threeOfKind: null,
            fourOfKind: null,
            fullHouse: null,
            smallStraight: null,
            largeStraight: null,
            yahtzee: null,
            chance: null,
          },
        totalScore: 0,
        },
        {
        name: 'Player 2',
        diceValue: [0,0,0,0,0],
        held: false,
        rolls: 0,
        scores: {//object with status of score card. 
            ones: null,
            twos: null,
            threes: null,
            fours: null,
            fives: null,
            sixes: null,
            threeOfKind: null,
            fourOfKind: null,
            fullHouse: null,
            smallStraight: null,
            largeStraight: null,
            yahtzee: null,
            chance: null,
          },
        totalScore: 0,
        },
    ],
    round: 1,// will keep number of round and will change up to 13,
    currentPlayerIndex: 0, //this will be a challenge while writing the functions
    maxRounds: 13,// not sure if this one is necessary
};


const rollDiceEl=document.querySelector('#roll-btn');
const resetBtnEl= document.querySelector('#reset');
const keepEl=document.querySelector('#keep-btn');
const nextRoundEl=document.querySelector('#next-round');
const Scorecard=document.querySelector('#scorecards'); //player will select the cell with value(assigned by function with the score that wants for that round)
// const messageEl=document.querySelector('#message'); 


const rollDice=()=>{
    const player=gameState.players[gameState.currentPlayerIndex];

    if (player.rolls<3){
        for (let i=0;i<player.diceValue.length; i++){
            if(player.held[i]===false){
                player.diceValue[i]= Math.floor(Math.random()*7);
            };
        };
        console.log(player.diceValue);
    }else {
        console.log('no rolls left for this round');
        return;
    };

    player.rolls +=1;

};



rollDiceEl.addEventListener('click', rollDice);