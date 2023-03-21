/**
 * ! ASSIGNING THE VARIABLES
 */
const looney_tunes=[
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22"
],
    legendary_soccerer=[
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17"
],
    yesilcam_characters=[
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23"
];
    
var cardType,
    collectionName,
    gameLevel,
    cardArray=[];

//?***************************************************************************************?/

//* FUNCTION THAT GET THE CHOOSEN CARD TYPE AND GAME LEVEL VALUES
function getSelectedInputValue()
{
    clearInterval(countDownTimer);  //stop timer if it's runing
    setDefault(); // SET GAME SETTING AS A DEFAULT
    removeCards(); // REMOVE ALL THE CARD IF EXIST IN THE CARD AREA
    cardType=cardSelector.value;
    gameLevel=quantitySelector.value;
    setCountDown(); // set timer tiem acording to choosing game level
    if(distributerButton.hasAttribute('disabled'))
    {
        distributerButton.removeAttribute('disabled');
    };
};

//* SETTING UP THE CARD IMAGES COLLECTION
function setCollection(cardType)
{
    switch (cardType) {
        case '1':
            cardArray=looney_tunes;
            collectionName='looney_tunes';
            break;
        case '2':
            cardArray=legendary_soccerer;
            collectionName='legendary_soccerer';
            break;    
        case '3':
            cardArray=yesilcam_characters;
            collectionName='yesilcam_characters';
            break;
        default:
            break;
    };
};

//* SETTING UP THE AMOUNT OF THE PLAYING CARD IMAGES ARRAY PAIRS'
function setImages()
{
    gameLevel= Number(gameLevel); // get choosen level value (& set amount of cards)
    let selectedNumber=[];
    randomNumberCreater(cardArray,gameLevel,selectedNumber);

    // REORGANİZE THE cardArray's ELEMENTS ACORDİING TO SELECTED NUMBERS
    let tempCardArray=[];
    for (let i=0;i<selectedNumber.length;i++)
    {
        tempCardArray.push(cardArray[selectedNumber[i]])
    };
    cardArray=tempCardArray; // equal arrays
};

//* FUNCTION THAT CREATING RANDOM NUMBER TO CHOOSE ANY ARRAY'S IMAGE ELEMENT
function randomNumberCreater(arr,gameLevel,selectedNumberArr)
{
    let randomNumber= Math.floor(Math.random() * arr.length); // random number for picking up element in array
    let i=0;
    console.log(gameLevel,randomNumber)
    while(i<gameLevel)
    if(i<1)
    {
        selectedNumberArr.push(randomNumber);
        i=i+1;
    }
    else
    {
        randomNumber= Math.floor(Math.random() * arr.length); // random number for picking up element in array
        if(!selectedNumberArr.includes(randomNumber))
        {
            console.log(selectedNumberArr.includes(randomNumber))
            selectedNumberArr.push(randomNumber);
            i=i+1;
        };
    };
};

//* FUNCTION THAT CHOOSE ONE OF THE İMAGES NAMES İN THE ARRAY RANDOM
function arrayElementsMixer(array){
    let j=Math.floor(Math.random()*array.length);
    let takedCard=array[j];
    array.splice(j,1);
    return takedCard;
};

//* DUPLICATE THE PLAYING CARD IMAGES ARRAY'S ELEMENTS
function duplicate(arr)
{
    arr.forEach(e=>{
        arr.push(e);
    });
    if(gameStarterButton.hasAttribute('disabled'))
    {
        gameStarterButton.removeAttribute('disabled');
    }; 
    gameStarterButton.hidden=false; // Start button visible
    distributerButton.innerHTML='Yeniden Dağıt'; // Set Distribute button innerHTML as Re-Distribute
};