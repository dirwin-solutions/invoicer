import { DatabaseEntity } from '../base'

export interface InvoiceChargeable extends DatabaseEntity {
  invoiceId: number
  chargeableId: number
  quantity: number
  discount: number
}
