const db = require('../config/db');

const get = async(tableName, params) => {
    let baseQuery = db(tableName).where('deleted_at', null);

    if(params) {
        params.forEach(param => {
            if(param.value && param.field){
                baseQuery = baseQuery.where(param.field, param.value);
            }
        });
    }
    return await baseQuery;
}

const getById = async(id, tableName) => {
    const result = await db(tableName)
        .select()
        .where('id', id)
        .where('deleted_at', null)
        .first()
        .catch((error => {
            console.log(error.message);
        }));

        return result;
}

const insert = async(object, tableName) => {
    const result = await db(tableName)
        .insert(object)
        .catch((error => {
            console.log(error.message);
        }));

        return await getById(result[0], tableName);
}

const update = async(id, object, tableName) => {
    const baseQuery = db(tableName).where('deleted_at', null);

    const result = await baseQuery
        .update(object)
        .where('id', id)
        .catch((error => {
            console.log(error.message);
        }));

    return result;
}

const remove = async(id, tableName) => {
    const result = await db(tableName)
        .update({ deleted_at: new Date() })
        .where('id', id)
        .catch((error => {
            console.log(error.message);
        }));

    return result;
}

const login = async (tableName, username) => {
    const result = await db(tableName)
        .select()
        .where('username', username)
        .where('deleted_at', null)
        .first()
        .catch((err) => {
            console.log(err)
            return false
        })
        return result;
    }


module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
    login
}
