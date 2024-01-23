const db = require('../dbo/base');

const get = async (query) => {

    const fields = [
        'produto.id as produtoId',
        'produto.nome as produtoNome',
        'produto.descricao as produtoDescricao',
        'categoria.nome as categoriaNome',
        'tipo.nome as tipoNome',
        'produto.*',
        'tamanho.*',
        'categoria.*',
        'tipo.*'
    ]

    const params = [
        {
            field: 'tipo_id',
            value: query.tipo
        }
    ];
    
    const join = [
        {
            paramTo: 'produto.tamanho_id',
            paramFrom: 'tamanho.id',
            type: 'leftJoin',
            tableName: 'tamanho'
        },
        {
            paramTo: 'produto.categoria_id',
            paramFrom: 'categoria.id',
            type: 'leftJoin',
            tableName: 'categoria'
        },
        {
            paramTo: 'produto.tipo_id',
            paramFrom: 'tipo.id',
            type: 'leftJoin',
            tableName: 'tipo'
        }
    ];

    return await db.get('produto', params, join, fields);
}
const getById = async (id) => {

    if(!id) return;

    const fields = [
        'produto.id as produtoId',
        'produto.nome as produtoNome',
        'produto.descricao as produtoDescricao',
        'categoria.nome as categoriaNome',
        'tipo.nome as tipoNome',
        'produto.*',
        'tamanho.*',
        'categoria.*',
        'tipo.*'
    ]

    const params = [
        {
           
        }
    ];
    
    const join = [
        {
            paramTo: 'produto.tamanho_id',
            paramFrom: 'tamanho.id',
            type: 'leftJoin',
            tableName: 'tamanho'
        },
        {
            paramTo: 'produto.categoria_id',
            paramFrom: 'categoria.id',
            type: 'leftJoin',
            tableName: 'categoria'
        },
        {
            paramTo: 'produto.tipo_id',
            paramFrom: 'tipo.id',
            type: 'leftJoin',
            tableName: 'tipo'
        }
    ];

    return await db.getById(id, 'produto', params, join, fields);
}
const insert = async (object) => {
        return await db.insert(object, 'produto');
}
const update = async (id, object) => {
    if(!id) return;
    return await db.update(id, object, 'produto');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'produto');
}

       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}