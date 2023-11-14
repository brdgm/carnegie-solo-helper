import DonationMetadata from '@/services/DonationMetadata'
import Donation from '@/services/enum/Donation'

/**
 * Get metadata for donation.
 * @param donation Donation
 * @returns Donation metadata
 */
export default function(donation: Donation) : DonationMetadata {
  switch (donation) {
    case Donation.EDUCATION_DEPARTMENT_HUMAN_RESOURCES:
      return { column: 1, row: 1 }
    case Donation.EDUCATION_DEPARTMENT_MANAGEMENT:
      return { column: 1, row: 2 }
    case Donation.EDUCATION_DEPARTMENT_CONSTRUCTION:
      return { column: 1, row: 3 }
    case Donation.EDUCATION_DEPARTMENT_RESEARCH_DEVELOPMENT:
      return { column: 1, row: 4 }
    case Donation.EDUCATION_DEPARTMENT_ANY:
      return { column: 1, row: 5 }
    case Donation.HUMAN_RIGHTS_PROJECT_PUBLIC_INFRASTRUCTURE:
      return { column: 2, row: 1 }
    case Donation.HUMAN_RIGHTS_PROJECT_INDUSTRY:
      return { column: 2, row: 2 }
    case Donation.HUMAN_RIGHTS_PROJECT_HOUSING_COMMERCE:
      return { column: 2, row: 3 }
    case Donation.HUMAN_RIGHTS_TRANSPORTATION_RAILROAD:
      return { column: 2, row: 4 }
    case Donation.HUMAN_RIGHTS_DONATION:
      return { column: 2, row: 5 }
    case Donation.WELFARE_7VP:
      return { column: 3, row: 1 }
    case Donation.WELFARE_GOODS:
      return { column: 3, row: 2 }
    case Donation.WELFARE_MONEY:
      return { column: 3, row: 3 }
    case Donation.WELFARE_MONEY_GOODS:
      return { column: 3, row: 4 }
    case Donation.WELFARE_EMPLOYEE_ACTIVE:
      return { column: 3, row: 5 }
    case Donation.HEALTH_CONSTRUCTION_EAST:
      return { column: 4, row: 1 }
    case Donation.HEALTH_CONSTRUCTION_MIDWEST:
      return { column: 4, row: 2 }
    case Donation.HEALTH_CONSTRUCTION_SOUTH:
      return { column: 4, row: 3 }
    case Donation.HEALTH_CONSTRUCTION_WEST:
      return { column: 4, row: 4 }
    case Donation.HEALTH_CONSTRUCTION_SMALL_CITY:
      return { column: 4, row: 5 }
    default:
      throw new Error(`Invalid donation: ${donation}.`)
  }
}
