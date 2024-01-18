const db = require('../dbo/base');

const get = async (query) => {

    const fields = [
        'produto.id as produtoId',
        'produto.*',
        'tamanho.*'
    ]

    const params = [{
        field: 'tipo_id',
        value: query.tipo
    }];
    
    const join = [{
        paramTo: 'produto.tamanho_id',
        paramFrom: 'tamanho.id',
        type: 'leftJoin',
        tableName: 'tamanho'
    }];

    return await db.get('produto', params, join, fields);
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'produto');
}
const insert = async (object) => {
    try {
        return await db.insert(object, 'produto');
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