import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import DepartmentSelectionType from '@/services/enum/DepartmentSelectionType'
import Action from '@/services/enum/Action'
import Region from '@/services/enum/Region'
import Event from '@/services/enum/Event'
import Donation from '@/services/enum/Donation'
import City from '@/services/enum/City'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.BEGINNER,
        departmentSelectionType: DepartmentSelectionType.BASE
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.setup.blockedDonations = undefined
      this.setup.blockedCities = undefined
      this.setup.initialDepartments = undefined
      this.rounds = []
    },
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round != round.round)
      this.rounds.push(round)
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  departmentSelectionType: DepartmentSelectionType
  blockedDonations?: readonly Donation[]
  blockedCities?: readonly CityCount[]
  initialDepartments?: readonly string[]
}
export interface CityCount {
  city: City
  count: number
}

export interface Round {
  round: number
  cardDeck: CardDeckPersistence
  timeline: TimelinePersistence
  departments: readonly string[]
}
export interface CardDeckPersistence {
  pile: string[]
  discard: string[][]
}
export interface TimelinePersistence {
  actions: TimelinePersistenceAction[]
}
export interface TimelinePersistenceAction {
  action: Action
  entries: TimelinePersistenceEntry[]
}
export interface TimelinePersistenceEntry {
  events: Event[]
  region?: Region
  executed?: boolean
}
