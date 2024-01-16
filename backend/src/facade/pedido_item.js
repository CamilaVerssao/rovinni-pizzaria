const db = require('../dbo/base');

const get = async () => {
    return await db.get('pedido_item');
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