/**
 * Adds departments to the given list.
 * @param departments List of departments IDs
 * @param departmentsToAdd List of Department IDs to add
 * @returns New list of departments with the added ones
 */
export default function addDepartments(departments? : readonly string[], departmentsToAdd?: readonly string[]) : readonly string[] {
  if (!departmentsToAdd) {
    return []
  }
  return [...(departments ?? []), ...departmentsToAdd]
}
