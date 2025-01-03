import { Request, Response, NextFunction } from 'express'
import Service from './Service'

export default class Controller<T> {
  protected service: Service<T>
  constructor(service: Service<T>) {
    this.service = service
    this.getById = this.getById.bind(this)
    this.list = this.list.bind(this)
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const result = await this.service.getById(id)
      res.json(result)
    } catch(e) {
      next(e)
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.list()
      res.json(result)
    } catch(e) {
      next(e)
    }
  }
}

