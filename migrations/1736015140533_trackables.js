exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('chargeable_type', {
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updatedAt: { type: 'timestamp' }
  })

  pgm.addColumns('chargeable', {
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updatedAt: { type: 'timestamp' }
  })

  pgm.addColumns('invoice_chargeables', {
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updatedAt: { type: 'timestamp' }
  })
}

exports.down = (pgm) => {};
