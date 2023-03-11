import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        if (req.session.isAuthenticated) {
            const data = await req.models.User.findOne({ 'username': req.session.account.username })
            if (data) {
                res.status(200).send(data.bookmarks)
            } else {
                res.status(200).send([])
            }
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
            // find user
            let currentUser = await req.models.User.findOne({'username': req.session.account.username });
            if (currentUser) { // if user has bookmarked already
                if (currentUser.bookmarks.includes(req.body.bookmark)) {
                    const index = currentUser.bookmarks.indexOf(req.body.bookmark);
                    currentUser.bookmarks.splice(index, 1);
                } else {
                    currentUser.bookmarks.push(req.body.bookmark);
                }
                await currentUser.save();
            } else { // its their first time bookmarking
                const bookmarkArray = [];
                bookmarkArray.push(req.body.bookmark);
                const newUserBookmarks = req.models.User({
                    username: req.session.account.username,
                    bookmarks: bookmarkArray
                });
                await newUserBookmarks.save()
            }
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

export default router