
exports.up = knex => {
    return knex.schema.createTable('categoria', table => {
      table.increments('id')
      table.text('nome').notNullable()
      table.text('descricao')
      table.boolean('ativo').notNullable()

      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('categoria');
  };
  