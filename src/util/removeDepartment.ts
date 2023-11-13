/**
 * Remove a single. department from list of departments.
 * If the list of departments contains the given departments multiple times, one instance is removed.
 * @param departments List of departments IDs
 * @param department Department ID
 * @returns New list of departments without the given department.
 */
export default function(departments? : readonly string[], department?: string) : readonly string[] {
  const result : string[] = []
  let removed = false
  if (departments) {
    departments.forEach(dept => {
      if (dept == department && !removed) {
        removed = true
      }
      else {
        result.push(dept)
      }
    })
  }
  return result
}
