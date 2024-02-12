const express = require('express')
const validator = require('validator')
const { check, validationResult } = require('express-validator')

const app = express()
const port = 5000

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/register', (req, res) => {
    res.send(`<form method="post">
    <div>
        <label for="username">Username</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="send"/>
    </div>
    
</form>`)
})
// Extract validation in util function
function isPasswordValid(password) {
    let isValid = true
    if (password < 8) {
        isValid = false
    }

    return isValid
}

// Extract validation in middleware
function isValidPasswordMiddleware(req, res, next) {
    if (validator.isLength(req.body.password.length, { max: 64, min: 8 })) {
        return res.status(400).send('Password should be at least 8 characters')
    }

    next()
}

const buildIsPasswordValidatorMiddleware = (errorMessage) => (req, res, next) => {
    if (req.body.password.length < 8) {
        return res.status(400).send(errorMessage)
    }

    next()
}




app.post('/register', (req, res) => {
    if (!isPasswordValid(req.body.password)) {
        return res.status(400).send('Password should be at least 8 characters')
    }

    if (!validator.isEmail(req.body.username)) {
        return res.status(400).send('Username should be a valid email')
    }


    // EXPRESS-VALIDATOR
    // check('email').isEmail()
    // check('password').isLength({ min: 5 })

    // const errors = validationResult(req)

    // if(!errors.isEmpty())

    res.redirect('/register')
})

app.listen(port, () => console.log(`Server is listening on port ${port}`))