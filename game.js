/**
 * ! ASSIGNING THE VARIABLES
 */
const buttonArea=document.querySelector('.buttonArea');


//? *************************************************************************************?/

//* DELAY TIME FUNCTION
function delay(time)
{
    return new Promise(resolve=>setTimeout(resolve,time))
};

//* FUNCTION THAT SETUP THE GAME SETTING AND BUTTONS' STATUS AS A DEFAULT
function setDefault()
{
    stoperButton.disabled=true; // don't allow gamer to click pause process if gamer click redistribute button
    stoperButton.innerHTML='Durdur' // if stoperButton's innerHTML is shown as a 'Devam et' change it as a 'Durdur'
    gameStatus=false; // change gamestate FALSE if gamer click redistribute button
    pauseCube.classList.add('pauseCubeNone'); // remove pausecube element if game is paused
    cardArea.classList.remove('cardContainerPause'); // show if cardArea is not visible
    cardArea.classList.remove('cardContainerLoseTime','cardContainerWinnerTime') // clear animations from card area for new game
    if(cardArea.children.length!==0)
    {
    cardArea.removeChild(cardArea.lastChild); // clear animations etc for replaying game
    };
    if(!gameStarterButton.hasAttribute('disabled')) // don't allow gamer to click this button before clicking redistribute button
    {
        gameStarterButton.disabled=true;
    };
    if(buttonArea.contains(document.getElementById('replayButton'))) // remove replayButton if it exist
    {
        document.getElementById('replayButton').remove(); 
    };
};

//* FUNCTION THAT CHANGING GAME STATUS ACTIVATING THE GAME
function activatingGame()
{  
    if(!gameStatus)
    {
        gameStatus=true; // Allow Gamer to click the cards for picking up
        stoperButton.disabled=false; // Allow Gamer to click the stoperButton for pause game  
    }
    else
    {
        gameStatus=false; // Don't allow Gamer to click the cards for picking up
        stoperButton.disabled=true; // Don't allow Gamer to click the stoperButton for pause game
    };
}; 

//* REMAINING CARD CALCULATOR FUNCTION
function remainingCards()
{
    if(!gameStatus && numberOfNewPlayingCards!==0)
    {
        remainingScoreInput.value=numberOfNewPlayingCards;
    }
    else if (gameStatus && numberOfNewPlayingCards>0)
    {
        numberOfNewPlayingCards=cardArea.querySelectorAll('.card').length;
        remainingScoreInput.value=numberOfNewPlayingCards;
        if(numberOfNewPlayingCards==0)
        {
            delay(50).then(()=>{
                setInputAreaGameOver();
            });
        };
    };    
};

//* PAIRED CARDS CALCULATOR FUNCTION
function pairedCards()
{
    if(gameStatus && numberOfNewPlayingCards>1)
    {
        numberOfPairedCards=cardArea.querySelectorAll('.pairedCard').length;
        correctScoreInput.value=(numberOfPairedCards/2);
        if(numberOfPairedCards==2)
        {
            delay(50).then(()=>{correctScoreInput.style.backgroundColor='green'});
        }; 
    }; 
};

//* FUNCTION THAT CALCULATE THE AMOUNT OF INCORRECT CHOOSED CARDS 
function incorrectCards()
{
    if(gameStatus && remainingScoreInput!==0)
    {    
        incorrectScoreInput.value=Number(incorrectScoreInput.value)+1;              
    };
};

//* FUNCTION THAT EXECUTE WHİLE PAUSE PROCESS 
function pauseProcess()
{
    let pauseDiv=document.createElement('div');
    pauseDiv.className='quitProcess';
    document.body.append(pauseDiv);
};

//* FUNCTION THAT QUIT THE GAME 
function quitGame(){
    pauseProcess();
    delay(100).then(()=>{
        let quitStatus=confirm('ÇIKMAK İSTEDİĞİNİZDEN EMİN MİSİNİZ?');
        if(quitStatus)
        {
            setTimeout(window.close(),500); 
        }
        else
        {
            document.body.removeChild(document.body.lastChild)
        };
    });
};

//* FUNCTION THAT CREATE PAUSE CUBE ANIMATION 
function createPauseCube()
{
    switch (gameStatus) {
        case false:
            cardArea.classList.add('cardContainerPause');
            pauseCube.classList.remove('pauseCubeNone');
            break;
        
        case true:
            cardArea.classList.remove('cardContainerPause');
            pauseCube.classList.add('pauseCubeNone');
            break;
    
        default:
            break;
    };
};

//* FUNCTION THAT START ANIMATIONS ACORDING TO GAME STATUS AT THE END OF THE GAME
function setAnimations()
{
    let banner=document.createElement('div');
    banner.className='banner';
    cardArea.append(banner);

    if(cardArea.classList.contains('cardContainerWinnerTime'))
    {
        for(let i=1;i<401;i++)
        {
            let blocks=document.createElement('div');
            blocks.className='blocksWinner';
            banner.append(blocks);
            blocks.style.animationDelay=`${i*.06}s`;
        };
    }
    else if(cardArea.classList.contains('cardContainerLoseTime'))
    {
        for(let i=1;i<401;i++)
        {
            let blocks=document.createElement('div');
            blocks.className='blocksLoser';
            banner.append(blocks);
            blocks.style.animationDelay=`${i*.06}s`;
        };
    };
    let replayButton=document.createElement('button');
    replayButton.className='commandButtons';
    replayButton.id='replayButton';
    replayButton.innerText='Yeniden Oyna';
    buttonArea.append(replayButton);
    replayButton.onclick=(()=>{
        let replayStatus=confirm('YENİDEN OYNAMAK İSTER MİSİNİZ?');
        if(replayStatus)
        {
            document.location.reload();
        }
        else
        {
            setTimeout(window.close(),500);
        };
    });
};