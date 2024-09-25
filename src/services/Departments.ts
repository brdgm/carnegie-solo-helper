import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Department from './Department'
import Action from './enum/Action'

const departments : Department[] = [
  {
    id: '01-training-partnerships',
    departmentType: Action.HUMAN_RESOURCES,
    expansion: false
  },
  {
    id: '02-recruiting',
    departmentType: Action.HUMAN_RESOURCES,
    expansion: false
  },
  {
    id: '03-safety-quality',
    departmentType: Action.HUMAN_RESOURCES,
    expansion: false
  },
  {
    id: '04-new-lobby',
    departmentType: Action.HUMAN_RESOURCES,
    expansion: false
  },
  {
    id: '05-purchasing',
    departmentType: Action.MANAGEMENT,
    expansion: false
  },
  {
    id: '06-sales',
    departmentType: Action.MANAGEMENT,
    expansion: false
  },
  {
    id: '07-logistics',
    departmentType: Action.MANAGEMENT,
    expansion: false
  },
  {
    id: '08-property-management',
    departmentType: Action.MANAGEMENT,
    expansion: false
  },
  {
    id: '09-engineering',
    departmentType: Action.CONSTRUCTION,
    expansion: false
  },
  {
    id: '10-construction-outsourcing',
    departmentType: Action.CONSTRUCTION,
    expansion: false
  },
  {
    id: '11-supply-chain',
    departmentType: Action.CONSTRUCTION,
    expansion: false
  },
  {
    id: '12-communications',
    departmentType: Action.CONSTRUCTION,
    expansion: false
  },
  {
    id: '13-advanced-research',
    departmentType: Action.RESEARCH_DEVELOPMENT,
    expansion: false
  },
  {
    id: '14-advanced-design',
    departmentType: Action.RESEARCH_DEVELOPMENT,
    expansion: false
  },
  {
    id: '15-charitable-giving',
    departmentType: Action.RESEARCH_DEVELOPMENT,
    expansion: false
  },
  {
    id: '16-telegraph-operators',
    departmentType: Action.RESEARCH_DEVELOPMENT,
    expansion: false
  },
  {
    id: '17-human-resources-administration',
    departmentType: Action.HUMAN_RESOURCES,
    expansion: true
  },
  {
    id: '18-local-partners',
    departmentType: Action.HUMAN_RESOURCES,
    expansion: true
  },
  {
    id: '19-corporate-communications',
    departmentType: Action.HUMAN_RESOURCES,
    expansion: true
  },
  {
    id: '20-green-spaces',
    departmentType: Action.HUMAN_RESOURCES,
    expansion: true
  },
  {
    id: '21-accounting',
    departmentType: Action.MANAGEMENT,
    expansion: true
  },
  {
    id: '22-branding',
    departmentType: Action.MANAGEMENT,
    expansion: true
  },
  {
    id: '23-payroll-management',
    departmentType: Action.MANAGEMENT,
    expansion: true
  },
  {
    id: '24-public-relations',
    departmentType: Action.MANAGEMENT,
    expansion: true
  },
  {
    id: '25-production-lines',
    departmentType: Action.CONSTRUCTION,
    expansion: true
  },
  {
    id: '26-renovation',
    departmentType: Action.CONSTRUCTION,
    expansion: true
  },
  {
    id: '27-political-lobbying',
    departmentType: Action.CONSTRUCTION,
    expansion: true
  },
  {
    id: '28-post-office',
    departmentType: Action.CONSTRUCTION,
    expansion: true
  },
  {
    id: '29-rd-coordination',
    departmentType: Action.RESEARCH_DEVELOPMENT,
    expansion: true
  },
  {
    id: '30-knowledge-sharing',
    departmentType: Action.RESEARCH_DEVELOPMENT,
    expansion: true
  },
  {
    id: '31-archives',
    departmentType: Action.RESEARCH_DEVELOPMENT,
    expansion: true
  },
  {
    id: '32-network-libraries',
    departmentType: Action.RESEARCH_DEVELOPMENT,
    expansion: true
  }
]

const departmentsMap = new Map<string,Department>()
departments.forEach(department => departmentsMap.set(department.id, department))

export default {

  /**
   * Get department by ID
   * @param id ID
   * @returns Department
   */
  get(id: string) : Department {
    return findMandatory(departmentsMap, id)
  },

  /**
   * Get all departments
   * @returns departments
   */
  getAll() : Department[] {
    return departments
  }

}
