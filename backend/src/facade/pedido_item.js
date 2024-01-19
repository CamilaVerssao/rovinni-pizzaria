const db = require('../dbo/base');

const get = async (query) => {

    const fields = [
        'produto.id as produtoId',
        'pedido.id as pedidoId',
        'produto.*',
        'pedido.*',
        'pedido_item.*'
    ]

    const params = [{
        field: 'pedido_id',
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