import Donation from '@/services/enum/Donation'
import getDonationMetadata from '@/util/getDonationMetadata'
import { expect } from 'chai'

describe('util/getDonationMetadata', () => {
  it('getDonationMetadata', () => {
    expect(getDonationMetadata(Donation.EDUCATION_DEPARTMENT_CONSTRUCTION)).to.eql({ column: 1, row: 3 })
    expect(getDonationMetadata(Donation.HUMAN_RIGHTS_PROJECT_INDUSTRY)).to.eql({ column: 2, row: 2 })
    expect(getDonationMetadata(Donation.WELFARE_MONEY)).to.eql({ column: 3, row: 3 })
    expect(getDonationMetadata(Donation.HEALTH_CONSTRUCTION_WEST)).to.eql({ column: 4, row: 4 })
  })
})
