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
    const cards = Cards.getAll()
    expect(cards.length).eq(40)
    expect(cards.filter(item => item.cardType == CardType.NORMAL).length).eq(20)
    expect(cards.filter(item => item.cardType == CardType.ADVANCED).length).eq(20)
  })
})
