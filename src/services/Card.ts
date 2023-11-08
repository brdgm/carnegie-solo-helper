import Action from "./enum/Action"
import CardType from "./enum/CardType"
import City from "./enum/City"
import Donation from "./enum/Donation"
import Region from "./enum/Region"

export default interface Card {
  id: string
  cardType: CardType
  donation: Donation
  mainAction: Action
  humanResourcesCardShift: number
  managementDepartment: Action[]
  constructionCities: City[]
  researchDevelopmentRegion: Region
  researchDevelopmentSteps: number
}
