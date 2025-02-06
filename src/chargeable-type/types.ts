import { DatabaseEntity } from '../base'
export interface ChargeableType extends DatabaseEntity {
  name: string
  parent?: number
}
