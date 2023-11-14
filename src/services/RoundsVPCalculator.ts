import { Round } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import getCardShiftVP from '@/util/getCardShiftVP'

/**
 * Calculates total VP from cards and departments.
 */
export default class RoundsVPCalculator {

  private _cardsShift : number[]
  private _departmentCount : number

  /**
   * @param rounds Rounds
   */
  constructor(rounds : Round[], navigationState?: NavigationState) {
    this._cardsShift = this.getCardsShift(rounds)
    this._departmentCount = this.getDepartmentCount(rounds)

    if (navigationState) {
      this._cardsShift[navigationState.botCardShift]++
      this._departmentCount += navigationState.botNewDepartments.length
    }
  }

  private getCardsShift(rounds : Round[]) : number[] {
    const result : number[] = [0,0,0,0,0]
    rounds.forEach(round => result[round.botCardShift ?? 0]++)
    return result
  }

  private getDepartmentCount(rounds : Round[]) : number {
    return rounds.reduce((count, round) => count + (round.botNewDepartments?.length ?? 0), 0)
  }

  /**
   * @returns Number of cards for each card shift (card shift = array index)
   */
  public get cardsShift() : readonly number[] {
    return this._cardsShift
  }

  /**
   * Number of Bot departments
   */
  public get departmentCount() : number {
    return this._departmentCount
  }

  /**
   * Total VP for shifted cards
   */
  public get cardsShiftVP() : number {
    let result = 0
    for (let cardShift = 0; cardShift < this._cardsShift.length; cardShift++) {
      result += getCardShiftVP(cardShift) * this._cardsShift[cardShift]
    }
    return result
  }

  /**
   * Total VP for obtained departments
   */
  public get departmentsVP() : number {
    return this.departmentCount * 2
  }

}
