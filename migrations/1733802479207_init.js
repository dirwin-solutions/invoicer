exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('user', {
    id: 'id',
    email: { type: 'varchar(256)', notNull: true },
    password: { type: 'varchar(1000)', notNull: true },
    first_name: { type: 'varchar(256)', notNull: true },
    last_name: { type: 'varchar(256)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updated_at: { type: 'timestamp' }
  })

  pgm.createTable('client', {
    id: 'id',
    first_name: { type: 'varchar(256)' },
    last_name: { type: 'varchar(256)' },
    business_name: { type: 'varchar(256)', notNull: true },
    email: { type: 'varchar(256)', notNull: true },
    phone_number: { type: 'varchar(256)', notNull: true },
    note: { type: 'varchar(512)' },
    active: { type: 'boolean', default: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updated_at: { type: 'timestamp' }
  })

  pgm.createTable('address', {
    id: 'id',
    client_id: {
      type: 'integer',
      notNull: true,
      references: 'client(id)',
    },
    address_1: { type: 'varchar(256)', notNull: true },
    address_2: { type: 'varchar(256)' },
    city: { type: 'varchar(256)', notNull: true },
    state: { type: 'varchar(2)', notNull: true },
    zip: { 
      type: 'varchar(5)', 
      notNull: true,
      check: "char_length(zip) = 5 AND zip ~ '^[0-9]*$'"
    },
    zip_2: { type: 'varchar(4)' },
    primary: { type: 'boolean', default: false },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updated_at: { type: 'timestamp' }
  })

  pgm.createConstraint('address', 'unique_client_primary_address', {
    unique: ['client_id', 'primary'],
    deferrable: true
  })

  pgm.createTable('invoice', {
    id: 'id',
    client_id: {
      type: 'integer',
      notNull: true,
      references: 'client(id)'
    },
    address_id: {
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
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updated_at: { type: 'timestamp' }
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
    chargeable_type: {
      type: 'integer',
      references: 'chargeable_type(id)',
      notNull: true
    }
  })

  pgm.createTable('invoice_chargeables', {
    id: 'id',
    invoice_id: {
      type: 'integer',
      references: 'invoice(id)',
      notNull: true
    },
    chargeable_id: {
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
    unique: ['invoice_id', 'chargeable_id'],
  })

  pgm.createIndex('invoice_chargeables', 'invoice_id')
};

exports.down = (pgm) => {};
