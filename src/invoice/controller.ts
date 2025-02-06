import { Request, Response, NextFunction } from 'express'
import { Service, Controller, UpdateInput } from '../base'
import { Invoice } from './types'
import InvoiceService from './service'
import { InvoiceChargeableService } from '../invoice-chargeable'

export default class InvoiceController extends Controller<Invoice> {
  protected service: InvoiceService
  protected invoiceChargeableService: InvoiceChargeableService
  constructor(
    service: InvoiceService,
    invoiceChargeableService: InvoiceChargeableService
  ) {
    super(service)
    this.service = service
    this.invoiceChargeableService = invoiceChargeableService

    this.addChargeableToInvoice = this.addChargeableToInvoice.bind(this)
  }

  async getInvoiceDetailById(
    req: Request, res: Response, next: NextFunction
  ) {
    const id = Number(req.params.id)
    try {
      const invoiceDetail = await this.service.getInvoiceDetailById(id)
      res.json(invoiceDetail)
    } catch(e) {
      next(e)
    }
  }

  async addChargeableToInvoice(
    req: Request, res: Response, next: NextFunction
  ) {
    const invoiceId = Number(req.params.id)
    const { chargeableId, quantity, discount } = req.body
    try {
      const result = await this.invoiceChargeableService.create({
        invoiceId,
        chargeableId,
        quantity,
        discount
      })

      const invoiceDetail = await this.service.getInvoiceDetailById(invoiceId)
      res.json(invoiceDetail)
    } catch(e) {
      next(e)
    }
  }
}
