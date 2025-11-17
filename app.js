const gameState={
    players:[
        {
        name: 'Player 1',
        diceValue: [1,2,3,4,5],
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
        diceValue: [1,2,3,4,5],
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
    rollsCount: 3
};


const rollDiceEl=document.querySelector('#roll-btn');
const resetBtnEl= document.querySelector('#reset');
const keepEl=document.querySelector('#keep-btn');
const nextRoundEl=document.querySelector('#next-round');
const Scorecard=document.querySelector('#scorecards');
const rollsLeftEl=document.querySelector('#rolls-left');

//player will select the cell with value(assigned by function with the score that wants for that round)
// const messageEl=document.querySelector('#message'); 


const rollDice=()=>{
    const player=gameState.players[gameState.currentPlayerIndex];
    
    if (player.rolls<3){
        for (let i=0;i<player.diceValue.length; i++){
            if(player.held[i]===false){
                player.diceValue[i]= Math.floor(Math.random()*6)+1;
            };
        };
    }else{
        console.log('no rolls left for this round');
        return;
    };
    player.rolls +=1;
    updateDisplay();
    rollsLeftEl.innerText=gameState.rollsCount-=1;
};

const updateDisplay = () => {
    const player = gameState.players[gameState.currentPlayerIndex];
  
    player.diceValue.forEach((dieValue, index) => {
      const dieEl = document.querySelector(`#die-${index}`);// to select the right die based on index
      dieEl.classList.remove('face-1','face-2','face-3','face-4','face-5','face-6');// remove current face  
      dieEl.classList.add(`face-${dieValue}`); //add face after rolling
    });
};

const init=()=>{
    gameState.players=[
            {
            name: 'Player 1',
            diceValue: [1,2,3,4,5],
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
            diceValue: [1,2,3,4,5],
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
        ];
    gameState.round= 1;// will keep number of round and will change up to 13,
    gameState.currentPlayerIndex= 0; //this will be a challenge while writing the functions
    gameState.maxRounds= 13;// not sure if this one is necessary
    gameState.rollsCount=3;
    rollsLeftEl.innerText=gameState.rollsCount;
    updateDisplay();
   
};



rollDiceEl.addEventListener('click', rollDice);
resetBtnEl.addEventListener('click', init);