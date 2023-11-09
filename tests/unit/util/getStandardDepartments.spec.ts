import getStandardDepartments from '@/util/getStandardDepartments'
import { expect } from 'chai'

describe('util/getStandardDepartments', () => {
  it('getStandardDepartments', () => {
    expect(getStandardDepartments().length).to.eq(16)
  })
})
