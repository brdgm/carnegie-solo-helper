import * as _ from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import DifficultyLevel from './enum/DifficultyLevel'
import CardType from './enum/CardType'

export default class CardDeck {

  private _pile : Card[]
  private _discard : Card[][]

  public constructor(pile : Card[], discard : Card[][]) {
    this._pile = pile
    this._discard = discard
  }

  public get currentCard() : Card {
    return this._pile[0]
  }

  public get pile() : readonly Card[] {
    return this._pile
  }

  public get discard() : readonly Card[][] {
    return this._discard
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.map(card => card.id),
      discard: this._discard.map(slot => slot.map(card => card.id))
    }
  }

  /**
   * Creates a shuffled new card deck.
   */
  public static new(difficultyLevel : DifficultyLevel) : CardDeck {    
    const normalCards = _.shuffle(Cards.getAll(CardType.NORMAL))
    const advancedCards = _.shuffle(Cards.getAll(CardType.ADVANCED))
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
    return new CardDeck(_.shuffle(pile), [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.pile.map(Cards.get),
      persistence.discard.map(slot => slot.map(Cards.get))
    )
  }

}
