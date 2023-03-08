// Rates an already-published study spot and updates its average rating
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
    // NOT WORKING
    try {
        if (req.session.isAuthenticated) {
            // NEED TO FINISH
            allReviews = await req.models.Review.find({'_id' : req.query.spotID})
            const spot = await req.models.StudySpot.find({
                // fix later if needed
                name: req.body.name
            });

            // recalc rating?
            // mongoose updateOne

            res.status(200).send('posted')
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
