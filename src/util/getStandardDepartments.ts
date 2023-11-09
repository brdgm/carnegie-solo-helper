import Department from '@/services/enum/Department'

/**
 * Get standard departments.
 * @returns Departments
 */
export default function() : Department[] {
  return [
    Department.DEPT_01_TRAINING_PARTNERSHIPS,
    Department.DEPT_02_RECRUITING,
    Department.DEPT_03_SAFETY_QUALITY,
    Department.DEPT_04_NEW_LOBBY,
    Department.DEPT_05_PURCHASING,
    Department.DEPT_06_SALES,
    Department.DEPT_07_LOGISTICS,
    Department.DEPT_08_PROPERTY_MANAGEMENT,
    Department.DEPT_09_ENGINEERING,
    Department.DEPT_10_CONSTRUCTION_OUTSOURCING,
    Department.DEPT_11_SUPPLY_CHAIN,
    Department.DEPT_12_COMMUNICATIONS,
    Department.DEPT_13_ADVANCED_RESEARCH,
    Department.DEPT_14_ADVANCED_DESIGN,
    Department.DEPT_15_CHARITABLE_GIVING,
    Department.DEPT_16_TELEGRAPH_OPERATORS
  ]
}
