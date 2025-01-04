import { Request, Response, NextFunction } from 'express'
import { CreateInput, UpdateInput } from './types'
import Service from './Service'

export default class Controller<T> {
  protected service: Service<T>
  constructor(service: Service<T>) {
    this.service = service
    this.create = this.create.bind(this)
    this.updateById = this.updateById.bind(this)
    this.getById = this.getById.bind(this)
    this.list = this.list.bind(this)
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateInput<T> = req.body
      const result = await this.service.create(data)
      res.json(result)
    } catch(e) {
      next(e)
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const data: UpdateInput<T> = req.body
      const result = await this.service.updateById(id, data)
      res.json(result)
    } catch(e) {
      next(e)
    }
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

