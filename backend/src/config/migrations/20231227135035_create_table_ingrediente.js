
exports.up = knex => {
  return knex.schema.hasTable('ingrediente').then(exists => {
    if(!exists) {
        return knex.schema.createTable('ingrediente', table => {
          table.increments('id')
          table.text('nome').notNullable()
          table.decimal('preco_relativo').notNullable()
          table.integer('estoque_minimo').notNullable()
          table.integer('estoque_atual').notNullable()

          table.integer('categoria_id').references('categoria.id').notNullable().onDelete('CASCADE');

          table.timestamps(true, true);
      });
    }
  });
};

exports.down = knex => {
  return knex.schema.dropTable('ingrediente');
};
