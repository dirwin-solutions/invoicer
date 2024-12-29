import Model from './Model'
import { CreateInput, UpdateInput } from './types'

class Service<T> {
  protected model: Model<T>
  constructor(model: Model<T>) {
    this.model = model
  }

  async create(data: CreateInput<T>): Promise<T> {
    return await this.model.create(data)
  }

  async list(): Promise<T[]> {
    return await this.model.list()
  }

  async getById(id: number): Promise<T> {
    return await this.model.getById(id)
  }

  async updateById(id: number, data: UpdateInput<T>): Promise<T> {
    return await this.model.updateById(id, data)
  }
}

export default Service
