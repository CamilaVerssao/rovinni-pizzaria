const express = require('express');
const cors = require('cors');
const router = express.Router();
const api = require('./api/base');
const login = require('./api/login');

router.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', '*')
    next()
});

  router.post('/login', login.insert);
  router.get('/:route', api.get);
  router.get('/:route/:id', api.getById);
  router.post('/:route', api.insert);
  router.put('/:route/:id', api.update);
  router.delete('/:route/:id', api.remove);

module.exports = router;
