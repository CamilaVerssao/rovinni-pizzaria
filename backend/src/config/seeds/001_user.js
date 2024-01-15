
exports.seed = async knex => {
  await knex('funcionario').del()
  await knex('funcionario').insert([
    { username: 'camila', senha: 'teste' }
  ]);
};
