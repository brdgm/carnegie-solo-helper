import findMandatory from 'brdgm-commons/src/util/map/findMandatory';
import Card from './Card';
import Action from './enum/Action';
import CardType from './enum/CardType';
import Donation from './enum/Donation';
import Region from './enum/Region';
import City from './enum/City';

const cards : Card[] = [
  {
    id: 'N01',
    cardType: CardType.NORMAL,
    donation: Donation.EDUCATION_DEPARTMENT_HUMAN_RESOURCES,
    mainAction: Action.HUMAN_RESOURCES,
    humanResourcesCardShift: 4,
    managementDepartment: [Action.HUMAN_RESOURCES],
    constructionCities: [City.SALT_LAKE_CITY,City.RENO],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'N02',
    cardType: CardType.NORMAL,
    donation: Donation.EDUCATION_DEPARTMENT_MANAGEMENT,
    mainAction: Action.HUMAN_RESOURCES,
    humanResourcesCardShift: 4,
    managementDepartment: [Action.MANAGEMENT],
    constructionCities: [City.ST_LOUIS,City.CHICAGO],
    researchDevelopmentRegion: Region.MIDWEST,
    researchDevelopmentSteps: 1
  },
  {
    id: 'N03',
    cardType: CardType.NORMAL,
    donation: Donation.EDUCATION_DEPARTMENT_CONSTRUCTION,
    mainAction: Action.HUMAN_RESOURCES,
    humanResourcesCardShift: 3,
    managementDepartment: [Action.CONSTRUCTION],
    constructionCities: [City.BOSTON,City.WASHINGTON],
    researchDevelopmentRegion: Region.EAST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'N04',
    cardType: CardType.NORMAL,
    donation: Donation.EDUCATION_DEPARTMENT_RESEARCH_DEVELOPMENT,
    mainAction: Action.HUMAN_RESOURCES,
    humanResourcesCardShift: 3,
    managementDepartment: [Action.RESEARCH_DEVELOPMENT,Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.NEW_ORLEANS,City.HOUSTON],
    researchDevelopmentRegion: Region.SOUTH,
    researchDevelopmentSteps: 2
  },
  {
    id: 'N05',
    cardType: CardType.NORMAL,
    donation: Donation.HEALTH_CONSTRUCTION_MIDWEST,
    mainAction: Action.HUMAN_RESOURCES,
    humanResourcesCardShift: 3,
    managementDepartment: [Action.HUMAN_RESOURCES],
    constructionCities: [City.SAN_FRANCISCO,City.SANTA_FE],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 1
  },
  {
    id: 'N06',
    cardType: CardType.NORMAL,
    donation: Donation.EDUCATION_DEPARTMENT_ANY,
    mainAction: Action.MANAGEMENT,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.HUMAN_RESOURCES,Action.HUMAN_RESOURCES,Action.HUMAN_RESOURCES],
    constructionCities: [City.SAN_FRANCISCO,City.LOS_ANGELES],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 1
  },
  {
    id: 'N07',
    cardType: CardType.NORMAL,
    donation: Donation.WELFARE_7VP,
    mainAction: Action.MANAGEMENT,
    humanResourcesCardShift: 1,
    managementDepartment: [Action.MANAGEMENT,Action.MANAGEMENT,Action.MANAGEMENT],
    constructionCities: [City.FARGO,City.ST_PAUL],
    researchDevelopmentRegion: Region.MIDWEST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'N08',
    cardType: CardType.NORMAL,
    donation: Donation.WELFARE_GOODS,
    mainAction: Action.MANAGEMENT,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.CONSTRUCTION,Action.CONSTRUCTION,Action.CONSTRUCTION],
    constructionCities: [City.PITTSBURGH,City.NEW_YORK],
    researchDevelopmentRegion: Region.EAST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'N09',
    cardType: CardType.NORMAL,
    donation: Donation.WELFARE_MONEY,
    mainAction: Action.MANAGEMENT,
    humanResourcesCardShift: 1,
    managementDepartment: [Action.RESEARCH_DEVELOPMENT,Action.RESEARCH_DEVELOPMENT,Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.SAN_ANTONIO,City.MEMPHIS,City.DALLAS],
    researchDevelopmentRegion: Region.SOUTH,
    researchDevelopmentSteps: 2
  },
  {
    id: 'N10',
    cardType: CardType.NORMAL,
    donation: Donation.HEALTH_CONSTRUCTION_SMALL_CITY,
    mainAction: Action.MANAGEMENT,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.HUMAN_RESOURCES,Action.CONSTRUCTION,Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.KANSAS_CITY,City.CHICAGO],
    researchDevelopmentRegion: Region.MIDWEST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'N11',
    cardType: CardType.NORMAL,
    donation: Donation.WELFARE_MONEY_GOODS,
    mainAction: Action.CONSTRUCTION,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.HUMAN_RESOURCES],
    constructionCities: [City.PORTLAND,City.BOISE,City.DENVER,City.LOS_ANGELES],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 1
  },
  {
    id: 'N12',
    cardType: CardType.NORMAL,
    donation: Donation.WELFARE_EMPLOYEE_ACTIVE,
    mainAction: Action.CONSTRUCTION,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.MANAGEMENT,Action.MANAGEMENT],
    constructionCities: [City.NEW_YORK,City.CHICAGO,City.NEW_ORLEANS,City.SAN_FRANCISCO],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 1
  },
  {
    id: 'N13',
    cardType: CardType.NORMAL,
    donation: Donation.HUMAN_RIGHTS_PROJECT_PUBLIC_INFRASTRUCTURE,
    mainAction: Action.CONSTRUCTION,
    humanResourcesCardShift: 1,
    managementDepartment: [Action.CONSTRUCTION,Action.CONSTRUCTION],
    constructionCities: [City.CINCINNATI,City.DULUTH,City.ST_LOUIS,City.KANSAS_CITY],
    researchDevelopmentRegion: Region.MIDWEST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'N14',
    cardType: CardType.NORMAL,
    donation: Donation.HUMAN_RIGHTS_PROJECT_INDUSTRY,
    mainAction: Action.CONSTRUCTION,
    humanResourcesCardShift: 1,
    managementDepartment: [Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.ALBANY,City.NEW_YORK,City.WASHINGTON,City.PITTSBURGH],
    researchDevelopmentRegion: Region.EAST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'N15',
    cardType: CardType.NORMAL,
    donation: Donation.HEALTH_CONSTRUCTION_SOUTH,
    mainAction: Action.CONSTRUCTION,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.CONSTRUCTION],
    constructionCities: [City.NEW_ORLEANS,City.ATLANTA,City.HOUSTON,City.CHARLESTON],
    researchDevelopmentRegion: Region.SOUTH,
    researchDevelopmentSteps: 2
  },
  {
    id: 'N16',
    cardType: CardType.NORMAL,
    donation: Donation.HUMAN_RIGHTS_PROJECT_HOUSING_COMMERCE,
    mainAction: Action.RESEARCH_DEVELOPMENT,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.HUMAN_RESOURCES,Action.HUMAN_RESOURCES],
    constructionCities: [City.NEW_ORLEANS,City.ATLANTA],
    researchDevelopmentRegion: Region.SOUTH,
    researchDevelopmentSteps: 3
  },
  {
    id: 'N17',
    cardType: CardType.NORMAL,
    donation: Donation.HUMAN_RIGHTS_TRANSPORTATION_RAILROAD,
    mainAction: Action.RESEARCH_DEVELOPMENT,
    humanResourcesCardShift: 1,
    managementDepartment: [Action.MANAGEMENT,Action.MANAGEMENT],
    constructionCities: [City.BOSTON,City.NEW_YORK],
    researchDevelopmentRegion: Region.EAST,
    researchDevelopmentSteps: 3
  },
  {
    id: 'N18',
    cardType: CardType.NORMAL,
    donation: Donation.HUMAN_RIGHTS_DONATION,
    mainAction: Action.RESEARCH_DEVELOPMENT,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.CONSTRUCTION],
    constructionCities: [City.CHICAGO,City.OMAHA],
    researchDevelopmentRegion: Region.MIDWEST,
    researchDevelopmentSteps: 3
  },
  {
    id: 'N19',
    cardType: CardType.NORMAL,
    donation: Donation.HEALTH_CONSTRUCTION_EAST,
    mainAction: Action.RESEARCH_DEVELOPMENT,
    humanResourcesCardShift: 1,
    managementDepartment: [Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.PITTSBURGH,City.BOSTON,City.ALBANY],
    researchDevelopmentRegion: Region.EAST,
    researchDevelopmentSteps: 3
  },
  {
    id: 'N20',
    cardType: CardType.NORMAL,
    donation: Donation.HEALTH_CONSTRUCTION_WEST,
    mainAction: Action.RESEARCH_DEVELOPMENT,
    humanResourcesCardShift: 1,
    managementDepartment: [Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.SAN_FRANCISCO,City.DENVER],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 3
  },
  {
    id: 'A01',
    cardType: CardType.ADVANCED,
    donation: Donation.EDUCATION_DEPARTMENT_HUMAN_RESOURCES,
    mainAction: Action.HUMAN_RESOURCES,
    humanResourcesCardShift: 4,
    managementDepartment: [Action.HUMAN_RESOURCES,Action.HUMAN_RESOURCES],
    constructionCities: [City.SALT_LAKE_CITY,City.RENO],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'A02',
    cardType: CardType.ADVANCED,
    donation: Donation.EDUCATION_DEPARTMENT_MANAGEMENT,
    mainAction: Action.HUMAN_RESOURCES,
    humanResourcesCardShift: 4,
    managementDepartment: [Action.MANAGEMENT,Action.MANAGEMENT],
    constructionCities: [City.ST_LOUIS,City.CHICAGO],
    researchDevelopmentRegion: Region.MIDWEST,
    researchDevelopmentSteps: 3
  },
  {
    id: 'A03',
    cardType: CardType.ADVANCED,
    donation: Donation.EDUCATION_DEPARTMENT_CONSTRUCTION,
    mainAction: Action.HUMAN_RESOURCES,
    humanResourcesCardShift: 4,
    managementDepartment: [Action.CONSTRUCTION,Action.CONSTRUCTION],
    constructionCities: [City.BOSTON,City.WASHINGTON],
    researchDevelopmentRegion: Region.EAST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'A04',
    cardType: CardType.ADVANCED,
    donation: Donation.EDUCATION_DEPARTMENT_RESEARCH_DEVELOPMENT,
    mainAction: Action.HUMAN_RESOURCES,
    humanResourcesCardShift: 4,
    managementDepartment: [Action.RESEARCH_DEVELOPMENT,Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.NEW_ORLEANS,City.HOUSTON],
    researchDevelopmentRegion: Region.SOUTH,
    researchDevelopmentSteps: 2
  },
  {
    id: 'A05',
    cardType: CardType.ADVANCED,
    donation: Donation.HEALTH_CONSTRUCTION_MIDWEST,
    mainAction: Action.HUMAN_RESOURCES,
    humanResourcesCardShift: 4,
    managementDepartment: [Action.MANAGEMENT],
    constructionCities: [City.SAN_FRANCISCO,City.SANTA_FE],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 3
  },
  {
    id: 'A06',
    cardType: CardType.ADVANCED,
    donation: Donation.EDUCATION_DEPARTMENT_ANY,
    mainAction: Action.MANAGEMENT,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.HUMAN_RESOURCES,Action.HUMAN_RESOURCES,Action.HUMAN_RESOURCES],
    constructionCities: [City.SAN_FRANCISCO,City.LOS_ANGELES],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 3
  },
  {
    id: 'A07',
    cardType: CardType.ADVANCED,
    donation: Donation.WELFARE_7VP,
    mainAction: Action.MANAGEMENT,
    humanResourcesCardShift: 3,
    managementDepartment: [Action.MANAGEMENT,Action.MANAGEMENT,Action.MANAGEMENT],
    constructionCities: [City.FARGO,City.ST_PAUL],
    researchDevelopmentRegion: Region.MIDWEST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'A08',
    cardType: CardType.ADVANCED,
    donation: Donation.WELFARE_GOODS,
    mainAction: Action.MANAGEMENT,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.CONSTRUCTION,Action.CONSTRUCTION,Action.CONSTRUCTION],
    constructionCities: [City.PITTSBURGH,City.NEW_YORK],
    researchDevelopmentRegion: Region.EAST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'A09',
    cardType: CardType.ADVANCED,
    donation: Donation.WELFARE_MONEY,
    mainAction: Action.MANAGEMENT,
    humanResourcesCardShift: 3,
    managementDepartment: [Action.RESEARCH_DEVELOPMENT,Action.RESEARCH_DEVELOPMENT,Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.SAN_ANTONIO,City.MEMPHIS,City.DALLAS],
    researchDevelopmentRegion: Region.SOUTH,
    researchDevelopmentSteps: 2
  },
  {
    id: 'A10',
    cardType: CardType.ADVANCED,
    donation: Donation.HEALTH_CONSTRUCTION_SMALL_CITY,
    mainAction: Action.MANAGEMENT,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.HUMAN_RESOURCES,Action.CONSTRUCTION,Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.KANSAS_CITY,City.CHICAGO],
    researchDevelopmentRegion: Region.MIDWEST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'A11',
    cardType: CardType.ADVANCED,
    donation: Donation.WELFARE_MONEY_GOODS,
    mainAction: Action.CONSTRUCTION,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.HUMAN_RESOURCES],
    constructionCities: [City.PORTLAND,City.BOISE,City.DENVER,City.LOS_ANGELES],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 3
  },
  {
    id: 'A12',
    cardType: CardType.ADVANCED,
    donation: Donation.WELFARE_EMPLOYEE_ACTIVE,
    mainAction: Action.CONSTRUCTION,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.MANAGEMENT,Action.MANAGEMENT],
    constructionCities: [City.NEW_YORK,City.CHICAGO,City.NEW_ORLEANS,City.SAN_FRANCISCO],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 3
  },
  {
    id: 'A13',
    cardType: CardType.ADVANCED,
    donation: Donation.HUMAN_RIGHTS_PROJECT_PUBLIC_INFRASTRUCTURE,
    mainAction: Action.CONSTRUCTION,
    humanResourcesCardShift: 3,
    managementDepartment: [Action.CONSTRUCTION,Action.CONSTRUCTION],
    constructionCities: [City.CINCINNATI,City.DULUTH,City.ST_LOUIS,City.KANSAS_CITY],
    researchDevelopmentRegion: Region.MIDWEST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'A14',
    cardType: CardType.ADVANCED,
    donation: Donation.HUMAN_RIGHTS_PROJECT_INDUSTRY,
    mainAction: Action.CONSTRUCTION,
    humanResourcesCardShift: 3,
    managementDepartment: [Action.RESEARCH_DEVELOPMENT,Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.ALBANY,City.NEW_YORK,City.WASHINGTON,City.PITTSBURGH],
    researchDevelopmentRegion: Region.EAST,
    researchDevelopmentSteps: 2
  },
  {
    id: 'A15',
    cardType: CardType.ADVANCED,
    donation: Donation.HEALTH_CONSTRUCTION_SOUTH,
    mainAction: Action.CONSTRUCTION,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.CONSTRUCTION],
    constructionCities: [City.NEW_ORLEANS,City.ATLANTA,City.HOUSTON,City.CHARLESTON],
    researchDevelopmentRegion: Region.SOUTH,
    researchDevelopmentSteps: 2
  },
  {
    id: 'A16',
    cardType: CardType.ADVANCED,
    donation: Donation.HUMAN_RIGHTS_PROJECT_HOUSING_COMMERCE,
    mainAction: Action.RESEARCH_DEVELOPMENT,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.HUMAN_RESOURCES,Action.HUMAN_RESOURCES],
    constructionCities: [City.NEW_ORLEANS,City.ATLANTA],
    researchDevelopmentRegion: Region.SOUTH,
    researchDevelopmentSteps: 4
  },
  {
    id: 'A17',
    cardType: CardType.ADVANCED,
    donation: Donation.HUMAN_RIGHTS_TRANSPORTATION_RAILROAD,
    mainAction: Action.RESEARCH_DEVELOPMENT,
    humanResourcesCardShift: 3,
    managementDepartment: [Action.MANAGEMENT,Action.MANAGEMENT],
    constructionCities: [City.BOSTON,City.NEW_YORK],
    researchDevelopmentRegion: Region.EAST,
    researchDevelopmentSteps: 4
  },
  {
    id: 'A18',
    cardType: CardType.ADVANCED,
    donation: Donation.HUMAN_RIGHTS_DONATION,
    mainAction: Action.RESEARCH_DEVELOPMENT,
    humanResourcesCardShift: 2,
    managementDepartment: [Action.CONSTRUCTION],
    constructionCities: [City.CHICAGO,City.OMAHA],
    researchDevelopmentRegion: Region.MIDWEST,
    researchDevelopmentSteps: 4
  },
  {
    id: 'A19',
    cardType: CardType.ADVANCED,
    donation: Donation.HEALTH_CONSTRUCTION_EAST,
    mainAction: Action.RESEARCH_DEVELOPMENT,
    humanResourcesCardShift: 3,
    managementDepartment: [Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.PITTSBURGH,City.BOSTON,City.ALBANY],
    researchDevelopmentRegion: Region.EAST,
    researchDevelopmentSteps: 4
  },
  {
    id: 'A20',
    cardType: CardType.ADVANCED,
    donation: Donation.HEALTH_CONSTRUCTION_WEST,
    mainAction: Action.RESEARCH_DEVELOPMENT,
    humanResourcesCardShift: 3,
    managementDepartment: [Action.RESEARCH_DEVELOPMENT],
    constructionCities: [City.SAN_FRANCISCO,City.DENVER],
    researchDevelopmentRegion: Region.WEST,
    researchDevelopmentSteps: 4
  }
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  }

}
