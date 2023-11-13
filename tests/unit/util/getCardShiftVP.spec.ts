import getCardShiftVP from '@/util/getCardShiftVP'
import { expect } from 'chai'

describe('util/getCardShiftVP', () => {
  it('getCardShiftVP', () => {
    expect(getCardShiftVP(0)).to.eq(0)
    expect(getCardShiftVP(1)).to.eq(1)
    expect(getCardShiftVP(2)).to.eq(3)
    expect(getCardShiftVP(3)).to.eq(6)
    expect(getCardShiftVP(4)).to.eq(10)
  })
})
