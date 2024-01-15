const express = require('express');
const cors = require('cors');
const router = express.Router();
const api = require('./api/base');
const login = require('./api/login');
const logout = require('./api/logout');
const auth = require('./middlewares/auth');

router.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', '*'),
    res.header('Access-Control-Allow-Credentials', true)
    router.use(cors({ credentials: true, origin: 'http://localhost:8080' }))
    next()
});

  router.post(`/login`, login.insert);
  router.post(`/logout`, logout.insert);
  router.get(`/:route`, auth, api.get);
  router.get(`/:route/:id`, auth, api.getById);
  router.post(`/:route`, auth, api.insert);
  router.put(`/:route/:id`, auth, api.update);
  router.delete(`/:route/:id`, auth, api.remove);

module.exports = router;
