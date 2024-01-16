const db = require('../dbo/base');

const get = async () => {
    return await db.get('tamanho');
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'tamanho');
}
const insert = async (object) => {
    try {
        return await db.insert(object, 'tamanho');
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
    return await db.update(id, object, 'tamanho');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'tamanho');
}
       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}