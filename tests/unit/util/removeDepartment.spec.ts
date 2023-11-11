import removeDepartment from '@/util/removeDepartment'
import { expect } from 'chai'

describe('util/removeDepartment', () => {
  it('remove single', () => {
    expect(removeDepartment(['dep1','dep2','dep3'],'dep2')).to.eql(['dep1','dep3'])
  })

  it('remove multiple', () => {
    expect(removeDepartment(['dep1','dep2','dep2','dep3'],'dep2')).to.eql(['dep1','dep2','dep3'])
  })

  it('remove non-existing', () => {
    expect(removeDepartment(['dep1','dep2','dep2','dep3'],'dep4')).to.eql(['dep1','dep2','dep2','dep3'])
  })
})
