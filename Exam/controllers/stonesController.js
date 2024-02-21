const router = require('express').Router()
const { isGuest, isAuth } = require('../middleWare/authMiddleWare')
const stoneServices = require('../services/stoneServices')
const { getErrorMessage } = require('../utils/errorUtils')


router.get('/create', isAuth, (req, res,) => {
    res.render('stones/create')
})

router.post('/create', isAuth, async (req, res) => {
    const stoneDate = req.body

    try {
        await stoneServices.create(req.user._id, stoneDate)

        res.redirect('/stones/dashboard')

    } catch (err) {
        res.render('stones/create', { ...stoneDate, error: getErrorMessage(err) })
    }

})

router.get('/dashboard', async (req, res,) => {
    const stones = await stoneServices.getAll().lean()
    res.render('stones/dashboard', { stones })
})

router.get('/:stoneId/details',async (req, res) => {
    const stone = await stoneServices.getOneWhitPopulate(req.params.stoneId).lean()


    const isOwner = stone.owner._id.toString() === req.user?._id.toString();


    const isLiked = stone.likedList.some(user => user._id == req.user?._id)

    res.render('stones/details', { ...stone, isOwner, isLiked })
})


router.get('/:stoneId/edit', isStonesOwner, async (req, res) => {


    const stone = await stoneServices.getOne(req.params.stoneId).lean()

    res.render('stones/edit', { ...stone })
})


router.post('/:stoneId/edit', isStonesOwner, async (req, res) => {
    const stoneDate = req.body
    try {
        await stoneServices.edit(req.params.stoneId, stoneDate)

        res.redirect(`/stones/${req.params.stoneId}/details`)
    } catch (err) {
        res.render('stones/edit', { ...stoneDate, error: getErrorMessage(err) })
    }
})



router.get('/:stoneId/delete', isStonesOwner, async (req, res) => {
    await stoneServices.delete(req.params.stoneId)

    res.redirect('/stones/dashboard')
})

router.get('/search', async (req, res) => {

    const { name } = req.query
    
    const StoneResult = await stoneServices.search(name).lean()

    res.render('stones/search', { stones: StoneResult})
})

async function isStonesOwner(req, res, next) {
    const stone = await stoneServices.getOne(req.params.stoneId)

    if (stone.owner != req.user?._id) {
        return res.redirect(`/stones/${req.params.stoneId}/details`)
    }


    next()

}

router.get('/:stoneId/likeUp', async (req, res) => {
    await stoneServices.likenUp(req.params.stoneId, req.user._id)



    res.redirect(`/stones/${req.params.stoneId}/details`)
})


module.exports = router


