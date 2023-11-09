import Department from '@/services/enum/Department'

/**
 * Get expansion departments.
 * @returns Departments
 */
export default function() : Department[] {
  return [
    Department.DEPT_17_HUMAN_RESOURCES_ADMINISTRATION,
    Department.DEPT_18_LOCAL_PARTNERS,
    Department.DEPT_19_CORPORATE_COMMUNICATIONS,
    Department.DEPT_20_GREEN_SPACES,
    Department.DEPT_21_ACCOUNTING,
    Department.DEPT_22_BRANDING,
    Department.DEPT_23_PAYROLL_MANAGEMENT,
    Department.DEPT_24_PUBLIC_RELATIONS,
    Department.DEPT_25_PRODUCTION_LINES,
    Department.DEPT_26_RENOVATION,
    Department.DEPT_27_POLITICAL_LOBBYING,
    Department.DEPT_28_POST_OFFICE,
    Department.DEPT_29_RD_COORDINATION,
    Department.DEPT_30_KNOWLEDGE_SHARING,
    Department.DEPT_31_ARCHIVES,
    Department.DEPT_32_NETWORK_LIBRARIES
  ]
}
