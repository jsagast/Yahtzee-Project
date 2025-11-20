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
            sum: null,
            bonus: null,
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
        held: [false,false,false,false,false],
        rolls: 0,
        scores: {//object with status of score card. 
            ones: null,
            twos: null,
            threes: null,
            fours: null,
            fives: null,
            sixes: null,
            sum: null,
            bonus: null,
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
    maxRounds: 13,
    rollsCount: 3,
};


const rollDiceEl=document.querySelector('#roll-btn');
const resetBtnEl= document.querySelector('#reset');
const keepAllEl=document.querySelector('#keep-btn');
const nextRoundEl=document.querySelector('#next-round');
const scoreCard=document.querySelector('#scorecard-table');
const rollsLeftEl=document.querySelector('#rolls-left');
const allCells=document.querySelectorAll('td.p1, td.p2')
const gameStatusMessage=document.querySelector('#game-status');
const dieEl=document.querySelector('#dice-container');
const diceEl=document.querySelectorAll('.die');
const yahtzeeCell = document.querySelector(`td.p${gameState.currentPlayerIndex + 1}[data-type-score='yahtzee']`);

const rollDice=()=>{
    const player=gameState.players[gameState.currentPlayerIndex];

    keepAllEl.disabled=false;
    scoreCard.classList.remove('table-disabled');
    gameStatusMessage.innerText= `Round: ${gameState.round}, ${player.name}`;

    
    if (player.rolls<3){
        for (let i=0;i<player.diceValue.length; i++){
            if(player.held[i]===false){
                player.diceValue[i]= Math.floor(Math.random()*6)+1;
                // player.diceValue[i]=5;
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
    scoreSection();
};

const keepAll=()=>{
    const player=gameState.players[gameState.currentPlayerIndex];
    player.held=[true, true, true, true,true];
    diceEl.forEach(die => {
        die.classList.add('held');
    });
};

const holdDice=()=>{
    for (let i = 0; i < 5; i++) {
        const dieEl = document.querySelector(`#die-${i}`);
        dieEl.addEventListener('click', () => {
            const player = gameState.players[gameState.currentPlayerIndex];
            player.held[i] = true;// Mark this die as held
            dieEl.classList.add('held');
        });
    };
};

const scoreSection=()=>{
    const player=gameState.players[gameState.currentPlayerIndex];

    const tally = player.diceValue.reduce((acc,dieValue)=>{
        if(acc[dieValue]){
            acc[dieValue] = acc[dieValue] + 1;
          } else {
            acc[dieValue] = 1;
          }
          return acc;
        }, {});
    
    
    const scoreOpts = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
    let scoreThreeOfKind=0;
    let scoreFourOfKind=0;
    let scoreYahtzee=0;
    let scoreSmallStraight = 0;
    let scoreLargeStraight = 0;
    let scoreChance=0;

    //upper section, three of kind,four of kind, yahtzee & chance
    for (let face = 1; face <7; face++) {
        const option = scoreOpts[face - 1]; // index = face - 1 to access elements in array 
        player.scores[option]= tally[face]? tally[face]*face:0;//here I assign values to the upperSection
        if (tally[face]>=3){
            scoreThreeOfKind=player.diceValue.reduce((acc,dieValue)=> acc+dieValue,0);
        };
        if(tally[face]>=4){
            scoreFourOfKind=player.diceValue.reduce((acc,dieValue)=> acc+dieValue,0);
        };
        // if (tally[face] === 5) {
        //     scoreYahtzee=50;
        // };
        if(tally[face]===5 && player.scores.yahtzee===null){
            const allPlayerCells= document.querySelectorAll(`td.p${gameState.currentPlayerIndex + 1}`);
            allPlayerCells.forEach(playerCell => {
                const type = playerCell.dataset.typeScore;
                if (type !== 'yahtzee') {
                    playerCell.classList.add('disabled'); 
                }
            });
            scoreYahtzee=50;
            rollDiceEl.disabled = true;
        }else if (tally[face]===5 && player.scores.yahtzee !== null){
            scoreYahtzee=player.scores.yahtzee + 100;
            rollDiceEl.disabled = true;
            yahtzeeCell.classList.add('yahtzee-disabled');
        };
        scoreChance=player.diceValue.reduce((acc,dieValue)=>acc+dieValue,0);
    };

    // Small Straight - chain of 4 

    if (tally[1] >= 1 && tally[2] >= 1 && tally[3] >= 1 && tally[4] >= 1) {
        scoreSmallStraight = 30;
    } else if (tally[2] >= 1 && tally[3] >= 1 && tally[4] >= 1 && tally[5] >= 1) {
        scoreSmallStraight = 30;
    } else if (tally[3] >= 1 && tally[4] >= 1 && tally[5] >= 1 && tally[6] >= 1) {
        scoreSmallStraight = 30;
    };

    //Large Straight - chain of 5
    if (tally[1] >= 1 && tally[2] >= 1 && tally[3] >= 1 && tally[4] >= 1 && tally[5] >= 1) {
        scoreLargeStraight = 40;
    }
    else if (tally[2] >= 1 && tally[3] >= 1 && tally[4] >= 1 && tally[5] >= 1 && tally[6] >= 1) {
        scoreLargeStraight = 40;
    };

    // Full House
    const countOfTally=Object.values(tally);//object is a built in that has access to values of the keys of tally
    const scoreFullHouse= (countOfTally.includes(3) && countOfTally.includes(2)) ? 25 : 0;


    // Sum for Upper Section
    const sumUpperSection= player.diceValue.reduce((acc,dieValue)=> acc+dieValue,0);

    //Bonus
    const bonus= (sumUpperSection>=63)? 35 : 0;

   //Total Score
    player.totalScore=sumUpperSection+bonus+scoreThreeOfKind+scoreFourOfKind+scoreYahtzee+scoreChance+scoreSmallStraight+scoreLargeStraight+scoreFullHouse;


    // To show in status-scorecard
    player.scores['threeOfKind']=scoreThreeOfKind;
    player.scores['fourOfKind']=scoreFourOfKind;
    player.scores['yahtzee']=scoreYahtzee;
    player.scores['chance']=scoreChance;
    player.scores['smallStraight']=scoreSmallStraight;
    player.scores['largeStraight']=scoreLargeStraight;
    player.scores['fullHouse']=scoreFullHouse;
    // player.scores['sum']=sumUpperSection;
    // player.scores['bonus']=bonus;
    
    updateDisplay();
};

const updateDisplay = () => {
    const player = gameState.players[gameState.currentPlayerIndex];
    const scoreCells = document.querySelectorAll(`td.p${gameState.currentPlayerIndex + 1}`);



    //add face to dice
    player.diceValue.forEach((dieValue, index) => {
      const dieEl = document.querySelector(`#die-${index}`);// to select the right die based on index
      dieEl.classList.remove('face-1','face-2','face-3','face-4','face-5','face-6');// remove current face  
      dieEl.classList.add(`face-${dieValue}`); //add face after rolling
    });

    scoreCells.forEach(cell => {//iterating through all td p1 elements- query selector returns node list
        const category = cell.dataset.typeScore; // each category defined in my html
        if (player.scores[category] !== null && !cell.classList.contains('taken')||category==='yahtzee') {        // only show scores that exist [] because has to be dynamic
          cell.textContent = player.scores[category];
        };
        // if(category==='yahtzee' && cell.classList.contains('taken')){
        //     console.log(cell.innerText);
        //     cell.innerText= Number(cell.innerText)+50;
        // };
    });


};

const switchPlayer=()=>{
    if (gameState.currentPlayerIndex === gameState.players.length - 1) {
        gameState.currentPlayerIndex = 0; // go back to first player
    } else {
        gameState.currentPlayerIndex++;
    };

};


const calculateTotalScore=()=> {
    const player=gameState.players[gameState.currentPlayerIndex];
    const cells = document.querySelectorAll(`td.p${gameState.currentPlayerIndex + 1}.taken`);
    const sumCells=document.querySelector(`td.p${gameState.currentPlayerIndex + 1}[data-type-score='sum']`)
    const bonusCells=document.querySelector(`td.p${gameState.currentPlayerIndex + 1}[data-type-score='bonus']`)

    //upper section
    const scoreOpts = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes']

    const upperSectionValues = Array.from(cells).filter(cell =>scoreOpts.includes(cell.dataset.typeScore));
    const sumUpperSection= upperSectionValues.reduce((acc,value)=>acc+(Number(value.innerText)),0);

    const bonus=sumUpperSection>=63?35:0;

    player.scores.sum = sumUpperSection;
    player.scores.bonus = bonus;

    sumCells.textContent = player.scores.sum;
    bonusCells.textContent = player.scores.bonus;

    //total 
    return (Array.from(cells).reduce((sum, cell) => sum + Number(cell.textContent || 0), 0))+bonus;
};


const keepScore=(event)=>{
    const typeCell=event.target.dataset.typeScore;
    const player=gameState.players[gameState.currentPlayerIndex];
    const totalCells=document.querySelector(`td.p${gameState.currentPlayerIndex + 1}[data-type-score='totalScore']`)
    const allPlayerCells= document.querySelectorAll(`td.p${gameState.currentPlayerIndex + 1}`);


    if(!typeCell) return;
    if(typeCell==='sum'||typeCell==='bonus'||typeCell==='totalScore') return;
    if (event.target.classList.contains('disabled')) return;
    if(typeCell !=='yahtzee'&& event.target.classList.contains('taken')) return; // yahtzee bonus

    const keptScore= player.scores[typeCell];
    event.target.textContent= keptScore;
    event.target.classList.add('taken'); //event.target is the element that was chosen

    const scoreCells = document.querySelectorAll(`td.p${gameState.currentPlayerIndex + 1}`);

    scoreCells.forEach(cell => {
        if (!cell.classList.contains('taken')) {
            cell.textContent = '';
        }
    });

    player.totalScore= calculateTotalScore(player);
    totalCells.textContent = player.totalScore;
    
    player.rolls=0;
    player.held=[false,false,false,false,false];
    gameState.rollsCount=3
    rollDiceEl.disabled = false;
    yahtzeeCell.classList.remove('yahtzee-disabled');
    allPlayerCells.forEach(playerCell=>{playerCell.classList.remove('disabled')});
    rollsLeftEl.innerText=gameState.rollsCount;
    player.diceValue=[1,2,3,4,5];
    
    // could do this a function
    player.diceValue.forEach((dieValue, index) => {
        const dieEl = document.querySelector(`#die-${index}`);
        dieEl.classList.remove('face-1','face-2','face-3','face-4','face-5','face-6'); 
        dieEl.classList.add(`face-${dieValue}`); 
    });
    switchPlayer();
    keepAllEl.disabled=true;
    scoreCard.classList.add('table-disabled');
    gameStatusMessage.innerText= `${gameState.players[gameState.currentPlayerIndex].name}`;
    diceEl.forEach(die => {
        die.classList.remove('held');
    });


    if (gameState.currentPlayerIndex === 0) {
        gameState.round++;
        gameStatusMessage.innerText= `Round ${gameState.round} , ${gameState.players[gameState.currentPlayerIndex].name}`;// do this message
        if (gameState.round > gameState.maxRounds) {
            gameStatusMessage.innerText= "Game over! Check the final scores";// do this a message
        };
    }
}

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
        ];
    gameState.round= 1;// will keep number of round and will change up to 13,
    gameState.currentPlayerIndex= 0; //this will be a challenge while writing the functions
    gameState.maxRounds= 13;// not sure if this one is necessary
    gameState.rollsCount=3;
    rollsLeftEl.innerText=gameState.rollsCount;
    allCells.forEach((cell)=>{
        cell.textContent='';
        cell.classList.remove('taken');
    });
    keepAllEl.disabled=true;
    scoreCard.classList.add('table-disabled');
    rollDiceEl.disabled = false;
    rollsLeftEl.innerText=gameState.rollsCount
    gameStatusMessage.innerText=`Let's start playing. It's Player 1's turn!`
    for (let i = 0; i < 5; i++) {
        const dieEl = document.querySelector(`#die-${i}`);
        dieEl.classList.remove('held');   // remove red border in die that was held
    }
    updateDisplay();
   
};


scoreCard.addEventListener('click', keepScore)
rollDiceEl.addEventListener('click', rollDice);
keepAllEl.addEventListener('click', keepAll)
resetBtnEl.addEventListener('click', init);

init();
holdDice();
