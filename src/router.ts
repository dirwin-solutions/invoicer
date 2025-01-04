import { Router } from 'express'
import { Pool } from 'pg'
import { Model, Service, Controller, ApiRouter, DatabaseEntity } from './base'
import { Client } from './client'
import { Address } from './address'
import { ChargeableType } from './chargeable-type'
import { Chargeable } from './chargeable'
import { Invoice } from './invoice'
import { InvoiceChargeable } from './invoice-chargeable'

interface ModuleOverrides<T> {
  model?: new (pool: Pool, tableName: string) => Model<T>
  service?: new (model: Model<T>) => Service<T>
  controller?: new (service: Service<T>) => Controller<T>
  router?: new (controller: Controller<T>) => ApiRouter<T>
}

function registerModule<T extends DatabaseEntity>(
  apiRouter: Router,
  pool: Pool,
  tableName: string,
  overrides: ModuleOverrides<T> = {}
): void {
  const ModuleModel = overrides.model || Model
  const ModuleService = overrides.service || Service
  const ModuleController = overrides.controller || Controller
  const ModuleRouter = overrides.router || ApiRouter

  const model = new ModuleModel(pool, tableName)
  const service = new ModuleService(model)
  const controller = new ModuleController(service)
  const router = new ModuleRouter(controller).getRouter()
  apiRouter.use(`/${tableName}`, router)
}

const pool = new Pool()
const apiRouter = Router()

registerModule<Client>(apiRouter, pool, 'client')
registerModule<Address>(apiRouter, pool, 'address')
registerModule<ChargeableType>(apiRouter, pool, 'chargeable_type')
registerModule<Chargeable>(apiRouter, pool, 'chargeable')
registerModule<Invoice>(apiRouter, pool, 'invoice')
registerModule<InvoiceChargeable>(apiRouter, pool, 'invoice_chargeable')

export default apiRouter
