import * as _ from 'lodash'
import DepartmentSelectionType from './enum/DepartmentSelectionType'
import Department from './Department'
import Departments from './Departments'
import Action from './enum/Action'

export default class DepartmentSelectionRandomizer {

  private readonly _pool : Department[]
  private readonly _selected : Department[]

  /**
   * @param count Number of departments to pick (16 for two players or solo)
   * @param departmentSelectionType What pool of departments to use
   */
  constructor(count : number, departmentSelectionType : DepartmentSelectionType) {
    const allDepartments = Departments.getAll()
    this._pool = this.createPool(departmentSelectionType, allDepartments)
    this._selected = this.selectSubset(count)
  }

  public get pool() : readonly Department[] {
    return this._pool
  }

  public get selected() : readonly Department[] {
    return this._selected
  }

  private createPool(departmentSelectionType : DepartmentSelectionType, allDepartments : Department[]) : Department[] {
    const baseDepartments = allDepartments.filter(dept => !dept.expansion)
    const pool : Department[] = []

    switch (departmentSelectionType) {
      case DepartmentSelectionType.BASE:
        // two of each base department in pool
        baseDepartments.forEach(dept => {
          pool.push(dept)
          pool.push(dept)
        })
        break;
      case DepartmentSelectionType.EXPANSION:
        // pick 4 departments from each type, and put 2 of each into the pool
        pool.push(...this.createExpansionPool(allDepartments))
        break;
      case DepartmentSelectionType.EXPANSION_OPEN_BAR:
        // one of all departments in pool
        pool.push(...allDepartments)
        break;
    }

    return pool
  }

  /**
   * Pick 4 departments from each type, and put 2 of each into the pool
   */
  private createExpansionPool(allDepartments : Department[]) : Department[] {
    const departmentsByType = new Map<Action,Department[]>
    Object.values(Action).forEach(action => departmentsByType.set(action, []))
    const shuffledAllDepartments = _.shuffle(allDepartments)
    shuffledAllDepartments.forEach(dept => {
      const departmentsForCurrentType = departmentsByType.get(dept.departmentType)
      if (departmentsForCurrentType && departmentsForCurrentType.length < 4) {
        departmentsForCurrentType.push(dept)
      }
    })
    // put departments in pool in correct order
    const selectedDepartments = Array.from(departmentsByType.values()).flatMap(item => item)
    const result : Department[] = []
    allDepartments.filter(dept => selectedDepartments.includes(dept)).forEach(dept => {
      result.push(dept)
      result.push(dept)
    })
    return result
  }

  private selectSubset(count : number) : Department[] {
    const shuffledPool = _.shuffle(this._pool)
    return shuffledPool.slice(0, count)
  }

}
