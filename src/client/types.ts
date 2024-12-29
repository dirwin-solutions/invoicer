import { CreateInput } from '../base/types'

export interface Client {
  id: number
  firstName?: string
  lastName?: string
  businessName: string
  email: string
  phoneNumber: string
  note?: string
  active: boolean
  createdAt: Date
  updatedAt?: Date
}
