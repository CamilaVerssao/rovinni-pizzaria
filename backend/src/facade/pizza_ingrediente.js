const db = require('../dbo/base');

const get = async (query) => {

    const fields = [
        'pizzaIngrediente.quantidade as quantidadeIngrediente',
        'produto.id as produtoId',
        'produto.nome as produtoNome',
        'produto. preco',
        'produto.volumeVendas',
        'produto.custo',
        'produto.categoriaId',
        'produto.tipoId',
        'produto.tamanhoId',
        'produto.deleted_at as prodDeletedAt',
        'produto.updated_at as prodUpdatedAt',
        'produto.created_at as prodCreatedAt',
        'produto.descricao as produtoDescricao',
        'ingrediente.id as ingredienteId',
        'ingrediente.nome as ingredienteNome',
        'ingrediente.precoRelativo',
        'ingrediente.estoqueMinimo as ingredEstoqueMin',
        'ingrediente.estoqueAtual as ingredEstoqueAtual',
        'ingrediente.categoriaId as ingredCategoriaId',
        'ingrediente.createdAt as ingredCreatedAt',
        'ingrediente.updatedAt as ingredUpdatedAt',
        'ingrediente.deletedAt as ingredDeletedAt',
        'tamanho.id as tamanhoId',
        'tamanho.tamanho',
        'tamanho.createdAt as tamanhoCreatedAt',
        'tamanho.updatedAt as tamanhoUpdatedAt',
        'tamanho.deletedAt as tamanhoDeletedAt'
    ]

    const params = [{
        field: 'prodId',
        value: query.produtoId
    }];
    
    const join = [
        {
            paramTo: 'pizza_ingrediente.prodId',
            paramFrom: 'produto.id',
            type: 'rightJoin',
            tableName: 'produto'
        },
        {
            paramTo: 'pizza_ingrediente.ingredId',
            paramFrom: 'ingrediente.id',
            type: 'leftJoin',
            tableName: 'ingrediente'
        },
        {
            paramTo: 'produto.tamanhoId',
            paramFrom: 'tamanho.id',
            type: 'leftJoin',
            tableName: 'tamanho'
        }
    ];
    return await db.get('pizza_ingrediente', params, join, fields);
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'pizza_ingrediente');
}
const insert = async (object) => {
    try {
        return await db.insert(object, 'pizza_ingrediente');
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
    return await db.update(id, object, 'pizza_ingrediente');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'pizza_ingrediente');
}
       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}