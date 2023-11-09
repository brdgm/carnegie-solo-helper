import Departments from '@/services/Departments'
import Action from '@/services/enum/Action'
import { expect } from 'chai'

describe('services/Departments', () => {
  it('get', () => {
    const department = Departments.get('01-training-partnerships')

    expect(department).not.undefined
    expect(department?.id).to.eq('01-training-partnerships')
  })

  it('getAll', () => {
    const departments = Departments.getAll()
    expect(departments.length).eq(32)

    expect(departments.filter(item => !item.expansion).length).eq(16)
    expect(departments.filter(item => item.expansion).length).eq(16)

    expect(departments.filter(item => item.departmentType == Action.HUMAN_RESOURCES).length).eq(8)
    expect(departments.filter(item => item.departmentType == Action.MANAGEMENT).length).eq(8)
    expect(departments.filter(item => item.departmentType == Action.CONSTRUCTION).length).eq(8)
    expect(departments.filter(item => item.departmentType == Action.RESEARCH_DEVELOPMENT).length).eq(8)
  })
})
