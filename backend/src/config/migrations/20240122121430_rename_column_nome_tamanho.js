exports.up = async knex => {
    return knex.schema.alterTable('tamanho', table => {
      table.renameColumn('nome', 'tamanho');
    });
  };
  
  exports.down = async knex => {
    return knex.schema.alterTable('tamanho', table => {
      table.renameColumn('tamanho', 'nome');
    });
  };
  