import { ApiRouter } from '../base'
import { Invoice } from './types'
import InvoiceController from './controller'

export default class InvoiceRouter extends ApiRouter<Invoice> {
  protected controller: InvoiceController
  constructor(controller: InvoiceController) {
    super(controller)
    this.controller = controller
    this.router.post('/:id/chargeable', this.controller.addChargeableToInvoice)
    this.router.get('/:id/detail', this.controller.getInvoiceDetailById)
  }
}
