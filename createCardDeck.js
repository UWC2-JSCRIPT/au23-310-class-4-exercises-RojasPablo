/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
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

// CHECKS
const deck = getDeck()
console.log(`Deck length equals 52? ${deck.length === 52}`) // reutrns true because deck.length = 52

const randomCard = deck[Math.floor(Math.random() * 52)] 

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)  // true, random card has a value

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`) // true, random card has a suit

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`) // true, card has a display value 



