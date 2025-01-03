import { Pool, PoolClient } from 'pg'
import { CreateInput, UpdateInput } from './types'
import { serializeData } from '../db/util'

class Model<T> {
  protected tableName: string
  protected pool: Pool
  constructor(pool: Pool, tableName: string) {
    this.tableName = tableName
    this.pool = pool
  }

  async create(data: CreateInput<T>): Promise<T> {
    const filtered = Object.fromEntries(
      Object.entries(data).filter(([_,v]) => v !== undefined)
    )
    const fields = Object.keys(filtered).map(k => `"${k}"`).join()
    const valuePlaceholder = Object.keys(filtered).map((_,i) => `$${i+1}`).join()
    const query = [
      'INSERT INTO',
      `${this.tableName}(${fields})`,
      `VALUES(${valuePlaceholder})`,
      'RETURNING *'
    ].join(' ')
    const values = Object.values(serializeData(filtered))

    let client: PoolClient | null = null
    try {
      client = await this.pool.connect()
      const result = await client.query(query, values)
      return result.rows[0]
    } finally {
      if(client) client.release()
    }
  }

  async list(): Promise<T[]> {
    const query = [
      'SELECT * FROM',
      this.tableName
    ].join(' ')

    let client: PoolClient | null = null
    try {
      client = await this.pool.connect()
      const result = await client.query(query)
      return result.rows
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
    const values = [id]

    let client: PoolClient | null = null
    try {
      client = await this.pool.connect()
      const result = await client.query(query, values)
      if (!result.rowCount) {
        throw Error(`No ${this.tableName} with id ${id}`)
      }
      return result.rows[0]
    } finally {
      if(client) client.release()
    }
  }

  async updateById(id: number, data: UpdateInput<T>): Promise<T> {
    const filtered = Object.fromEntries(
      Object.entries(data).filter(([_,v]) => v !== undefined)
    )
    if(!Object.keys(filtered).length) {
      throw new Error('Must supply at least one field to update')
    }
    filtered.updatedAt = new Date()
    const parsedData = Object.keys(filtered).map((k,i) => `"${k}" = $${i+2}`).join()
    const query = [
      `UPDATE ${this.tableName}`,
      `SET ${parsedData}`,
      `WHERE id = $1`,
      'RETURNING *'
    ].join(' ')
    const values = [id, ...Object.values(serializeData(filtered))]

    let client: PoolClient | null = null
    try {
      client = await this.pool.connect()
      const result = await client.query(query, values)
      if(!result.rowCount) {
        throw Error(`No ${this.tableName} with id ${id}`)
      }
      return result.rows[0]
    } finally {
      if(client) client.release()
    }
  }
}

export default Model
