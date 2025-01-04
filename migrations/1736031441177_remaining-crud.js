exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.renameTable('invoice_chargeables', 'invoice_chargeable')

  pgm.alterColumn('invoice_chargeable', 'quantity', { notNull: true })
  pgm.alterColumn('address', 'is_primary', { notNull: true })
};

exports.down = (pgm) => {};
