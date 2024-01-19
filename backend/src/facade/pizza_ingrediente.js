const db = require('../dbo/base');

const get = async (query) => {

    const fields = [
        'produto.id as produtoId',
        'ingrediente.id as ingredienteId',
        'produto.*',
        'pizza_ingrediente.*',
        'ingrediente.*'
    ]

    const params = [{
       
    }];
    
    const join = [
        {
            paramTo: 'pizza_ingrediente.prodId',
            paramFrom: 'produto.id',
            type: 'leftJoin',
            tableName: 'produto'
        },
        {
            paramTo: 'pizza_ingrediente.ingredId',
            paramFrom: 'ingrediente.id',
            type: 'leftJoin',
            tableName: 'ingrediente'
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