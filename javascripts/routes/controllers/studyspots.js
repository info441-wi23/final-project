// gets the study spots for home page
import express from 'express'

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("study spot router get is now being used");

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
    try {
        if (req.session.isAuthenticated) {
            let allPosts = await req.models.StudySpot.find({ 'name': req.body.name })
            if (allPosts.length == 0) {
                const newLocation = new req.models.StudySpot({
                    name: req.body.name,
                    address: req.body.address,
                    initialRating: req.body.initialRating,
                    dateCreated: req.body.dateCreated
                })
                await newLocation.save();
                const newReview = new req.models.Review({
                    name: req.body.name,
                    author: req.body.author,
                    studyspot: newLocation._id,
                    rating: req.body.initialRating,
                    reviewText: req.body.authorReview,
                    dateCreated: req.body.dateCreated
                })
                await newReview.save()
            } else {
                res.status(402).send('Location already in database')
            }
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