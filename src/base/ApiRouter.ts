import { Router } from 'express'
import Controller from './Controller'
export default class ApiRouter<T> {
  protected controller: Controller<T>
  protected router: Router
  constructor(controller: Controller<T>) {
    this.controller = controller
    this.router = Router()
    this.router.post('/', controller.create)
    this.router.get('/', controller.list)
    this.router.get('/:id', controller.getById)
    this.router.patch('/:id', controller.updateById)
  }

  getRouter() {
    return this.router
  }
}

