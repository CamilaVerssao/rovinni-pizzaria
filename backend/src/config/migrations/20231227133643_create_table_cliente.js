
exports.up = knex => {
    return knex.schema.createTable('cliente', table => {
      table.increments('id')
      table.text('nome').notNullable()
      table.text('cpf').notNullable().unique()

      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('cliente');
  };
  