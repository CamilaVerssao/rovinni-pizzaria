const db = require('../dbo/base');

const get = async () => {
    return await db.get('cliente');
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'cliente');
}
const insert = async (object) => {
    return await db.insert(object, 'cliente');
}
const update = async (id, object) => {
    if(!id) return;
    return await db.update(id, object, 'cliente');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'cliente');
}
       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}