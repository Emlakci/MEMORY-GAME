/**
 * ! ASSIGNING THE VARIABLES
 */
let newPlayingCards=[],// store all playing cards 
    selectedCards=[], // store choosen cards for doing sth.
    pickerArray=[], // store card's id.s
    numberOfNewPlayingCards=0, // how many card exist in the card area
    numberOfPairedCards, // how many cards paired
    numberOfIncorrectCards=0, // how many cards choosed incorrect
    numberOfClickedCards; // number of click
    
//?***************************************************************************************?/

/**
 * ! ADD PROPERTİES TO HTMLELEMENT'S PROTOTYPE
 */

HTMLElement.prototype.generateCard=function(idName,cardID,cardNumber,bgimg,selectionStatus,status)
{
    card=document.createElement('div');
    card.className='card';
    card.id=idName;
    cardArea.append(card);
    card.cardID=cardID;
    card.innerHTML=cardNumber;
    card.bgimg=bgimg;
    card.selectionStatus=selectionStatus;
    card.status=status;
    card.addEventListener('click',(card)=>{
        clicked(card.target)
    })
};

//?***************************************************************************************?/

//* CLEAR CARD AREA
function removeCards()
{
    newPlayingCards?.forEach((card)=>{
        card.remove(); 
    });
    cardArea.querySelectorAll('.card')?.forEach((card)=>{
        card.remove();
    });
};

//* CREATE THE PLAYING CARD
function cardCreater()
{
let imageSelector,
    urlName,
    repetition=(2*gameLevel),
    url=`url(./pics/${collectionName}/`;

    for(let i=1;i<=repetition;i++)
    {
        imageSelector=arrayElementsMixer(cardArray);
        urlName=`${url}${imageSelector}.jpg)`;
        document.body.generateCard(`card_${i}`,`card_${i}`,i,urlName,false,'backside');        
    };
    newPlayingCards=[...cardArea.children];
    // declare how many card exist in the card area and display in input
        numberOfNewPlayingCards=newPlayingCards.length;
        remainingCards();
    distributerButton.setAttribute('disabled',''); // Disable distribute function
    gameStarterButton.setAttribute('disabled',''); // Disable game start function
};        

//* FUNCTION THAT SELECT THE CARD
function clicked(card)
{
    card.selectionStatus=true;

    if(gameStatus && (pickerArray.length<2 && card.className!=='pairedCard'))
    {
        if(card.cardID!==pickerArray[0] && card.cardID!==pickerArray[1])
        {
            numberOfClickedCards=Number(clickedScoreInput.value)+1;
            clickedScoreInput.value=numberOfClickedCards;
            pickerArray.push(card.cardID);
            selectedCards.push(card);
            changeCardStatus(card);
            openClose(card);
            if(pickerArray.length==2)
            {
                delay(1000).then(()=>{compare(selectedCards)})
            };
        };
    }
    else
    {
        // execute compare function is running or click paired cards
        console.log(`You can't select a new card until; choosen cards compared or game will start`) // shown in console log
    };    
};

//* FUNCTION THAT ALL CARDS OPEN THEN CLOSED FOR TO BE MEMORIZED
function openCloseAll(card)
{
    newPlayingCards.forEach(card=>{
    changeCardStatus(card);
    delay(2000).then(()=>openClose(card))
        .then(()=>delay(1000*gameLevel))
            .then(()=>changeCardStatus(card))
                .then(()=>openClose(card))       
    });
};

//* FUNCTION THAT CHANGE THE CARD STATUS
function changeCardStatus(card)
{
    switch (card.status) 
    {
        case 'backside':
            card.status='frontside';
            card.selectionStatus=true;
            break;
            
        case 'frontside':
            card.status='backside';
            card.selectionStatus=true;
            break;
                                        
        default:
            break;
    };
};

//* FUNCTION THAT PROVIDE  THE CARD' FRONTSIDE BEING OPEN OR CLOSE 
function openClose(card)
{
    if(card.selectionStatus)
    {
        switch (card.status) 
        {
            case 'backside':
                card.removeAttribute('style');
                card.selectionStatus=false;
                break;

            case 'frontside':
                card.setAttribute('style',`background-image:${card.bgimg}`);
                break;

            case 'paired':
                card.removeAttribute('style');
                card.className='pairedCard';
                card.selectionStatus=false;
                break;
        
            default:
                break;
        };
    };
};

//* FUNCTION THAT COMPARE THE CARDS INSIDE 'selected Array' IF THEY ARE PAİR OR NOT
function compare(arr)
{
    if(arr[0].bgimg===arr[1].bgimg)
    {
        arr.forEach((card)=>{
            card.status='paired';
            openClose(card);         
        });
        pairedCards();
        delay(50).then(()=>{
            remainingCards();
        });
    }
    else
    {
        incorrectCards();
        arr.forEach((card)=>{
            card.status='backside';
            openClose(card);            
        });
    };
    selectedCards=[]; // clear array inside for new comparing 
    pickerArray=[]; // clear array inside for new comparing
};

   