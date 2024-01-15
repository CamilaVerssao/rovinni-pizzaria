const db = require('../dbo/base');

const get = async () => {
    return await db.get('ingrediente');
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'ingrediente');
}
const insert = async (object) => {
    return await db.insert(object, 'ingrediente');
}
const update = async (id, object) => {
    if(!id) return;
    return await db.update(id, object, 'ingrediente');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'ingrediente');
}
       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}