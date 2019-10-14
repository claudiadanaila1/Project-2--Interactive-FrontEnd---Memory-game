// the Match Game function which contains all functionality of the game
class MatchGame {
    constructor (cards, totalTime){
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
    }
    // start game function initiate the game
    startGame(){
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(function ()  {
            this.shuffle();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
       
    }
    
    // hide the cards when they are not clicked
    
   hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('flip');
        });
    }

 // flip card function 
 
  flipCard(card) {
      if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('flip');

            if(this.cardToCheck)
                this.checkForMatch(card);
            else
                this.cardToCheck = card;
        
        }
  }
  
   // checking for match
   
  checkForMatch(card) {
        if(this.getAttribute('data-card') === this.getAttribute(this.cardToCheck)){
            this.cardMatch(card, this.cardToCheck);
       } else {
            this.disableCards(card, this.cardToCheck);
}
        this.cardToCheck = null;
    }
    
    // card match pushes matched cards to an array
    
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        if(this.matchedCards.length === this.cardsArray.length)
        this.victory(); 
    }
    
    // disable cards when they are not a match
    
    disableCards(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            this.busy = false;
        }, 1000);
    }
    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countDown);
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countDown);
        document.getElementById('victory-text').classList.add('visible');
    }

    shuffle () {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
    
}

function ready() {
    let textGame = Array.from(document.getElementsByClassName('text-game'));
    let cards = Array.from(document.getElementsByClassName('memory-card'));
    let game = new MatchGame(100, cards);

    textGame.forEach( function(textGame) {
        textGame.addEventListener('click', function () {
            textGame.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(function (card) {
    card.addEventListener('click', function () {
        game.flipCard(card);
    });
});
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}
