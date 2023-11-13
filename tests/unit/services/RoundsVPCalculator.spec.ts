import RoundsVPCalculator from '@/services/RoundsVPCalculator'
import { Round } from '@/store/state'
import { expect } from 'chai'
import mockRound from '../helper/mockRound'

describe('services/RoundsVPCalculator', () => {
  it('rounds', () => {
    const rounds : Round[] = [
      mockRound({round: 1, botCardShift: 0, botNewDepartments:['dep1','dep2']}),
      mockRound({round: 2, botCardShift: 3}),
      mockRound({round: 3, botCardShift: 4}),
      mockRound({round: 4, botCardShift: 3}),
      mockRound({round: 5, botCardShift: 2, botNewDepartments:['dep3']}),
      mockRound({round: 6, botCardShift: 1})
    ]
    const calculator = new RoundsVPCalculator(rounds)

    expect(calculator.cardsShift).to.eql([1,1,1,2,1])
    expect(calculator.cardsShiftVP).to.eq(26)
    expect(calculator.departmentCount).to.eq(3)
    expect(calculator.departmentsVP).to.eq(6)
  })

  it('empty', () => {
    const calculator = new RoundsVPCalculator([])

    expect(calculator.cardsShift).to.eql([0,0,0,0,0])
    expect(calculator.cardsShiftVP).to.eq(0)
    expect(calculator.departmentCount).to.eq(0)
    expect(calculator.departmentsVP).to.eq(0)
  })
})
