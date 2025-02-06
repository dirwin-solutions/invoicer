import { DatabaseEntity, Detail } from '../base'
import { InvoiceChargeableDetail } from '../invoice-chargeable'
import { Address } from '../address'
import { Client } from '../client'

export interface Invoice extends DatabaseEntity {
  clientId: number,
  addressId: number,
  date: Date,
  total: number,
}

export interface InvoiceDetail extends Omit<Detail<Invoice>, 'clientId' | 'addressId'> {
  address: Detail<Address>,
  client: Detail<Client>
  chargeables: InvoiceChargeableDetail[],
}
