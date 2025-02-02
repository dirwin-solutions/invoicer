import { Service, Model } from '../base'
import { Invoice, InvoiceDetail } from './types'
import { Chargeable, ChargeableDetail } from '../chargeable'
import { ChargeableType } from '../chargeable-type'
import { Client } from '../client'
import { Address } from '../address'
import { InvoiceChargeableModel } from '../invoice-chargeable'

export default class InvoiceService extends Service<Invoice> {
  protected chargeableModel: Model<Chargeable>
  protected chargeableTypeModel: Model<ChargeableType>
  protected invoiceChargeableModel: InvoiceChargeableModel
  protected clientModel: Model<Client>
  protected addressModel: Model<Address>

  constructor(
    model: Model<Invoice>,
    chargeableModel: Model<Chargeable>,
    chargeableTypeModel: Model<ChargeableType>,
    clientModel: Model<Client>,
    addressModel: Model<Address>,
    invoiceChargeableModel: InvoiceChargeableModel
  ) {
    super(model)
    this.chargeableModel = chargeableModel
    this.chargeableTypeModel = chargeableTypeModel
    this.invoiceChargeableModel = invoiceChargeableModel
    this.clientModel = clientModel
    this.addressModel = addressModel
  }

  async getInvoiceDetailById(id: number): Promise<InvoiceDetail> {
    try {
      const invoice = await this.model.getById(id)
      const invoiceChargeables = await this.invoiceChargeableModel.listByInvoiceId(id)
      const client = await this.clientModel.getById(invoice.clientId)
      const address = await this.addressModel.getById(invoice.addressId)

      const chargeables = await Promise.all(invoiceChargeables.map(async ic => {
        const chargeable = await this.chargeableModel.getById(ic.chargeableId)
        const chargeableType = await this.chargeableTypeModel.getById(chargeable.chargeableTypeId)
        return {
          ...ic,
          chargeable: {
            ...chargeable,
            chargeableType
          }
        }
      }))

      return {
        ...invoice,
        address,
        client,
        chargeables
      }
    } catch(e) {
      const error = e as Error
      const message = `Error occurred while fetching details for invoice ${id}: ${error.message}`
      throw Error(message)
    }
  }
}
