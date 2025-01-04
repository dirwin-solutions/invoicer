import { DatabaseEntity } from '../base'

export interface Address extends DatabaseEntity {
  clientId: number,
  address1: string,
  address2?: string,
  city: string,
  state: string,
  zip: string,
  zip2?: string
  is_primary: boolean
}
