const db = require('../dbo/base');

const get = async () => {
    return await db.get('categoria');
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'categoria');
}
const insert = async (object) => {
    return await db.insert(object, 'categoria');
}
const update = async (id, object) => {
    if(!id) return;
    return await db.update(id, object, 'categoria');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'categoria');
}
       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}