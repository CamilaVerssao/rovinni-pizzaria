exports.up = async knex => {
    const tables = ['funcionario', 'tamanho', 'tipo', 'cliente', 'ingrediente', 'categoria', 'produto', 'pedido', 'pedido_item', 'pizza_ingrediente']; // Adicione aqui o nome das suas tabelas
  
    await Promise.all(
      tables.map(tableName => {
        return knex.schema.alterTable(tableName, table => {
          table.datetime('deleted_at').defaultTo(null);
        });
      })
    );
  };
  
  exports.down = async knex => {
    const tables = ['funcionario', 'tamanho', 'tipo', 'cliente', 'ingrediente', 'categoria', 'produto', 'pedido', 'pedido_item', 'pizza_ingrediente']; // Adicione aqui o nome das suas tabelas

    await Promise.all(
      tables.map(tableName => {
        return knex.schema.alterTable(tableName, table => {
          table.dropColumn('deleted_at');
        });
      })
    );
  };
  