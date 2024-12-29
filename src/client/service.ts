import Service from '../base/Service'
import ClientModel from './model'
import { Client } from './types'

export default class ClientService extends Service<Client> {
  constructor(model: ClientModel) {
    super(model)
  }
}
