// post a review to a location
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
    // not done yet
    try {
        // use sessions later
        if (true) {
            const newReview = new req.models.StudySpot({
                name: req.body.name, 
                author: req.body.author,
                // maybe need to double check this one
                studyspot: {type: mongoose.Schema.Types.ObjectId, ref: "StudySpot"}, 
                reviewText: req.body.reviewText, 
                rating: req.body.rating, 
                dateCreated: req.body.dateCreated
            });

            await newReview.save();
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