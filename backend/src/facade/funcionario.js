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
    const senha = await bcrypt.hash(object.senha, 10);
    return await db.insert({ ...object, senha }, 'funcionario');
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