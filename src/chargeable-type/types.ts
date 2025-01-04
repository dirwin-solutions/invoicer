import { DatabaseEntity } from '../base'
export default interface ChargeableType extends DatabaseEntity {
  name: string
  parent?: number
}
