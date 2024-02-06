const express = require('express')
const cookieParser=require('cookie-parser')
const bcrypt = require('bcrypt')

app = express()
port = 5000

app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'Iv4o',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get('/', (req, res) => {

    if (req.session.userInfo) {
        res.send(`Hello ${req.session.userInfo.username}`)
    }
    else {
        res.send('Please Login')
    }

})

app.get('/login', (req, res) => {
    res.send(`
    <form action="/login" method="post">
        <label>Username</label>
        <input type="text" name="username" />
        <label>Password</label>
        <input type="password" name="password">
        <input type="submit" value="login">
    </form>`)
})

app.post('/login', async (req, res) => {
    
    

    res.cookie('user', req.body.username)

    res.end()
})

app.get('/register', (req, res) => {
    res.send(`
    <form action="/register" method="post">
        <label>Username</label>
        <input type="text" name="username" />
        <label>Password</label>
        <input type="password" name="password">
        <input type="submit" value="login">
    </form>`)
})

app.post('/register',async(req,res)=>{
    // const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, 12)
     
})


app.get('/logout', (req, res) => {


    // res.cookie('user', req.body.username)
     res.end()
})

app.listen(port, () => console.log(`Server is running ot ${port}`))