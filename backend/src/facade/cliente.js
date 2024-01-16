const db = require('../dbo/base');

const get = async () => {
    return await db.get('cliente');
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'cliente');
}
const insert = async (object) => {
    try {
        return await db.insert(object, 'cliente');
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