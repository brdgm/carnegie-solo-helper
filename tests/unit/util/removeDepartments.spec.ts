import removeDepartments from '@/util/removeDepartments'
import { expect } from 'chai'

describe('util/removeDepartments', () => {
  it('remove single list', () => {
    expect(removeDepartments(['dep1','dep2','dep2','dep3'],['dep2','dep3'])).to.eql(['dep1','dep2'])
  })

  it('remove multiple lists', () => {
    expect(removeDepartments(['dep1','dep2','dep2','dep3'],['dep2','dep3'],['dep1'])).to.eql(['dep2'])
  })
})
