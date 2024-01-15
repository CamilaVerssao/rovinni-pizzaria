exports.up = knex => {
    return knex.schema.hasTable('pizza_ingrediente').then(exists => {
      if(!exists) {
          return knex.schema.createTable('pizza_ingrediente', table => {
          table.increments('id')
          table.integer('quantidade').notNullable()
        
          //relationship
          table.integer('prod_id').references('produto.id').notNullable();
          table.integer('ingred_id').references('ingrediente.id').notNullable();
  
          table.timestamps(true, true);
        });
      }
    });
  };
  
  exports.down = knex => {
    return knex.schema.dropTable('pizza_ingrediente');
  };