const db = require('../dbo/base');

const get = async () => {
    return await db.get('tipo');
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'tipo');
}
const insert = async (object) => {
    return await db.insert(object, 'tipo');
}
const update = async (id, object) => {
    if(!id) return;
    return await db.update(id, object, 'tipo');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'tipo');
}
       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}