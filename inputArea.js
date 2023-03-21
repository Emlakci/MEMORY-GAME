/**
 * ! ASSIGNING THE VARIABLES
 */

const gamerName=sessionStorage.getItem('gamerName'),
    gamerNameInput=document.getElementById('gamer'),
    clickedScoreInput=document.getElementById('clickCounter'),
    incorrectScoreInput=document.getElementById('incorrect'),
    correctScoreInput=document.getElementById('correct'),
    remainingScoreInput=document.getElementById('remaining'),
    countDownTimerInput=document.getElementById('timer'),
    cardSelector=document.getElementById('cardSelector'),
    quantitySelector=document.getElementById('quantitySelector'),
    distributerButton=document.getElementById('distributer'),
    gameStarterButton=document.getElementById('gameStarter'),
    stoperButton=document.getElementById('stoper'),
    quitButton=document.getElementById('quit');
    
//?***************************************************************************************?/

//* WRİTE GAMER NAME TO PLAYER INPUT AREA
gamerNameInput.value=gamerName.toUpperCase();

//* SET TİMER AS A DEFAULT TİME 00:00
countDownTimerInput.value='00:00';

//* GET THE CHOOSEN CARD TYPE AND GAME LEVEL 

cardType=cardSelector.value; //? FOR DEFAULT ASSING
gameLevel=quantitySelector.value; //? FOR DEFAULT ASSING
console.log(cardType,gameLevel); //! silinecek
[cardSelector,quantitySelector].forEach(selectElement=>{
    selectElement.addEventListener('change',getSelectedInputValue)
});

//* SET INPUT AREA VALUES AND STYLES AS A DEFAULT
function setInputValueDefault()
{
    clickedScoreInput.value='';
    incorrectScoreInput.value='';
    correctScoreInput.value='';
    remainingScoreInput.value='';
    countDownTimerInput.value='00:00';
    clickedScoreInput.removeAttribute('style');
    incorrectScoreInput.removeAttribute('style');
    correctScoreInput.removeAttribute('style');
    remainingScoreInput.removeAttribute('style');
    countDownTimerInput.removeAttribute('style');
};
//* SET INPUT AREA VALUES AND STYLES AS GAME OVER
function setInputAreaGameOver()
{
    remainingScoreInput.style.backgroundColor='green';
    incorrectScoreInput.style.backgroundColor='red';
    clickedScoreInput.style.backgroundColor='blue';
};