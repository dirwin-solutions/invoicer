import RouterBase from '../base/Router'
import ClientController from './controller'
import { Client } from './types'

export default class ClientRouter extends RouterBase<Client> {
  constructor(controller: ClientController) {
    super(controller)
  }
}
