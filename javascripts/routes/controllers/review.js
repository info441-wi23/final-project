// post a review to a location
import express from 'express'

const router = express.Router()


router.get('/', async (req, res) => {
    // not done yet
    try {
        // use sessions later
        if (true) {
            console.log('req.query.spotID: ', req.query.spotID)
            const allReviews = await req.models.Review.find({ 'studyspot': req.query.spotID })
            console.log('all reviews: ', allReviews)
            let reviews = [];
            for (let i = 0; i < allReviews.length; i++) {
                reviews.push({
                    "name": allReviews[i].name,
                    "author": allReviews[i].author,
                    "rating": allReviews[i].rating,
                    "reviewText": allReviews[i].reviewText,
                    "dateCreated": allReviews[i].dateCreated
                })
            }
            res.send(reviews)

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
            const newReview = new req.models.Review({
                name: req.body.name,
                author: req.body.author,
                studyspot: req.body.spotID,
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