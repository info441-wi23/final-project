import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        if (req.session.isAuthenticated) {
            const data = await req.models.User.findOne({ 'username': req.session.account.username })
            res.status(200).send(data.bookmarks)
        } else {
            res.status(200).send(['none'])
        }
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error: error
        })
    }
})

router.post('/', async (req, res) => {
    try {
        if (req.session.isAuthenticated) {
            const newBookmark = new req.models.User({
                username: req.session.account.username,
                bookmarks: [req.body.bookmark]
            })

            await newBookmark.save()
            res.status(200).send({
                status: 'success'
            })

        } else {
            res.status(401).send({
                status: 'error',
                error: 'not logged in'
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error: error
        })
    }
})

router.patch('/', async (req, res) => {
    let currentUser = await req.models.User.findOne({ 'username': req.session.account.username });
    const currentBookmarks = currentUser.bookmarks;

    currentUser.bookmarks = [...currentBookmarks, req.body.bookmark];
    await currentUser.save()
})



export default router