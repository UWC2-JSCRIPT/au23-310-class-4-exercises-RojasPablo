const getDeck = () => {
    const deck = []
    const suits = ['hearts', 'spades', 'clubs', 'diamonds']
  
    for (let index = 0; index < suits.length; index++) {
      const suit = suits[index]
      // create an array of 13 objects
      for (let j = 1; j <= 13; j++) {
        let displayVal = j; 
        // for each loop, push a card object to the deck
  
        // special cases for when j > 10
        switch (j) {
          case 1:
            displayVal = 'Ace'
            break;
          case 11:
            displayVal = 'Jack'
            break;
          case 12:
            displayVal = 'Queen'
            break;
          case  13:
            displayVal = 'King'
            break;
          default:
            displayVal = j;
        } 
        const card = {
          val: j,
          displayVal: displayVal,
          suit: suit,
        }
  
        if (displayVal === 'Ace') {
          card.val = 11
        }
  
        deck.push(card)
      }
    }
    return deck;
  }
  
const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
    constructor(name) {
        this.name = name;
        this.hand = []
    }
    drawCard() {
        if (blackjackDeck.length > 0){
            const randomCard = Math.floor(Math.random() * blackjackDeck.length);
            const drawnCard = blackjackDeck[randomCard]

            this.hand.push(drawnCard)
        }
    }
}; //TODO


// CREATE TWO NEW CardPlayers
const player = new CardPlayer('Player 1') // TODO
const dealer = new CardPlayer('Dealer')  // TODO

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
    let total = 0;
    let isSoft = false;

    // will iterate through each card and add the value of that card when in the hand of the player
    hand.forEach(card => {
        total += card.val;
    })
    for (const card of hand) {
        if (card.displayVal === 'Ace' && total + 10 <= 21 ) {
            isSoft = true
            break;
        }
    }

    return {
        total: total,
        isSoft: isSoft,
    }
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
    const dealerScore = calcPoints(dealerHand);
    if (dealerScore < 17) {
        return true
    }
    if (dealerScore.total === 17 && dealerScore.isSoft) {
        return true
    }
    return false

}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
    if (playerScore > dealerScore){
        return `Player 1 Won with a score of: ${playerScore}` 
    } else if (playerScore < dealerScore){
        return`Dealer Won with a score of: ${dealerScore}`
    } else {
        return `It's a tie!`
    }
// Originally wrote this, but i guess this has been implemented at the startGame() function?  
//   if (playerScore === 21 || dealerScore > 21 || playerScore > dealerScore) {
//         return `Player 1 won! Points: ${playerScore}`
//     } else if (dealerScore === 21 || playerScore > 21 || dealerScore > playerScore) {
//         return `Dealer won! Points: ${dealerScore}`
//     } else if (dealerScore > 21 && playerScore > 21) {
//         return `Both players lost! :( `
//     } else {
//         return `It's a tie!`
//     }
}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());