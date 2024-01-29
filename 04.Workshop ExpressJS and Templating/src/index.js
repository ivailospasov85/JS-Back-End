const express = require('express')

const app = express()
const port = 5000

const routes = require('./routes')

const configHandlebars = require('./config/configHandlebars')
const configExpress = require('./config/configExpress')

configHandlebars(app);
configExpress(app);

app.use(routes);

app.listen(port, () => console.log(`Server is listening ot port ${port}`))