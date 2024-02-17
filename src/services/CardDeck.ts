import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import DifficultyLevel from './enum/DifficultyLevel'
import CardType from './enum/CardType'

export default class CardDeck {

  private _pile : Card[]
  private _discardPile : Card[][]

  public constructor(pile : Card[], discardPile : Card[][]) {
    this._pile = pile
    this._discardPile = discardPile
  }

  public get currentCard() : Card|undefined {
    return this._pile[0]
  }

  public get nextCard() : Card|undefined {
    return this._pile[1]
  }

  public get pile() : readonly Card[] {
    return this._pile
  }

  public get discardPile() : readonly Card[][] {
    return this._discardPile
  }

  /**
   * Discards the current card, and puts it on the discard pile moved the given number of steps to the right.
   * @param moveRight Steps to move card to the right
   */
  public discardCurrentCard(moveRight : number) : void {
    const currentCard = this._pile.shift()
    if (!currentCard) {
      throw new Error('Draw pile is empty.')
    }
    let selectedDiscardPile = this._discardPile[moveRight]
    if (!selectedDiscardPile) {
      this._discardPile[moveRight] = selectedDiscardPile = []
    }
    selectedDiscardPile.push(currentCard)
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.map(card => card.id),
      discardPile: this._discardPile.map(slot => slot.map(card => card.id))
    }
  }

  /**
   * Creates a shuffled new card deck.
   */
  public static new(difficultyLevel : DifficultyLevel) : CardDeck {    
    const normalCards = shuffle(Cards.getByType(CardType.NORMAL))
    const advancedCards = shuffle(Cards.getByType(CardType.ADVANCED))
    const pile : Card[] = []
    switch (difficultyLevel) {
      case DifficultyLevel.BEGINNER:
        pile.push(...normalCards)
        break
      case DifficultyLevel.NORMAL:
        pile.push(...normalCards.slice(0, 15))
        pile.push(...advancedCards.slice(0, 5))
        break
      case DifficultyLevel.DIFFICULT:
        pile.push(...normalCards.slice(0, 10))
        pile.push(...advancedCards.slice(0, 10))
        break
      case DifficultyLevel.EXPERT:
        pile.push(...normalCards.slice(0, 5))
        pile.push(...advancedCards.slice(0, 15))
        break
      default:
        throw new Error(`Invalid difficulty level ${difficultyLevel}`)
    }
    return new CardDeck(shuffle(pile), [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.pile.map(Cards.get),
      persistence.discardPile.map(slot => (slot ?? []).map(Cards.get))
    )
  }

}
