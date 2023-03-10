// gets the study spots for home page
import express from 'express'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let allStudySpots = await req.models.StudySpot.find();
        res.send(allStudySpots);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ "status": "error", "error": error });
    }
})

// create a new studyspot LOCATION 
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        if (req.session.isAuthenticated) {
            let allPosts = await req.models.StudySpot.find({ 'name': req.body.name })
            if (allPosts.length == 0) {
                const newLocation = new req.models.StudySpot({
                    name: req.body.name,
                    author: req.session.account.username ? req.session.account.username : 'Person',
                    image: req.body.image,
                    address: req.body.address,
                    rating: req.body.rating,
                    initialRating: req.body.initialRating,
                    reviewText: req.body.review,
                    dateCreated: req.body.dateCreated
                })
                await newLocation.save();
                const newReview = new req.models.Review({
                    name: req.body.name,
                    author: req.session.account.username,
                    studyspot: newLocation._id,
                    rating: req.body.initialRating,
                    reviewText: req.body.authorReview,
                    dateCreated: req.body.dateCreated
                })
                await newReview.save()
            } else {
                res.status(402).send({ status: 'error', response: 'Location already in database' })
            }
            res.status(200).send({ status: 'success', response: 'posted' })
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