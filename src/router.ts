import { Router } from 'express'
import { Pool } from 'pg'
import { Model, Service, Controller, ApiRouter, DatabaseEntity } from './base'
import { Client } from './client'
import { Address } from './address'
import { ChargeableType } from './chargeable-type'
import { Chargeable } from './chargeable'
import { Invoice, InvoiceService, InvoiceController, InvoiceRouter } from './invoice'
import { InvoiceChargeable, InvoiceChargeableModel, InvoiceChargeableService } from './invoice-chargeable'

//////////////////////
//                  //
//    MODEL LAYER   //
//                  //
//////////////////////
const pool = new Pool()
const clientModel = new Model<Client>(pool, 'client')
const addressModel = new Model<Address>(pool, 'address')
const chargeableTypeModel = new Model<ChargeableType>(pool, 'chargeable_type')
const chargeableModel = new Model<Chargeable>(pool, 'chargeable')
const invoiceModel = new Model<Invoice>(pool, 'invoice')
const invoiceChargeableModel = new InvoiceChargeableModel(pool)

//////////////////////
//                  //
//  SERVICE LAYER   //
//                  //
//////////////////////
const clientService = new Service<Client>(clientModel)
const addressService = new Service<Address>(addressModel)
const chargeableTypeService = new Service<ChargeableType>(chargeableTypeModel)
const chargeableService = new Service<Chargeable>(chargeableModel)
const invoiceService = new InvoiceService(
  invoiceModel,
  chargeableModel,
  chargeableTypeModel,
  clientModel,
  addressModel,
  invoiceChargeableModel,
)
const invoiceChargeableService = new InvoiceChargeableService(
  invoiceChargeableModel,
  invoiceModel,
  chargeableModel,
)

//////////////////////
//                  //
// CONTROLLER LAYER //
//                  //
//////////////////////
const clientController = new Controller<Client>(clientService)
const addressController = new Controller<Address>(addressService)
const chargeableTypeController = new Controller<ChargeableType>(
  chargeableTypeService
)
const chargeableController = new Controller<Chargeable>(chargeableService)
const invoiceController = new InvoiceController(
  invoiceService,
  invoiceChargeableService
)
const invoiceChargeableController = new Controller<InvoiceChargeable>(
  invoiceChargeableService
)

//////////////////////
//                  //
//   ROUTER LAYER   //
//                  //
//////////////////////
const clientRouter = new ApiRouter<Client>(clientController)
const addressRouter = new ApiRouter<Address>(addressController)
const chargeableTypeRouter = new ApiRouter<ChargeableType>(
  chargeableTypeController
)
const chargeableRouter = new ApiRouter<Chargeable>(chargeableController)
const invoiceRouter = new InvoiceRouter(invoiceController)
const invoiceChargeableRouter = new ApiRouter<InvoiceChargeable>(invoiceChargeableController)

//////////////////////
//                  //
//   REGISTRATION   //
//                  //
//////////////////////
const apiRouter = Router()
apiRouter.use('/client', clientRouter.getRouter())
apiRouter.use('/address', addressRouter.getRouter())
apiRouter.use('/chargeable_type', chargeableTypeRouter.getRouter())
apiRouter.use('/chargeable', chargeableRouter.getRouter())
apiRouter.use('/invoice', invoiceRouter.getRouter())
apiRouter.use('/invoice_chargeable', invoiceChargeableRouter.getRouter())

export default apiRouter
