// post a review to a location
import express from 'express'

const router = express.Router()

router.delete('/', async (req, res) => {
    if(req.session.isAuthenticated){
      let reviewId = req.body.reviewId
      let review = await req.models.Review.findById(reviewId)
      if(req.session.account.username != review.author){
        res.status(401).json({"status": "error", "error": "you can only delete your own posts"})
      } else {
        await req.models.Review.deleteOne({_id: reviewId});
        res.json({"status": "success"})
      }
    } else {
      res.status(401).json({"status": "error", "error": "not logged in"})
    }
  
  })


router.get('/', async (req, res) => {
    try {
        const allReviews = await req.models.Review.find({ 'studyspot': req.query.spotID })
        let reviews = [];
        for (let i = 0; i < allReviews.length; i++) {
            reviews.push({
                "name": allReviews[i].name,
                "author": allReviews[i].author,
                "spotid": allReviews[i].studyspot,
                "rating": allReviews[i].rating,
                "reviewText": allReviews[i].reviewText,
                "dateCreated": allReviews[i].dateCreated
            })
        }
        res.send(reviews)
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error: error
        })
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

router.post('/', async (req, res) => {
    // not done yet
    try {
        // use sessions later
        if (req.session.isAuthenticated) {
            const newReview = new req.models.Review({
                name: req.body.name,
                author: req.session.account.username,
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