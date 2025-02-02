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

  async getPoolClient(): Promise<PoolClient> {
    return await this.pool.connect()
  }

  async create(data: CreateInput<T>, client?: PoolClient): Promise<T> {
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

    const queryClient = client || (await this.getPoolClient())
    try {
      const result = await queryClient.query(query, values)
      return result.rows[0]
    } finally {
      if(!client) queryClient.release()
    }
  }

  async list(client?: PoolClient): Promise<T[]> {
    const query = [
      'SELECT * FROM',
      this.tableName
    ].join(' ')

    const queryClient = client || (await this.getPoolClient())
    try {
      const result = await queryClient.query(query)
      return result.rows
    } finally {
      if(!client) queryClient.release()
    }
  }

  async getById(id: number, client?: PoolClient): Promise<T> {
    const query = [
      'SELECT * FROM',
      this.tableName,
      'WHERE id = $1',
    ].join(' ')
    const values = [id]

    const queryClient = client || (await this.getPoolClient())
    try {
      const result = await queryClient.query(query, values)
      if (!result.rowCount) {
        throw Error(`No ${this.tableName} with id ${id}`)
      }
      return result.rows[0]
    } finally {
      if(!client) queryClient.release()
    }
  }

  async updateById(id: number, data: UpdateInput<T>, client?: PoolClient): Promise<T> {
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

    const queryClient = client || (await this.getPoolClient())
    try {
      const result = await queryClient.query(query, values)
      if(!result.rowCount) {
        throw Error(`No ${this.tableName} with id ${id}`)
      }
      return result.rows[0]
    } finally {
      if(!client) queryClient.release()
    }
  }
}

export default Model
