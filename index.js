document.addEventListener('DOMContentLoaded', () => {
    const images = [
        {
            name: 'cheseeburger',
            img: 'images/cheeseburger.png'
        },
        {
            name:'fries',
            img: 'images/fries.png'
        },
        {
            name:'hotdog',
            img:'images/hotdog.png'
        },
        {
            name:'ice cream',
            img:'images/ice-cream.png'
        },
        {
            name:'milkshake',
            img:'images/milkshake.png'
        },
        {
            name:'pizza',
            img:'images/pizza.png'
        },
        {
            name: 'cheseeburger',
            img: 'images/cheeseburger.png'
        },
        {
            name:'fries',
            img: 'images/fries.png'
        },
        {
            name:'hotdog',
            img:'images/hotdog.png'
        },
        {
            name:'ice cream',
            img:'images/ice-cream.png'
        },
        {
            name:'milkshake',
            img:'images/milkshake.png'
        },
        {
            name:'pizza',
            img:'images/pizza.png'
        }
    ]
                                                          // SORT ARRAY RANDOMLY
    images.sort(() => 0.5 - Math.random())               // this creates -ve & +ve number (Math.random is 0-1)
    console.log(images)

    const grid = document.querySelector('.grid')        //put the random images into grid. CREATE GAME BOARD
    const result = document.querySelector('#result')
    let cardsChosen = []                                // array empty at first because you haven't click on any card
    let cardsChosenIds = []
    let cardsWon = []

    function createBoard() {
        for(let i=0; i<images.length; i++){               // for loop. all 12 images
            const card = document.createElement('img')    // create HTML element <img>
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('data-id', i)               // every images id & index 0-11
            card.addEventListener('click', flipCard)      // ADD A FLIP FUNCTION WHEN CLICKED
            grid.appendChild(card)                        // put card in grid                 
        }
    }
    function flipCard() {
        let cardId = this.getAttribute('data-id')         // this is what we click
                                                          // once clicked, it needs to be stored somewhere. create an array (line 58)
        //console.log(images[cardId])
        cardsChosen.push(images[cardId].name)             // we just want to store the name in the cardsChosen[] not data-id too.
        //console.log(cardsChosen)
        cardsChosenIds.push(cardId)                       // store data-id in new array (line 59)        
                                                          // FLIP CARD WHEN CLICKED
        this.setAttribute('src', images[cardId].img)      // override line 63
                                                          // CHOOSE TWO, COMPARE. NO MATCH, START AGAIN
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
        // console.log(cardsChosenIds)
    }
    function checkForMatch() {
        const cards = document.querySelectorAll('img')        // re-grab the images
        const chosenOne = cardsChosenIds[0]
        const chosenTwo = cardsChosenIds[1]
        const firstCard = cardsChosen[0]
        const secondCard = cardsChosen[1]
        
        if (chosenOne === chosenTwo) {
            alert('You have clicked the same image!')
            cards[chosenOne].setAttribute('src', 'images/blank.png')
            cards[chosenTwo].setAttribute('src', 'images/blank.png')
        }
        else if (firstCard === secondCard) {
            alert('You have found a match!')
            cards[chosenOne].setAttribute('src', 'images/white.png')
            cards[chosenTwo].setAttribute('src', 'images/white.png')
            cards[chosenOne].removeEventListener('click', flipCard)
            cards[chosenTwo].removeEventListener('click', flipCard)

            cardsWon.push(cardsChosen)                      // remove the winning cards into new array (line 60)
        }
        else {
            cards[chosenOne].setAttribute('src', 'images/blank.png')
            cards[chosenTwo].setAttribute('src', 'images/blank.png')
            alert('Sorry, try again!')
        }
        cardsChosen = []                                    // make them empty again
        cardsChosenIds = []
                                                            // now make a variable for result (line 57)
        result.textContent = cardsWon.length                // can use innerHTML or textContent 
        if (cardsWon.length === images.length / 2) {        // 2 set of 6 images
            result.textContent = 'Congratulations! You have won!'
        }

        console.log(cardsChosen)
        console.log(cardsWon)
    }
    createBoard()     // call it
})
