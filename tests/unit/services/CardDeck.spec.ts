import CardDeck from '@/services/CardDeck'
import CardType from '@/services/enum/CardType'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new_BEGINNER', () => {
    const deck = CardDeck.new(DifficultyLevel.BEGINNER)

    expect(deck.pile.length, 'pile size').to.eq(20)
    expect(deck.pile.filter(card => card.cardType == CardType.NORMAL).length, 'normal cards').to.eq(20)
    expect(deck.pile.filter(card => card.cardType == CardType.ADVANCED).length, 'normal cards').to.eq(0)
    expect(deck.discardPile.length, 'discard size').to.eq(0)
    expect(deck.currentCard, 'current card').to.not.undefined
    
    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(20)
    expect(persistence.discardPile.length, 'discard size').to.eq(0)
  })

  it('new_NORMAL', () => {
    const deck = CardDeck.new(DifficultyLevel.NORMAL)

    expect(deck.pile.length, 'pile size').to.eq(20)
    expect(deck.discardPile.length, 'discard size').to.eq(0)
    expect(deck.pile.filter(card => card.cardType == CardType.NORMAL).length, 'normal cards').to.eq(15)
    expect(deck.pile.filter(card => card.cardType == CardType.ADVANCED).length, 'normal cards').to.eq(5)
  })

  it('new_DIFFICULT', () => {
    const deck = CardDeck.new(DifficultyLevel.DIFFICULT)

    expect(deck.pile.length, 'pile size').to.eq(20)
    expect(deck.discardPile.length, 'discard size').to.eq(0)
    expect(deck.pile.filter(card => card.cardType == CardType.NORMAL).length, 'normal cards').to.eq(10)
    expect(deck.pile.filter(card => card.cardType == CardType.ADVANCED).length, 'normal cards').to.eq(10)
  })

  it('new_EXPERT', () => {
    const deck = CardDeck.new(DifficultyLevel.EXPERT)

    expect(deck.pile.length, 'pile size').to.eq(20)
    expect(deck.discardPile.length, 'discard size').to.eq(0)
    expect(deck.pile.filter(card => card.cardType == CardType.NORMAL).length, 'normal cards').to.eq(5)
    expect(deck.pile.filter(card => card.cardType == CardType.ADVANCED).length, 'normal cards').to.eq(15)
  })

  it('discardCurrentCard', () => {
    const deck = CardDeck.fromPersistence({pile:['N01','N02','N03','N04'], discardPile:[]})

    expect(deck.pile.length, 'pile size').to.eq(4)

    deck.discardCurrentCard(2)
    deck.discardCurrentCard(0)
    deck.discardCurrentCard(0)
    deck.discardCurrentCard(3)

    const persistence = deck.toPersistence()
    expect(persistence.pile).to.eql([])
    expect(persistence.discardPile[0]).to.eql(['N02','N03'])
    expect(persistence.discardPile[1]).to.undefined
    expect(persistence.discardPile[2]).to.eql(['N01'])
    expect(persistence.discardPile[3]).to.eql(['N04'])
  })
})
