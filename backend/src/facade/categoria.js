const db = require('../dbo/base');

const get = async () => {
    return await db.get('categoria');
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'categoria');
}
const insert = async (object) => {
    try {
        return await db.insert(object, 'categoria');
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