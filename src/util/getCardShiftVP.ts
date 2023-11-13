/**
 * Determines the number of VP for given bot card shift.
 * @param cardShift Card shift
 * @returns VP
 */
export default function(cardShift : number) : number {
  switch (cardShift) {
    case 0:
      return 0
    case 1:
      return 1
    case 2:
      return 3
    case 3:
      return 6
    case 4:
      return 10
    default:
      throw new Error(`Invalid card shift: ${cardShift}`)
  }
}
