import { Router } from 'express'
import { Pool } from 'pg'
import Client from './client'

const pool = new Pool()
const apiRouter = Router()

const clientModel = new Client.ClientModel(pool)
const clientService = new Client.ClientService(clientModel)
const clientController = new Client.ClientController(clientService)
const clientRouter = new Client.ClientRouter(clientController).getRouter()
apiRouter.use('/client', clientRouter)

export default apiRouter
