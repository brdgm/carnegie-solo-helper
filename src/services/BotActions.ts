import Card from './Card'
import GroupedDepartments from './GroupedDepartments'
import Action from './enum/Action'
import City from './enum/City'
import Region from './enum/Region'

/**
 * Determines bot actions.
 */
export default class BotActions {

  private readonly currentCard : Card
  private readonly botEventDonationFailed : boolean
  private readonly availableDepartments : readonly string[]
  private readonly botDepartments : readonly string[]

  private _cardShift = 0
  private _botNewDepartments : readonly string[] = []
  private _departmentsFailed = 0
  private _cities : City[] = []
  private _citiesFailed = 0
  private _transportRegion?: Region
  private _transportSteps = 0
  private _transportStepsFailed = 0

  constructor(currentCard : Card, botEventDonationFailed : boolean,
      availableDepartments : readonly string[], botDepartments : readonly string[]) {
    this.currentCard = currentCard
    this.botEventDonationFailed = botEventDonationFailed
    this.availableDepartments = availableDepartments
    this.botDepartments = botDepartments
  }

  public get cardShift() : number {
    const result = this._cardShift
      + (this.botEventDonationFailed ? 1 : 0)
      + this._departmentsFailed
      + this._citiesFailed
      + this._transportStepsFailed
    // card shift limited to 4
    if (result > 4) {
      return 4;
    }
    return result
  }

  public get botNewDepartments() : readonly string[] {
    return this._botNewDepartments
  }

  public get cities() : readonly City[] {
    return this._cities
  }

  public get transportRegion() : Region|undefined {
    return this._transportRegion
  }

  public get transportSteps() : number {
    return this._transportSteps
  }

  /**
   * Apply action based on current card.
   * @param action Action
   */
  public applyAction(action : Action) : void {    
    switch (action) {
      case Action.HUMAN_RESOURCES:
        this._cardShift += this.currentCard.humanResourcesCardShift
        break
      case Action.MANAGEMENT:
        this._botNewDepartments = this.getDepartements(this.currentCard.managementDepartment)
        // count number of departments that could not be gained
        this._departmentsFailed = this.currentCard.managementDepartment.length - this._botNewDepartments.length
        break
      case Action.CONSTRUCTION:
        this._cities = this.currentCard.constructionCities
        break
      case Action.RESEARCH_DEVELOPMENT:
        this._transportRegion = this.currentCard.researchDevelopmentRegion
        this._transportSteps = this.currentCard.researchDevelopmentSteps
        break
      default:
        throw new Error(`Invalid action: ${action}`)
    }
  }

  /**
   * @param count Number of cities which could not be placed
   */
  public setCitiesFailed(count : number ) {
    this._citiesFailed = count
  }

  /**
   * @param count Number of transport steps that could not be moved
   */
  public setTransportStepsFailed(count : number ) {
    this._transportStepsFailed = count
  }

  /**
   * Get departments matching the given department types (only those that the bot does not only have).
   * @param departmentTypes Department types
   * @returns Matching departments (may be fewer than requested)
   */
  private getDepartements(departmentTypes : Action[]) : readonly string[] {
    const groupedDepartments = new GroupedDepartments(this.availableDepartments)
    const result : string[] = []
    departmentTypes.forEach(departmentType => {
      const group = groupedDepartments.groups.find(item => item.departmentType == departmentType)
      if (group) {
        const departmentCount = group.departments.find(item => !this.botDepartments.includes(item.department.id) && !result.includes(item.department.id))
        if (departmentCount) {
          result.push(departmentCount.department.id)
        }
      }
    })
    return result
  }

}
