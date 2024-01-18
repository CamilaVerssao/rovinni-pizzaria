exports.up = async knex => {
    return knex.schema.alterTable('pedido', table => {
      table.decimal('total').nullable().alter();
    });
  };
  
  exports.down = async knex => {
    return knex.schema.alterTable('pedido', table => {
      table.decimal('total').notNullable().alter();
    });
  };
  