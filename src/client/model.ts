import Model from '../base/Model'
import { Pool } from 'pg'
import { Client } from './types'

export default class ClientModel extends Model<Client> {
  constructor(pool: Pool) {
    super(pool, 'client')
  }
}
