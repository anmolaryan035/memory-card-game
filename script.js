let cardsArray = [
    {
        'name' : 'css',
        'img' : 'coder.jpg',
    },
    {
        'name' : 'html',
        'img' : 'html.jpg',
    },
    {
        'name' : 'jQuery',
        'img' : 'jquery.jpg',
    },
    {
        'name' : 'js',
        'img' : 'css.jpg',
    },
    {
        'name' : 'node',
        'img' : 'node.jpg',
    },
    {
        'name' : 'python',
        'img' : 'python.jpg',
    }
];

let timer = 0;
let timerInterval = null;
let gameStarted = false;
let totalMatchedPairs = 0;
const totalPairs = cardsArray.length; // 6
//timer function

const startTimer = () => {
    if (!gameStarted) {
        gameStarted = true;
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById("timer").innerText = timer;
        }, 1000);
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    gameStarted = false;
};

const resetTimer = () => {
    clearInterval(timerInterval);
    timer = 0;
    document.getElementById("timer").innerText = timer;
    gameStarted = false;
};


const parentDiv = document.querySelector('#card-section');

//step 2chatgpt
const gameCard = cardsArray.concat(cardsArray)

//step 3
const myNumbers = (array) => {
    for(let i = array.length-1 ; i>0 ; i--){
        let j = Math.floor(Math.random()*(i+1))

        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array;
}
let shuffledChild = myNumbers(gameCard);


let clickCount = 0;
let firstCard = "";
let secondCard = "";

//styling
const card_matches = () => {
    let card_selected = document.querySelectorAll('.card_selected');
    card_selected.forEach((curElem) => {
        curElem.classList.add('card_match');
    })
    totalMatchedPairs++;

    if (totalMatchedPairs === totalPairs) {
        stopTimer();
        setTimeout(() => {
            alert("🎉 You won the game!");
        }, 300);
    }
}

//step 7
const resetGame = () =>{
    firstCard = "";
    secondCard = "";
    clickCount = 0;

    let card_selected = document.querySelectorAll('.card_selected');
    card_selected.forEach((curElem) => {
        curElem.classList.remove('card_selected');


    })
}

let moves = 0;
parentDiv.addEventListener('click',(event)=>{
    let curCard = event.target;

    if (curCard.id === "card-section" || curCard.parentNode.classList.contains("card_match") || curCard.parentNode.classList.contains("card_selected")) {
        return;
    }

    // Start timer when first card is clicked
    startTimer();

    clickCount ++;
    if(clickCount < 3){
        if(clickCount === 1){
            firstCard = curCard.parentNode.dataset.name;
            curCard.parentNode.classList.add('card_selected');
            
            
        }
        else{
            secondCard = curCard.parentNode.dataset.name;
            curCard.parentNode.classList.add('card_selected');
        
            
        }
        if(firstCard !=="" && secondCard !==""){
            if( firstCard === secondCard){
                
                // curCard.classList.add('card_match')
                setTimeout(()=>{
                    card_matches();
                    resetGame();
                },1000)
                
            }
            else{

            // ✅ Only here we increment moves (when it's NOT a match)
            moves++;
            document.getElementById("moves").innerHTML = `<span>Moves : </span>${moves}`;

                setTimeout(()=>{
                    resetGame();
                },1000)
            }
        }
        

    }
    


    
})
//render  card
function renderCards() {
    parentDiv.innerHTML = "";
    shuffledChild = myNumbers(cardsArray.concat(cardsArray));

    for (let i = 0; i < shuffledChild.length; i++) {
        const childDiv = document.createElement('div');
        childDiv.classList.add('card');
        childDiv.dataset.name = shuffledChild[i].name;

        const front_Div = document.createElement('div');
        front_Div.classList.add('front_card');

        const back_Div = document.createElement('div');
        back_Div.classList.add('back_card');
        back_Div.style.backgroundImage = `url(${shuffledChild[i].img})`;

        parentDiv.appendChild(childDiv);
        childDiv.appendChild(front_Div);
        childDiv.appendChild(back_Div);
    }
}


//restart 

document.getElementById("restart").addEventListener("click", () => {
    moves = 0;
    clickCount = 0;
    firstCard = "";
    secondCard = "";
    totalMatchedPairs = 0;
    resetTimer();
    document.getElementById("moves").innerHTML = `<span>Moves : </span>${moves}`;
    renderCards(); // ♻️ reload new shuffled cards
});

renderCards(); // render once on load


// document.getElementById("restart").addEventListener("click", () => {
//     // Reset everything
//     parentDiv.innerHTML = "";
//     moves = 0;
//     clickCount = 0;
//     firstCard = "";
//     secondCard = "";
//     totalMatchedPairs = 0;
//     resetTimer();
//     document.getElementById("moves").innerHTML = `<span>Moves : </span>${moves}`;

//     // 💡 Shuffle new set
//     shuffledChild = myNumbers(cardsArray.concat(cardsArray));

//     // Recreate cards
//     for (let i = 0; i < shuffledChild.length; i++) {
//         const childDiv = document.createElement('div');
//         childDiv.classList.add('card');
//         childDiv.dataset.name = shuffledChild[i].name;

//         const front_Div = document.createElement('div');
//         front_Div.classList.add('front_card');

//         const back_Div = document.createElement('div');
//         back_Div.classList.add('back_card');
//         back_Div.style.backgroundImage = `url(${shuffledChild[i].img})`;

//         parentDiv.appendChild(childDiv);
//         childDiv.appendChild(front_Div);
//         childDiv.appendChild(back_Div);
//     }
// });

// document.getElementById("restart").addEventListener("click", () => {
//     // Reset everything
//     parentDiv.innerHTML = "";           // Clear board
//     moves = 0;
//     clickCount = 0;
//     firstCard = "";
//     secondCard = "";
//     totalMatchedPairs = 0;
//     resetTimer();
//     document.getElementById("moves").innerText = moves;


// //step4
// for(let i=0 ; i<shuffledChild.length;i++){
//     const childDiv = document.createElement('div')
//     childDiv.classList.add('card')
//     childDiv.dataset.name = shuffledChild[i].name;
    
//     const front_Div = document.createElement('div');
//     front_Div.classList.add('front_card')

//     const back_Div = document.createElement('div');
//     back_Div.classList.add('back_card')
//     back_Div.style.backgroundImage = `url(${shuffledChild[i].img})`;


//     parentDiv.appendChild(childDiv);
//     childDiv.appendChild(front_Div);
//     childDiv.appendChild(back_Div);
// }
// });
