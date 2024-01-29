const db = require('../dbo/base');

const get = async (query) => {

    const fields = [
        'pedidoItem.id as pedidoItemId',
        'pedidoItem.quantidade',
        'pedidoItem.prodId as ',
        'produto.id as produtoId',
        'produto.nome as produtoNome',
        'produto. preco',
        'produto.volumeVendas',
        'produto.custo',
        'produto.estoqueMinimo',
        'produto.estoqueAtual',
        'produto.categoriaId',
        'produto.tipoId',
        'produto.tamanhoId',
        'produto.deleted_at as prodDeletedAt',
        'produto.updated_at as prodUpdatedAt',
        'produto.created_at as prodCreatedAt',
        'produto.descricao as produtoDescricao',
        'pedido.id as pedidoId',
        'pedido.pagamento',
        'pedido.status',
        'pedido.total',
        'pedido.funcionarioId as pedidoFuncionarioId',  
        'pedido.clienteId as pedidoClienteId',
        'pedido.updatedAt as pedidoUpdatedAt',
        'pedido.createdAt as pedidoCreatedAt', 
        'pedido.deletedAt as pedidoDeletedAt', 
        'tamanho.id as tamanhoId',
        'tamanho.tamanho',
        'tamanho.createdAt as tamanhoCreatedAt',
        'tamanho.updatedAt as tamanhoUpdatedAt',
        'tamanho.deletedAt as tamanhoDeletedAt'
    ]

    const params = [{
        field: 'pedidoId',
        value: query.pedido
    }];
    
    const join = [
        {
            paramTo: 'pedido_item.prodId',
            paramFrom: 'produto.id',
            type: 'leftJoin',
            tableName: 'produto'
        },
        {
            paramTo: 'pedido_item.pedidoId',
            paramFrom: 'pedido.id',
            type: 'leftJoin',
            tableName: 'pedido'
        },
        {
            paramTo: 'tamanho.id',
            paramFrom: 'produto.tamanhoId',
            type: 'leftJoin',
            tableName: 'tamanho'
        }
    ];

    return await db.get('pedido_item', params, join, fields);
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'pedido_item');
}
const insert = async (object) => {
    try {
        return await db.insert(object, 'pedido_item');
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
    return await db.update(id, object, 'pedido_item');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'pedido_item');
}
       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}