import City from '@/services/enum/City'
import Region from '@/services/enum/Region'
import getCityMetadata from '@/util/getCityMetadata'
import { expect } from 'chai'

describe('util/getCityMetadata', () => {
  it('getCityMetadata', () => {
    expect(getCityMetadata(City.SAN_FRANCISCO)).to.eql({ region: Region.WEST, slots: 5 })
    expect(getCityMetadata(City.NEW_YORK)).to.eql({ region: Region.EAST, slots: 5 })
    expect(getCityMetadata(City.CHICAGO)).to.eql({ region: Region.MIDWEST, slots: 5 })
    expect(getCityMetadata(City.NEW_ORLEANS)).to.eql({ region: Region.SOUTH, slots: 5 })
  })
})
