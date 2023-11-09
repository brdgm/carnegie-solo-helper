import Action from "./enum/Action"

export default interface Department {
  id: string
  departmentType: Action
  expansion: boolean
}
