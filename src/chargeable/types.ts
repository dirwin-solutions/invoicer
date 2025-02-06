import { DatabaseEntity, Detail } from '../base'
import { ChargeableType } from '../chargeable-type'

export interface Chargeable extends DatabaseEntity {
   name: string
   description?: string
   price: number
   chargeableTypeId: number
}

export interface ChargeableDetail extends Omit<Detail<Chargeable>, 'chargeableTypeId'> {
  chargeableType: Detail<ChargeableType>
}
