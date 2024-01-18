exports.up = async knex => {
    return knex.schema.alterTable('pedido', table => {
      table.text('pagamento').nullable().alter();
    });
  };
  
  exports.down = async knex => {
    return knex.schema.alterTable('pedido', table => {
      table.text('pagamento').notNullable().alter();
    });
  };
  