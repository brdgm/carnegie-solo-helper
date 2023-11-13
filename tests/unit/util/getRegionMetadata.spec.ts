import Region from '@/services/enum/Region'
import getRegionMetadata from '@/util/getRegionMetadata'
import { expect } from 'chai'

describe('util/getRegionMetadata', () => {
  it('getRegionMetadata', () => {
    expect(getRegionMetadata(Region.EAST).backgroundColor).to.eq('#886088')
    expect(getRegionMetadata(Region.MIDWEST).backgroundColor).to.eq('#c1503d')
    expect(getRegionMetadata(Region.SOUTH).backgroundColor).to.eq('#64a86c')
    expect(getRegionMetadata(Region.WEST).backgroundColor).to.eq('#c2b59b')
  })
})
