exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('user', {
    id: 'id',
    email: { type: 'varchar(256)', notNull: true },
    password: { type: 'varchar(1000)', notNull: true },
    firstName: { type: 'varchar(256)', notNull: true },
    lastName: { type: 'varchar(256)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updatedAt: { type: 'timestamp' }
  })

  pgm.createTable('client', {
    id: 'id',
    firstName: { type: 'varchar(256)' },
    lastName: { type: 'varchar(256)' },
    businessName: { type: 'varchar(256)', notNull: true },
    email: { type: 'varchar(256)', notNull: true },
    phoneNumber: { type: 'varchar(256)', notNull: true },
    note: { type: 'varchar(512)' },
    active: { type: 'boolean', default: true, notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updatedAt: { type: 'timestamp' }
  })

  pgm.createTable('address', {
    id: 'id',
    clientId: {
      type: 'integer',
      notNull: true,
      references: 'client(id)',
    },
    address1: { type: 'varchar(256)', notNull: true },
    address2: { type: 'varchar(256)' },
    city: { type: 'varchar(256)', notNull: true },
    state: { type: 'varchar(2)', notNull: true },
    zip: {
      type: 'varchar(5)',
      notNull: true,
      check: "char_length(zip) = 5 AND zip ~ '^[0-9]*$'"
    },
    zip2: { type: 'varchar(4)' },
    is_primary: { type: 'boolean', default: false },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updatedAt: { type: 'timestamp' }
  })

  pgm.addIndex('address', ['clientId'], {
    unique: true,
    where: 'is_primary = TRUE',
    name: 'unique_primary_address_per_client',
  })

  pgm.createTable('invoice', {
    id: 'id',
    clientId: {
      type: 'integer',
      notNull: true,
      references: 'client(id)'
    },
    addressId: {
      type: 'integer',
      notNull: true,
      references: 'address(id)'
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    total: {
      type: 'numeric',
      notNull: true,
      default: 0.00
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updatedAt: { type: 'timestamp' }
  })

  pgm.createTable('chargeable_type', {
    id: 'id',
    name: { type: 'varchar(256)', notNull: true },
    parent: {
      type: 'integer',
      references: 'chargeable_type(id)',
      onDelete: 'SET NULL'
    }
  })

  pgm.createTable('chargeable', {
    id: 'id',
    name: { type: 'varchar(256)', notNull: true },
    description: 'varchar(256)',
    price: { type: 'numeric(12,2)', notNull: true },
    chargeableType: {
      type: 'integer',
      references: 'chargeable_type(id)',
      notNull: true
    }
  })

  pgm.createTable('invoice_chargeables', {
    id: 'id',
    invoiceId: {
      type: 'integer',
      references: 'invoice(id)',
      notNull: true
    },
    chargeableId: {
      type: 'integer',
      references: 'chargeable(id)',
      notNull: true
    },
    quantity: 'integer',
    discount: {
      type: 'numeric',
      notNull: true,
      default: 0.00,
      check: 'discount >= 0 AND discount <= 100',
    },
  })

  pgm.createConstraint('invoice_chargeables', 'unique_invoice_chargeable_items', {
    unique: ['invoiceId', 'chargeableId'],
  })

  pgm.createIndex('invoice_chargeables', 'invoiceId')
};

exports.down = (pgm) => {};
