exports.up = async knex => {
  return knex.schema.alterTable('produto', table => {
    table.text('imagem');
  });
};

exports.down = function(knex) {
    return knex.schema.alterTable(tableName, table => {
        table.dropColumn('imagem');
    });;
};