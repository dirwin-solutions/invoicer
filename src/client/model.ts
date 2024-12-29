import Model from '../base/Model'
import { Pool } from 'pg'
import { Client } from './types'

class ClientModel extends Model<Client> {
  constructor(pool: Pool) {
    super(pool, 'client')
  }
}

export default ClientModel
