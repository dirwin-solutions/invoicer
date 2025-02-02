import { DatabaseEntity, Detail } from '../base'
import { ChargeableDetail } from '../chargeable'

export interface InvoiceChargeable extends DatabaseEntity {
  invoiceId: number
  chargeableId: number
  quantity: number
  discount: number
}

export interface InvoiceChargeableDetail extends Omit<Detail<InvoiceChargeable>, 'chargeableId' | 'invoiceId'> {
  chargeable: ChargeableDetail
}
