const db = require('../dbo/base');
const bcrypt = require('bcrypt');

const get = async () => {
    return await db.get('funcionario');
}
const getById = async (id) => {
    if(!id) return;
    return await db.getById(id, 'funcionario');
}
const insert = async (object) => {
    try {
        const senha = await bcrypt.hash(object.senha, 10);
        return await db.insert({ ...object, senha }, 'funcionario'); 
    }
    catch(error) {
        console.log(error);
        if(error.details) {
            const errors = error.details.map((el) => el.message)
            return { errors } 
        } else {
            return { errors: [error.message] }
        }
    }
}
const update = async (id, object) => {
    if(!id) return;
    return await db.update(id, object, 'funcionario');
}
const remove = async (id) => {
    if(!id) return;
    return await db.remove(id, 'funcionario');
}
       
module.exports = {
    get, 
    getById,
    insert, 
    update,
    remove
}