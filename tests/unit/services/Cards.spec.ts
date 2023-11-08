import Cards from '@/services/Cards'
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
  })
})
