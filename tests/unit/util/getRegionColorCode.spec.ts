import Region from '@/services/enum/Region'
import getRegionColorCode from '@/util/getRegionColorCode'
import { expect } from 'chai'

describe('util/getRegionColorCode', () => {
  it('getRegionColorCode', () => {
    expect(getRegionColorCode(Region.EAST)).to.eq('#886088')
    expect(getRegionColorCode(Region.MIDWEST)).to.eq('#c1503d')
    expect(getRegionColorCode(Region.SOUTH)).to.eq('#64a86c')
    expect(getRegionColorCode(Region.WEST)).to.eq('#c2b59b')
  })
})
