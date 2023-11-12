import Department from './Department'
import Departments from './Departments'
import Action from './enum/Action'

/**
 * Groups departments by department type.
 */
export default class GroupedDepartments {

  private readonly _groups : DepartmentGroup[]

  /**
   * @param departments Departments
   */
  constructor(departments : readonly string[]) {
    const allDepartments = Departments.getAll()
    this._groups = this.createGroups(departments, allDepartments)
  }

  public get groups() : readonly DepartmentGroup[] {
    return this._groups
  }

  private createGroups(departments : readonly string[], allDepartments : Department[]) : DepartmentGroup[] {
    const result : DepartmentGroup[] = []
    Object.values(Action).forEach(departmentType => {
      const departmentGroup : DepartmentGroup = { departmentType, departments: [] }
      result.push(departmentGroup)
      allDepartments.filter(item => item.departmentType == departmentType).forEach(department => {
        const count = departments.filter(id => id == department.id).length
        if (count > 0) {
          departmentGroup.departments.push({ department, count })
        }
      })
    })
    return result
  }

}

export interface DepartmentGroup {
  departmentType: Action
  departments: DepartmentCount[]
}
export interface DepartmentCount {
  department: Department
  count: number
}
