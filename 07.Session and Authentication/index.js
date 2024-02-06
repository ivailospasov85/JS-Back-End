const express = require('express')
const cookieParser = require('cookie-parser')

app = express()
port = 5000

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => {
    const user = req.cookies['user']

    if (user) {
        res.send(`Hello ${user}`)
    } else {
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

app.post('/login', (req, res) => {
    res.cookie('user', req.body.username)
    res.end()
})

app.get('/logout',(req,res)=>{
    res.clearCookie('user')
    res.end()
})

app.listen(port, () => console.log(`Server is running ot ${port}`))