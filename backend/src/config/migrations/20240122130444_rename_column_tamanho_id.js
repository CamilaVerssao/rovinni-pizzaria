exports.up = async knex => {
    return knex.schema.alterTable('pedido', table => {
      table.renameColumn('tamanho', 'id');
    });
  };
  
  exports.down = async knex => {
    return knex.schema.alterTable('pedido', table => {
      table.renameColumn('id', 'tamanho');
    });
  };
  