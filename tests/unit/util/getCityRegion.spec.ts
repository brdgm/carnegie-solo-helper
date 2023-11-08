import City from '@/services/enum/City'
import Region from '@/services/enum/Region'
import getCityRegion from '@/util/getCityRegion'
import { expect } from 'chai'

describe('util/getCityRegion', () => {
  it('getCityRegion', () => {
    expect(getCityRegion(City.SAN_FRANCISCO)).to.eq(Region.WEST)
    expect(getCityRegion(City.NEW_YORK)).to.eq(Region.EAST)
    expect(getCityRegion(City.CHICAGO)).to.eq(Region.MIDWEST)
    expect(getCityRegion(City.NEW_ORLEANS)).to.eq(Region.SOUTH)
  })
})
