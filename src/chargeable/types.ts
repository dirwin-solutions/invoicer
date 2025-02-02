import { DatabaseEntity } from '../base'

export interface Chargeable extends DatabaseEntity {
   name: string
   description?: string
   price: number
   chargeableTypeId: number
}
