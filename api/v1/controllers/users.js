import express from 'express'

const router = express.Router();
router.get("/myIdentity", async (req, res) => {
    if (req.session.isAuthenticated) {
        res.json({
            status: "loggedin",
            userInfo: {
                name: req.session.account.name,
                username: req.session.account.username
            }
        });
    } else {
        res.json({ status: "loggedout" });
    }
});
router.get('/', async (req, res) => {
    try {
        if (req.session.isAuthenticated) {
            const allReviews = await req.models.Review.find({ 'author': 'dngo2@uw.edu' })
            let userInfo = [];
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
            let allStudyspots = []
            const data = await req.models.User.findOne({ 'username': req.session.account.username })
            for (let i = 0; i < data.bookmarks.length; i++){
                let studyspot = await req.models.StudySpot.find({ '_id': data.bookmarks[i] })
                allStudyspots.push(studyspot)
            }
            userInfo.push(reviews)
            userInfo.push(allStudyspots)
            res.send(userInfo);
        } else {
            res.status(401).send({
                status: 'error',
                error: 'not logged in'
            })
        }
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ "status": "error", "error": error });
    }
})

export default router;