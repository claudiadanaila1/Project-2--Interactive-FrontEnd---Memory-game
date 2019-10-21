
class MatchGame {
    constructor () {
    this.cards = Array.from(document.getElementsByClassName('memory-card'));
    this.cardsToCheck = [];
    this.cardsFlipped = 0; // click event remove
    this.cardsMatched = [];


    this.cards.forEach(card => {
        card.addEventListener('click', () => {
            this.handleClickCard(card);
        });
    });
    
    }

    handleClickCard(card) {
        // check if card is matched
        
        // route 1 -> card is already matched 
        // route 2 -> card is not matched
     
        this.flipCard(card)
        this.cardsToCheck.push(card)
        
        if (this.cardsToCheck.length === 2) {
            
            const matchFound = this.checkForMatch()
            
            if (matchFound) {
            
            this.cardsMatched.push(...this.cardsToCheck);  
            this.cardsToCheck[0].removeEventListener('click',this.flipCard);
            this.cardsToCheck[1].removeEventListener('click', this.flipCard);
            } else {
                this.flipCard(this.cardsToCheck[0]);
                this.flipCard(this.cardsToCheck[1]);
            }
            this.cardsToCheck = []
        }
    }
    
    checkForMatch() {
        // if match: store the matched cards
        var dataAttr1 = this.cardsToCheck[0].getAttribute('data-card');
        var dataAttr2= this.cardsToCheck[1].getAttribute("data-card");
        
        if (dataAttr1 === dataAttr2){
            return true
        }
        
        return false
    }
    
    flipCard(card){
    // if this card is clicked add flip
    // check if card has 'flip' class
   if (card.classList.contains('flip')){
       card.classList.remove("flip");
   }else{
       card.classList.add("flip");
   };
   
    
}

}






function ready () {
    let textGame = Array.from(document.getElementsByClassName('text-game'));
    let game = new MatchGame();

    textGame.forEach(textGame => {
        textGame.addEventListener('click', () => {
            textGame.classList.remove('visible');
            game.startGame();
        });
    });
    
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

