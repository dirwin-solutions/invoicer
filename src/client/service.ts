import Service from '../base/Service'
import ClientModel from './model'
import { Client } from './types'

class ClientService extends Service<Client> {
  constructor(model: ClientModel) {
    super(model)
  }
}

export default ClientService
