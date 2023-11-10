import { expect } from 'chai'
import GroupedDepartments, { DepartmentGroup } from '@/services/GroupedDepartments'
import Action from '@/services/enum/Action'

describe('services/GroupedDepartments', () => {
  it('valid', () => {
    const departments = new GroupedDepartments([
      '07-logistics',
      '04-new-lobby',
      '04-new-lobby',
      '02-recruiting',
      '01-training-partnerships',
      '01-training-partnerships',
      '11-supply-chain',
      '20-green-spaces',
      '18-local-partners',
      '18-local-partners'
    ])

    expect(countAll(departments.groups)).to.eq(10)
    expect(countGroup(departments.groups.find(item => item.departmentType==Action.HUMAN_RESOURCES))).to.eq(8)
    expect(countGroup(departments.groups.find(item => item.departmentType==Action.MANAGEMENT))).to.eq(1)
    expect(countGroup(departments.groups.find(item => item.departmentType==Action.CONSTRUCTION))).to.eq(1)
    expect(countGroup(departments.groups.find(item => item.departmentType==Action.RESEARCH_DEVELOPMENT))).to.eq(0)
  })

  it('invalid', () => {
    const departments = new GroupedDepartments([
      'invalid-dept-01',
      'invalid-dept-02'
    ])

    expect(countAll(departments.groups)).to.eq(0)
  })
})

function countGroup(group? : DepartmentGroup) : number {
  if (!group) {
    return 0
  }
  return group.departments.reduce((count, dept) => count + dept.count, 0)
}

function countAll(groups : readonly DepartmentGroup[]) : number {
  return groups.reduce((count, group) => count + countGroup(group), 0)
}
