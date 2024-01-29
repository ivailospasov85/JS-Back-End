const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')

const app = express()

const cats = [
    {
        name: 'Navcho',
        age: 8,
        breed: 'persian',
    },

    {
        name: 'Sisa',
        age: 18,
        breed: 'belgiam',
    },
    {
        name: 'lqliu',
        age: 40,
        breed: 'ciganin',
    }]


app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))

// app.get('/styles/site.css', (req, res) => {
//     res.sendFile(path.join(__dirname,'styles','site.css'))
// })

app.use((req, res, next) => {
    console.log('Request ULR:' + req.url);

    // if (Math.random() < 0.5) {
    //     return res.send('You don`t have luck :)');
    // }

    next()
})
// (req, res) => {

//     // res.redirect('/cats')
//     // res.send('New cat created')
//



app.get('/', (req, res) => {
    res.render('home', { name: 'Iv4o' })
});

app.get('/cats', (req, res) => {
    // res.send('cats page')
    res.render('cats', { cats:cats })
})

app.get('/cats/download', (req, res) => {
    const imagePath = path.join(__dirname, 'images', 'cuteCat.png')

    res.download(imagePath)
    // res.sendFile(imagePath)
    // res.attachment(imagePath)
    // res.end()

})

app.get('/cats/:catName', (req, res) => {
    const currentCatName = req.params.catName

    res.send(`Cat individual page- ${currentCatName}`)

})
app.get('/test', (req, res) => {
    res.end()
})



app.all('/dogs', (req, res) => {
    res.send('This is a cat application')
})
app.all('*', (req, res) => {
    res.status(404).send('Page not found - 404 ')
})


app.listen(5000)
console.log('server is lessening on port 5000...');