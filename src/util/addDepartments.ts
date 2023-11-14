/**
 * Adds departments to the given list.
 * @param departments List of departments IDs
 * @param addDepartments List of Department IDs to add
 * @returns New list of departments with the added ones
 */
export default function(departments? : readonly string[], addDepartments?: readonly string[]) : readonly string[] {
  if (!addDepartments) {
    return []
  }
  return [...(departments ?? []), ...addDepartments]
}
