import removeDepartment from './removeDepartment'

/**
 * Remove a department(s) from list of departments.
 * If the list of departments contains the given departments multiple times, one instance is removed.
 * @param departments List of departments IDs
 * @param departmentsToRemove List(s) of Department IDs to remove
 * @returns New list of departments without the given department.
 */
export default function removeDepartments(departments? : readonly string[], ...departmentsToRemove: (readonly string[])[]) : readonly string[] {
  if (!departments) {
    return []
  }
  let result : readonly string[] = departments
  for (const departmentIds of departmentsToRemove) {
    for (const department of departmentIds) {
      result = removeDepartment(result, department)
    }
  }
  return result
}
