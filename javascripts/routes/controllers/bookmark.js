// bookmark a location
import express from 'express'

const router = express.Router()


router.get('/', async (req, res) => {
    // not done yet
    try {
        // use sessions later
        if (true) {
            let user = await req.models.User.find({username: req.session.account.username})
            // send arr
            res.send(user.bookmarks)

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

router.post('/', async (req, res) => {
    // not done yet
    try {
        // use sessions later
        if (true) {
            // define newbookmark from other side later
            // will we send the name of the studyspot to be bookmarked??
            let newBookmark = req.body.newBookmark;
            let user = await req.models.User.find({username: req.session.account.username})
            if (!user.bookmarks.includes(newBookmark)) {
                user.bookmarks.push(newBookmark);
            }

            await user.save();
            res.json({ status: "success" });

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

export default router;