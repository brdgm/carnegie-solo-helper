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
    const normalCards = Cards.getAll()
    expect(normalCards.length).eq(40)
  })

  it('getAllByType', () => {
    const normalCards = Cards.getAllByType(CardType.NORMAL)
    expect(normalCards.length).eq(20)
    const advancedCards = Cards.getAllByType(CardType.ADVANCED)
    expect(advancedCards.length).eq(20)
  })
})
