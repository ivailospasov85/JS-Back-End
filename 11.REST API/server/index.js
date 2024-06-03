const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const routes = require('./routes')

const app = express()
const port = 3030

app.use(cors({}))
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','http://localhost:3000')
// })

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})


app.use(routes)

mongoose.connect('mongodb://127.0.0.1:27017/Furniture-2024')
    .then(() => console.log('Mongo DB connected'))

app.listen(port, () => console.log(`Server is running on ${port} port`))