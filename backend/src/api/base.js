const get = async(req, res) => {
    const facade = require(`../facade/${req.params.route}`);
    const response = await facade.get(req.query);
    return res.status(200).json(response);
}

const getById = async(req, res) => {
    const facade = require(`../facade/${req.params.route}`);
    const response = await facade.getById(req.params.id);
    return res.status(200).json(response);
}

const insert = async(req, res) => { console.log(req.body)
    const facade = require(`../facade/${req.params.route}`);
    const response = await facade.insert(req.body);
   
    return res.status(200).json(response);
}

const update = async(req, res) => {
    const facade = require(`../facade/${req.params.route}`);
    const response = await facade.update( req.params.id, req.body,);
    return res.status(200).json(response);
}

const remove = async(req, res) => {
    const facade = require(`../facade/${req.params.route}`);
    if (!facade) return res.sendStatus(404)
    const response = await facade.remove(req.params.id);
    return res.status(200).json(response);
}


module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}