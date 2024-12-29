import { Request, Response, NextFunction } from 'express'
import { Client } from './types'
import ClientService from './service'
import Controller from '../base/Controller'

export default class ClientController extends Controller<Client> {
  constructor(service: ClientService) {
    super(service)
  }

  async createClient(req: Request, res: Response, next: NextFunction) {
    const {
      firstName, lastName, businessName, email, phoneNumber, note, active
    } = req.body
    try {
      const result = await this.service.create({
        firstName,
        lastName,
        businessName,
        email,
        phoneNumber,
        note,
        active
      })
      res.json(result)
    } catch(e) {
      next(e)
    }
  }

  async updateClientById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id)
    try {
      const {
        firstName, lastName, businessName, email, phoneNumber, note, active
      } = req.body
      const result = await this.service.updateById(
        id,
        {
          firstName,
          lastName,
          businessName,
          phoneNumber,
          note,
          active
        }
      )
      res.json(result)
    } catch(e) {
      next(e)
    }
  }
}

