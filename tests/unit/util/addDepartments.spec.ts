import addDepartments from '@/util/addDepartments'
import { expect } from 'chai'

describe('util/addDepartments', () => {
  it('addDepartments', () => {
    expect(addDepartments(['dep1','dep2','dep2','dep3'],['dep1','dep4'])).to.eql(['dep1','dep2','dep2','dep3','dep1','dep4'])
  })
})
