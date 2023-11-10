import * as _ from 'lodash'
import DepartmentSelectionRandomizer from '@/services/DepartmentSelectionRandomizer'
import DepartmentSelectionType from '@/services/enum/DepartmentSelectionType'
import { expect } from 'chai'

describe('services/DepartmentSelectionRandomizer', () => {
  it('BASE', () => {
    const departments = new DepartmentSelectionRandomizer(16, DepartmentSelectionType.BASE)

    expect(departments.pool.length).to.eq(32)
    expect(departments.selected.length).to.eq(16)
  })

  it('EXPANSION', () => {
    const departments = new DepartmentSelectionRandomizer(16, DepartmentSelectionType.EXPANSION)

    expect(departments.pool.length).to.eq(32)
    expect(departments.selected.length).to.eq(16)
  })

  it('EXPANSION_OPEN_BAR', () => {
    const departments = new DepartmentSelectionRandomizer(16, DepartmentSelectionType.EXPANSION_OPEN_BAR)

    expect(departments.pool.length).to.eq(32)
    expect(departments.selected.length).to.eq(16)
    expect(_.uniq(departments.selected).length).to.eq(16)
  })
})
