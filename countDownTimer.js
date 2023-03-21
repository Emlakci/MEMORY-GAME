/**
 * ! ASSIGNING THE VARIABLES
 */
let minute,
    totalSecond,
    countDownTimer; // FOR INTERVAL ID

stoperButton.disabled=true; // pause button is deactive at the begining of the game

//?***************************************************************************************?/

//? SETTING UP THE TİMER

//* FUNCTION THAT SET TİMER TİME ACORDING TO GAME LEVEL
function setCountDown()
{
    clearInterval(countDownTimer);
    countDownTimerInput.style.color='#43477E'
    totalSecond=(Number(gameLevel)*10);
    updateTimer();
};

//* FUNCTION THAT UPDATE THE TIMER VALUE
function updateTimer()
{
    if(totalSecond==0)
    {
        countDownTimerInput.classList.remove('danger');
        countDownTimerInput.value='Süre Bitti!';
        countDownTimerInput.style.color='#fff';
        countDownTimerInput.style.backgroundColor='red';
    }
    else
    {
        if(totalSecond<=15)
        {
            countDownTimerInput.style.color='darkred';
            countDownTimerInput.classList.add('danger');
        };
        minute=String(Math.floor(totalSecond/60)).padStart(2,0);
        second=String(Math.floor(totalSecond%60)).padStart(2,0);
        countDownTimerInput.value=`${minute} : ${second}`;
    };
};

//* FUNCTION THAT START TİMER
function startStopCountDown()
{
    if(gameStatus)
    {
        let checker=Number(remainingScoreInput.value);
        totalSecond=totalSecond-1;
        switch (true) 
        {
            case (checker>0 && totalSecond>0):
                updateTimer();
                break;

            case (checker==0 && totalSecond>=0):
                gameStatus=false;
                updateTimer();
                clearInterval(countDownTimer);
                removeCards();
                stoperButton.disabled=true; 
                cardArea.classList.add('cardContainerWinnerTime');
                setInputAreaGameOver();
                setAnimations();
                break;

            case (checker>0 && totalSecond==0):
                gameStatus=false;
                updateTimer();
                clearInterval(countDownTimer);
                removeCards();
                stoperButton.disabled=true; 
                cardArea.classList.add('cardContainerLoseTime');
                setInputAreaGameOver();
                setAnimations();
                break;

            default:
                break;
        };
    };
};

//* FUNCTION THAT STOP THE GAME AND TİME FOR A WHİLE
function pauseTimer()
{
    stoperButton.innerHTML=stoperButton.innerHTML==='Durdur'? 'Devam Et' : 'Durdur';
    gameStatus=gameStatus==true?false:true;
    switch (gameStatus) {
        case false:
            clearInterval(countDownTimer);
            countDownTimerInput.classList.add('pause');
            createPauseCube();
            break;
        
        case true:
            countDownTimer=setInterval(startStopCountDown,1000);
            countDownTimerInput.classList.remove('pause');
            createPauseCube();
    
        default:
            break;
    };
};