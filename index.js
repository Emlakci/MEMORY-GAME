/**
 * ! ASSIGNING THE VARIABLES
 */
const loadingBar=document.querySelector('.loadingBar'),
    bar=loadingBar.children[0],
    buttonArea=document.querySelector('.buttonArea'),
    startButton=document.querySelector('#begin');
var increase,
    i=0,
    userName,
    nameSpan,
    summitButton,
    error_msg,
    quitButton,
    gamer;

//? *******************************************************************************?/

//! BUTTONS' FUNCTIONS
const start=()=>{
    increase=setInterval(increaseWidth,50);
    startButton.removeAttribute('onclick');
};
function quit(){
    let quitStatus=confirm('ÇIKMAK İSTEDİĞİNİZDEN EMİN MİSİNİZ?');
    if(quitStatus)
    {
        setTimeout(window.close(),500); 
    }
};
function begin()
{
    //* CLOSE LOADING BAR & BUTTONS
    bar.style.display='none';
    buttonArea.style.display='none';
    
    //* CREATE ELEMENTS FOR INSERTING USER NAME
    userName=document.createElement('input');
    nameSpan=document.createElement('span');
    summitButton=document.createElement('button');
    userName.className='nameInput';
    userName.setAttribute('type','text');
    userName.setAttribute("required","");
    nameSpan.className='nameSpan';
    nameSpan.innerText='ADINIZI GİRİNİZ...';
    summitButton.className='begin';
    summitButton.innerText='TAMAM!';
    summitButton.setAttribute('onclick','startGame()');
    bar.insertAdjacentElement('beforebegin',userName);
    userName?.insertAdjacentElement('afterend',nameSpan);
    nameSpan?.insertAdjacentElement("afterend",summitButton);

    //* TO START INPUT'S VALIDATION CONTROLER FUNCTION
    isValid();
};
function startGame(){
    if(userName.checkValidity())
    {
        gamer=userName.value;
        sessionStorage.setItem("gamerName",gamer);
        location.replace("gamepage.html");
    }
    else
    {
        if(nameSpan.nextElementSibling?.className=='begin'||nameSpan.nextElementSibling?.className!=='error')
        {
            error_msg=document.createElement('small');
            error_msg.className='error';
            error_msg.innerText='Lütfen Adınızı Yazınız!'
            summitButton.insertAdjacentElement('beforebegin',error_msg);
         }
    }
}

//! PROCESS BAR WIDTH ATTRIBUTE INCREASER FUNCTION
function increaseWidth()
{
    if(i==100)
    {   
        //* TO REMOVE LOADING BAR INTERVAL
        clearInterval(increase);

        //* CHANGE START BUTTON FUNCTIONALITY
        startButton.setAttribute('onclick','begin()')
        startButton.innerHTML='BAŞLAYALIM =>';

        //* CHANGE LOADING BAR STYLE
        bar.style.borderColor='#333';
        
        //* CREATE THE 'QUITE BUTTON'
        quitButton=document.createElement('button'); 
        quitButton.className='begin';
        quitButton.innerHTML='ÇIKIŞ';
        buttonArea.insertAdjacentElement('beforeend',quitButton);            
        quitButton.setAttribute('onclick','quit()');
    };
    if(i<100)
    {
        bar.innerHTML=`${i+1}%`
        bar.style.width=`${i+1}%`
        i++;
    };
};

//! CHECK NAME INPUT VALIDATION
function isValid(){
    userName.addEventListener('keyup',()=>{
        if(!userName.checkValidity())
        {
            if(nameSpan.nextElementSibling?.className=='begin'|| nameSpan.nextElementSibling?.className!=='error')
            {
                error_msg=document.createElement('small');
                error_msg.className='error';
                error_msg.innerText='Lütfen Adınızı Yazınız!'
                summitButton.insertAdjacentElement('beforebegin',error_msg);
            };
        }    
        else
        {
            if(userName.value.length>0 && nameSpan.nextElementSibling.className=='error')
            {
                nameSpan.nextElementSibling.remove();
            }   
        };
    });
};