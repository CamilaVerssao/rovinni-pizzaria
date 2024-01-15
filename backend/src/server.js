const express = require('express');
const router = require('./router');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(router);

// catch all errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: error.message });
});

app.listen(3000, () => {
    console.log('Server running ok...');
})