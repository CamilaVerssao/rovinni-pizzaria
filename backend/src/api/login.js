const db = require('../dbo/base')
const bcrypt = require('bcrypt')

const insert = async(req, res) => {
    try {
        const user = await db.login('funcionario', req.body.username);
        if (!user) return res.sendStatus(404);
        if(await bcrypt.compare(req.body.senha, user.senha)) {
            res.cookie('cookie', user.id, {
                httpOnly: true,
                maxAge: 5000000
            }); 
            return res.status(200).json({ user: user.id });
        }
       

        throw new Error('Senha inválida');
    }
    catch (error) {
        if (error.details) {
          const errors = error.details.map((el) => el.message)
          return res.status(400).json(errors)
        } else {
          return res.status(400).json([error.message]);
        }
      }
}

module.exports = {
    insert
}