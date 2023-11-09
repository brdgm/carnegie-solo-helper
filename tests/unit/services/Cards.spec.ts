import Cards from '@/services/Cards'
import CardType from '@/services/enum/CardType'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get('N01')

    expect(card).not.undefined
    expect(card?.id).to.eq('N01')
  })

  it('getAll', () => {
    const normalCards = Cards.getAll(CardType.NORMAL)
    expect(normalCards.length).eq(20)
    const advancedCards = Cards.getAll(CardType.ADVANCED)
    expect(advancedCards.length).eq(20)
  })
})
