const db = require('../dbo/base');

const get = async () => {
    return await db.get('tipo');
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'tipo');
}
const insert = async (object) => {
    try {
        return await db.insert(object, 'tipo');
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