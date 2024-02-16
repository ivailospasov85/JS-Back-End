const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


const routes = require('./routes')
const { authMiddleware } = require('./middleWare/authMiddleWare')

const app = express()
const port = 5000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(authMiddleware)

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs')

app.use(routes)


mongoose.connect('mongodb://127.0.0.1:27017/skeleton')

mongoose.connection.on('connected', () => console.log('MongoDb is connected'))
mongoose.connection.on('error', (err) => console.log(err))

app.listen(port, () => console.log(`Server is listening on port ${port}`))


