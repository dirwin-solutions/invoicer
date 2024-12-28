import { Pool, PoolClient } from 'pg'
import { CreateInput, UpdateInput } from './types'
import { serializeData } from '../db/util'

class Model<T> {
  tableName: string
  pool: Pool
  constructor(pool: Pool, tableName: string) {
    this.tableName = tableName
    this.pool = pool
  }

  async create(data: CreateInput<T>): Promise<T> {
    const fieldString = `${this.tableName}(${Object.keys(data).join()})`
    const valuePlaceholder = Object.keys(data).map((_,i) => `$${i+1}`).join()
    const query = [
      'INSERT INTO',
      fieldString,
      `VALUES(${valuePlaceholder})`,
      'RETURNING *'
    ].join(' ')
    let client: PoolClient | null = null
    try {
      client = await this.pool.connect()
      const result = await client.query(
        query,
        Object.values(serializeData(data))
      )
      return result.rows[0]
    } finally {
      if(client) client.release()
    }
  }

  async getById(id: number): Promise<T> {
    const query = [
      'SELECT * FROM',
      this.tableName,
      'WHERE id = $1',
    ].join(' ')
    let client: PoolClient | null = null
    try {
      client = await this.pool.connect()
      const result = await client.query(query, [id])
      return result.rows[0]
    } finally {
      if(client) client.release()
    }
  }

  async updateById(id: number, data: UpdateInput<T>): Promise<T> {
    data.updatedAt = new Date()
    const parsedData = Object.keys(data).map((k,i) => `${k} = $${i+2}`).join()
    const query = [
      `UPDATE ${this.tableName}`,
      `SET ${parsedData}`,
      `WHERE id = $1`,
      'RETURNING *'
    ].join(' ')
    const values = [id, ...Object.values(serializeData(data))]
    let client: PoolClient | null = null
    try {
      client = await this.pool.connect()
      const result = await client.query(query, values)
      return result.rows[0]
    } finally {
      if(client) client.release()
    }
  }
}

export default Model
