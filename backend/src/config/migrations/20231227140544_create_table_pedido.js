exports.up = knex => {
    return knex.schema.hasTable('pedido').then(exists => {
      if(!exists) {
          return knex.schema.createTable('pedido', table => {
          table.increments('id')
          table.text('pagamento').notNullable()
          table.text('status').notNullable()
          table.decimal('total').notNullable()
        
          //relationship
          table.integer('funcionario_id').references('funcionarios.id').notNullable(); //tirar notnullable
          table.integer('cliente_id').references('cliente.id').notNullable(); //tirar notnullable
  
          table.timestamps(true, true);
        });
      }
    });
  };
  
  exports.down = knex => {
    return knex.schema.dropTable('pedido');
  };