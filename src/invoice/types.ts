import { DatabaseEntity } from '../base'

export interface Invoice extends DatabaseEntity {
  clientId: number,
  addressId: number,
  date: Date,
  total: number,
}
