exports.up = knex => {
    return knex.schema.hasTable('pedido_item').then(exists => {
      if(!exists) {
          return knex.schema.createTable('pedido_item', table => {
          table.increments('id')
          table.integer('quantidade').notNullable()
        
          //relationship
          table.integer('prod_id').references('produto.id').notNullable();
          table.integer('pedido_id').references('pedido.id').notNullable();
  
          table.timestamps(true, true);
        });
      }
    });
  };
  
  exports.down = knex => {
    return knex.schema.dropTable('pedido_item');
  };