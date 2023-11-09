import getExpansionDepartments from '@/util/getExpansionDepartments'
import { expect } from 'chai'

describe('util/getExpansionDepartments', () => {
  it('getExpansionDepartments', () => {
    expect(getExpansionDepartments().length).to.eq(16)
  })
})
