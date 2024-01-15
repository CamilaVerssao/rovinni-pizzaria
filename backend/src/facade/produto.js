const db = require('../dbo/base');

const get = async (query) => {
    const params = [{
        field: 'tipo_id',
        value: query.tipo
    }];

    return await db.get('produto', params);
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'produto');
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