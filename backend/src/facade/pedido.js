const db = require('../dbo/base');

const get = async (query) => {

    const fields = [
        'pedido.id as pedidoId',
        'pedido.pagamento',
        'pedido.status',
        'pedido.total',
        'pedido.funcionarioId as pedidoFuncionarioId',  
        'pedido.clienteId as pedidoClienteId',
        'pedido.updatedAt as pedidoUpdatedAt',
        'pedido.createdAt as pedidoCreatedAt', 
        'pedido.deletedAt as pedidoDeletedAt', 
        'funcionario.id as funcionarioId',
        'funcionario.username',
        'funcionario.senha',
        'funcionario.createdAt as funcionarioCreatedAt',
        'funcionario.updatedAt as funcionarioUpdatedAt',
        'funcionario.deletedAt as funcionarioDeletedAt',
        'cliente.id as clienteId',
        'cliente.nome as clienteNome',
        'cliente.cpf',
        'cliente.createdAt as clienteCreatedAt',
        'cliente.updatedAt as clienteUpdatedAt',
        'cliente.deletedAt as clienteDeletedAt'
    ]

    const params = [{
        field: 'funcionario_id',
        value: query.cookie
    }];

    const join = [
        {
            paramTo: 'pedido.funcionario_id',
            paramFrom: 'funcionario.id',
            type: 'leftJoin',
            tableName: 'funcionario'
        },
        {
            paramTo: 'pedido.cliente_id',
            paramFrom: 'cliente.id',
            type: 'leftJoin',
            tableName: 'cliente'
        }

]

    return await db.get('pedido', params, join, fields);
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'pedido');
}
const insert = async (object) => {
    try {
        return await db.insert(object, 'pedido');
    }
    catch(error) {
        if (error.details) {
            const errors = error.details.map((el) => el.message)
            return { errors }
          } else {
            return { errors: [error.message] }
          }
    }
}
const update = async (id, object) => {
    if(!id) return;
    return await db.update(id, object, 'pedido');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'pedido');
}
       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}