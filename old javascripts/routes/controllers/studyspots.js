// gets the study spots for home page
import express from 'express'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let allStudySpots = await req.models.StudySpot.find();
        let spots = [];
        for (let i = 0; i < allStudySpots.length; i++) {
          const reviews = await req.models.Review.find({'studyspot': allStudySpots[i]._id })
          let avg = 0;
          if(reviews.length != 0){
               for(let j = 0; j < reviews.length; j++){
                    avg = avg + reviews[j].rating;
               }
               avg = avg/reviews.length;
          }
            spots.push({
                "name": allStudySpots[i].name,
                "spotid": allStudySpots[i]._id,
                "rating": avg,
            })
        }
        res.send(spots);
    } catch (error) {
        res.status(500).json({ "status": "error", "error": error });
    }
})

router.get('/getOne', async (req, res) => {
    const id = req.query.id
    try {
        let studySpot = await req.models.StudySpot.findOne({ '_id': id });
        res.status(200).send(studySpot);
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
                    address: req.body.address,
                    dateCreated: today
                })
                await newLocation.save();
                let num = parseInt(req.body.rating.charAt(1))
                const newReview = new req.models.Review({
                    name: req.body.name,
                    author: req.session.account.username,
                    studyspot: newLocation._id,
                    rating: num,
                    reviewText: req.body.review,
                    dateCreated: today
                })
                
                await newReview.save()
                res.json({"status": "success"})
            } else {
                res.status(402).send('Location already in database')
            }
            res.status(202).send('posted')
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