const db = require('../dbo/base');

const get = async (query) => {

    const fields = [
        'produto.id as produtoId',
        'produto.nome as produtoNome',
        'produto. preco',
        'produto.codigo',
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
        'categoria.nome as categoriaNome',
        'categoria.id as categoriaId',
        'categoria.descricao as categoriaDescricao',
        'categoria.ativo',
        'categoria.deleted_at as categoriaDeletedAt',    
        'categoria.updated_at as categoriaUpdatedAt',   
        'categoria.created_at as categoriaCreatedAt',   
        'tipo.nome as tipoNome',
        'tipo.id as tipoId',
        'tipo.deleted_at as tipoDeletedAt',
        'tipo.updated_at as tipoUpdatedAt',
        'tipo.created_at as tipoCreatedAt',
        'tamanho.id as tamanhoId',
        'tamanho.tamanho',
        'tamanho.createdAt as tamanhoCreatedAt',
        'tamanho.updatedAt as tamanhoUpdatedAt',
        'tamanho.deletedAt as tamanhoDeletedAt'
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
        'produto. preco',
        'produto.codigo',
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
        'categoria.nome as categoriaNome',
        'categoria.id as categoriaId',
        'categoria.descricao as categoriaDescricao',
        'categoria.ativo',
        'categoria.deleted_at as categoriaDeletedAt',    
        'categoria.updated_at as categoriaUpdatedAt',   
        'categoria.created_at as categoriaCreatedAt',   
        'tipo.nome as tipoNome',
        'tipo.id as tipoId',
        'tipo.deleted_at as tipoDeletedAt',
        'tipo.updated_at as tipoUpdatedAt',
        'tipo.created_at as tipoCreatedAt',
        'tamanho.id as tamanhoId',
        'tamanho.tamanho',
        'tamanho.createdAt as tamanhoCreatedAt',
        'tamanho.updatedAt as tamanhoUpdatedAt',
        'tamanho.deletedAt as tamanhoDeletedAt'
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