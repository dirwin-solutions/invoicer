import { Router } from 'express'
import Controller from './Controller'
export default class RouterBase<T> {
  protected controller: Controller<T>
  protected router: Router
  constructor(controller: Controller<T>) {
    this.controller = controller
    this.router = Router()
    this.router.get('/', controller.list)
    this.router.get('/:id', controller.getById)
  }

  getRouter() {
    return this.router
  }
}

