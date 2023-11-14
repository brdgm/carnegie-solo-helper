import BlockDonationCityRandomizer from '@/services/BlockDonationCityRandomizer'
import { expect } from 'chai'

describe('services/BlockDonationCityRandomizer', () => {
  it('randomize', () => {
    const randomizer = new BlockDonationCityRandomizer(18)

    const totalDisks = randomizer.donationsDisks.length
        + randomizer.cityDisks.reduce((count, cityDisks) => count + cityDisks.count, 0)
    expect(totalDisks).to.eq(18)
  })
})
