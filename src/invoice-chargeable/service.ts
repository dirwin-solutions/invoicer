import { Service, Model, CreateInput } from '../base'
import { InvoiceChargeable } from './types'
import { Invoice } from '../invoice'
import { Chargeable } from '../chargeable'

export default class InvoiceChargeableService extends Service<InvoiceChargeable> {
  protected invoiceModel: Model<Invoice>
  protected chargeableModel: Model<Chargeable>
  constructor(
    model: Model<InvoiceChargeable>,
    invoiceModel: Model<Invoice>,
    chargeableModel: Model<Chargeable>,
  ) {
    super(model)
    this.model = model
    this.invoiceModel = invoiceModel
    this.chargeableModel = chargeableModel
  }

  async create(data: CreateInput<InvoiceChargeable>): Promise<InvoiceChargeable> {
    let { invoiceId, chargeableId, quantity, discount } = data
    invoiceId = Number(invoiceId)
    chargeableId = Number(chargeableId)
    quantity = Number(quantity)
    discount = Number(discount)
    try {
      return await this.doTransaction(async (client) => {
        const invoiceChargeableResult = await this.model.create(data, client)
        const chargeablePrice = (
          await this.chargeableModel.getById(chargeableId, client)
        ).price
        const invoice = await this.invoiceModel.getById(invoiceId, client)
        const discountFactor = (100 - discount)/100
        const newTotal = invoice.total + (quantity * chargeablePrice * discountFactor)
        const updateTotalResult = await this.invoiceModel
          .updateById(invoiceId, { total: newTotal }, client)
        return invoiceChargeableResult
      })
    } catch(e) {
      const error = e as Error
      const baseMessage = `Error occurred while adding chargeable: ${chargeableId} to invoice: ${invoiceId}:`
      const message = `${baseMessage}: ${error.message}`
      throw new Error(message, { cause: error })
    }
  }
}
