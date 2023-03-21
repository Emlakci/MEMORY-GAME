/**
 * ! ASSIGNING THE VARIABLES
 */

const   gameArea=document.querySelector('.gameArea');
let cardArea=document.querySelector('#cardArea'),
    pauseCube=document.querySelector('#pauseCube'),
    gameStatus=false;

//?***************************************************************************************?/

//? SETTING UP GAME
//* DISTRIBUTE CARDS AS CHOOSEN FORMAT BY PLAYER
function distribute() 
{
    distributerButton.disabled=distributerButton.disabled==true?false:true; // don't allow gamer to click redistribute button 2 times 
    setInputValueDefault(); // SET INPUT VALUES DEFAULT '' IN THE INFO ROWS
    setCountDown(); // SET TIMER TİME ACORDING TO GAME LEVEL
    setCollection(cardType); // SET UP THE NEW PLAYING CARD COLLECTION CHOOSEN
    setImages(); // SETTING UP THE AMOUNT OF THE PLAYING CARD ARRAY PAIRS'
    duplicate(cardArray); // DUCAPLICATE THE PLAYING CARD ARRAY'S ELEMENTS
};

//* FUNCTION THAT START THE GAME
function startGame() 
{
    cardCreater(); // Create Cards in the game area
    openCloseAll(card); // Memorizing period of the game start
    delay(1200*gameLevel)
        .then(()=>{
            activatingGame();
        })
            .then(()=>{
                setCountDown();
                countDownTimer=setInterval(startStopCountDown,1000);
            });
};
    
    





