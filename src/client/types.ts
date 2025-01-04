import { DatabaseEntity } from '../base'
export default interface Client extends DatabaseEntity {
  firstName?: string
  lastName?: string
  businessName: string
  email: string
  phoneNumber: string
  note?: string
  active: boolean
}
