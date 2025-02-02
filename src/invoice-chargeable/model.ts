import { Pool, PoolClient } from 'pg'
import { Model } from '../base'
import { InvoiceChargeable } from './types'

export default class InvoiceChargeableModel extends Model<InvoiceChargeable> {
  constructor(pool: Pool) {
    super(pool, 'invoice_chargeable')
  }

  async listByInvoiceId(invoiceId: number, client?: PoolClient): Promise<InvoiceChargeable[]> {
    const query = [
      'SELECT * FROM',
      this.tableName,
      'WHERE "invoiceId" = $1'
    ].join(' ')
    const values = [invoiceId]

    const queryClient = client || await this.getPoolClient()
    try {
      const result = await queryClient.query(query, values)
      return result.rows
    } finally {
      if(!client) queryClient.release()
    }
  }
}
