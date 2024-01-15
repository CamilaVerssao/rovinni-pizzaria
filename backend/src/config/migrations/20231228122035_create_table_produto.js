

exports.up = knex => {
    return knex.schema.hasTable('produto').then(exists => {
      if(!exists) {
          return knex.schema.createTable('produto', table => {
            table.increments('id')
            table.text('nome').notNullable()
            table.text('codigo').unique().notNullable()
            table.decimal('preco').notNullable()
            table.text('descricao')
            table.integer('volume_vendas')
            table.decimal('custo')
            table.integer('estoque_minimo').notNullable()
            table.integer('estoque_atual').notNullable()

            table.integer('categoria_id').references('categoria.id').notNullable().onDelete('CASCADE');
            table.integer('tipo_id').references('tipo.id').notNullable().onDelete('CASCADE');
            table.integer('tamanho_id').references('tamanho.id').onDelete('CASCADE');
  
            table.timestamps(true, true);
        });
      }
    });
  };
  
  exports.down = knex => {
    return knex.schema.dropTable('produto');
  };
