const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 5000

const routes = require('./routes')

const configHandlebars = require('./config/configHandlebars')
const configExpress = require('./config/configExpress')

configHandlebars(app);
configExpress(app);

app.use(routes);


mongoose.connect(`mongodb://127.0.0.1:27017/magic-movies`)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.error('Connection error:', err));


app.listen(port, () => console.log(`Server is listening ot port ${port}`))