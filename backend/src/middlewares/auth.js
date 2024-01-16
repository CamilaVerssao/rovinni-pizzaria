const db = require('../dbo/base')

const authMiddleware = async(req, res, next) => {
    if(!req.cookies.cookie) {
        return res.sendStatus(401);
    }
    else {
        const user = await db.getById(req.cookies.cookie, 'funcionario');
        if (!user) {
            return res.sendStatus(401);
        }
        next()
   }
}

module.exports =  authMiddleware;
