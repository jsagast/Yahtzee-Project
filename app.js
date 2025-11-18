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
        //show this as message
        console.log('no rolls left for this round');// here goes the switch.
        return;
    };
    player.rolls +=1;
    updateDisplay();
    rollsLeftEl.innerText=gameState.rollsCount-=1;
    upperSection();
};

const upperSection=()=>{
    const player=gameState.players[gameState.currentPlayerIndex];
    let tally = player.diceValue.reduce((acc,dieValue)=>{
        if(acc[dieValue]){
            acc[dieValue] = acc[dieValue] + 1;
          } else {
            acc[dieValue] = 1;
          }
          return acc;
        }, {});
    
    const scoreOpts = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];

    for (let face = 1; face <7; face++) {
        const option = scoreOpts[face - 1]; // index = face - 1 to access elements in array 
        player.scores[option]= tally[face]? tally[face]*face:0;
    };

    updateDisplay();
};

// const threeOfKind=()={ // same functions will be created for 4
//     //will check value of dice comparing value and adding it's value if they meet the criteria and add it to score cards
// };

// const fullHouse=()={/
//     // will check value of dice and determine if full criteria is met
// };

// const straight=()={
//     // will explore if large or small straights were achieved and adding 40 to the score card cell that corresponds
// };

// const chance=()=>{
    
// }

// const checkFinalScore=()=>{
//     //will look through the state to find who won (highest score) when rounds=maxRounds
//     //will display if player one or two was the winner (call the updateMessage function)
// };






const updateDisplay = () => {
    const player = gameState.players[gameState.currentPlayerIndex];
    const scoreCells = document.querySelectorAll(`td.p${gameState.currentPlayerIndex + 1}`);


    player.diceValue.forEach((dieValue, index) => {
      const dieEl = document.querySelector(`#die-${index}`);// to select the right die based on index
      dieEl.classList.remove('face-1','face-2','face-3','face-4','face-5','face-6');// remove current face  
      dieEl.classList.add(`face-${dieValue}`); //add face after rolling
    });

    scoreCells.forEach(cell => {//iterating through all td p1 elements- query selector returns node list
        const category = cell.dataset.typeScore; // each category defined in my html
        if (player.scores[category] !== null) {        // only show scores that exist [] because has to be dynamic
          cell.textContent = player.scores[category];
        } else {
          cell.textContent = '';                // empty if score not yet assigned
        }
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