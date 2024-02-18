const router = require('express').Router()
const { isAuth } = require('../middleWare/authMiddleWare')
const courseService = require('../services/courseService')
const userService = require('../services/userService')

router.get('/', async (req, res) => {
    const last3Courses = await courseService.getLast3Courses().lean()
    res.render('home', { last3Courses })
})


router.get('/profile', isAuth, async (req, res) => {
    const user = await userService.getInfo(req.user._id).lean()

    const createdCurses = user.createdCourses?.length || 0 ;
    const signUpCurses = user.signedUpCourses?.length || 0 ;
    res.render('profile', { user, signUpCurses, createdCurses })
})

module.exports = router