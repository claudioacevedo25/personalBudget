const express = require('express')
const app = express()

app.use(require('./balance.routes'));
// app.use(require('./user.routes'));
// app.use(require('./login.routes'));

module.exports = app;
