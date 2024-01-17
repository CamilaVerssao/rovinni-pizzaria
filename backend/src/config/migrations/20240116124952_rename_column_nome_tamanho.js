exports.up = async knex => {
    return knex.schema.alterTable('pedido', table => {
      table.renameColumn('id', 'tamanho');
    });
  };
  
  exports.down = async knex => {
    return knex.schema.alterTable('tamanho', table => {
      table.renameColumn('tamanho', 'nome');
    });
  };
  