
const handleResponse = async(req, res, response) => {
    if(res) {
        if(res.errors) return res.status(400).json(response.errors);
        return res.status(200).json(response);
    }
    return res.sendStatus(404);
}

const get = async(req, res) => {
    const facade = require(`../facade/${req.params.route}`);
    const response = await facade.get(req.query);
    handleResponse(req, res, response);
    return;
}

const getById = async(req, res) => {
    const facade = require(`../facade/${req.params.route}`);
    const response = await facade.getById(req.params.id);
    handleResponse(req, res, response);
    return;
}

const insert = async(req, res) => { console.log(req.body)
    const facade = require(`../facade/${req.params.route}`);
    const response = await facade.insert(req.body);
    handleResponse(req, res, response);
    return;
}

const update = async(req, res) => {
    const facade = require(`../facade/${req.params.route}`);
    const response = await facade.update( req.params.id, req.body,);
    handleResponse(req, res, response);
    return;
}

const remove = async(req, res) => {
    const facade = require(`../facade/${req.params.route}`);
    if (!facade) return res.sendStatus(404)
    const response = await facade.remove(req.params.id);
    handleResponse(req, res, response);
    return;
}


module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}