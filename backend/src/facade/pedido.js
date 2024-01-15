const db = require('../dbo/base');

const get = async () => {
    return await db.get('pedido');
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'pedido');
}
const insert = async (object) => {
    return await db.insert(object, 'pedido');
}
const update = async (id, object) => {
    if(!id) return;
    return await db.update(id, object, 'pedido');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'pedido');
}
       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}