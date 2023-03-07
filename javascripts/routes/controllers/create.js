// create a new studyspot LOCATION 

import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
    // WORKING
    try {
        if (req.session.isAuthenticated) {     // replace with req.session.isAuthenticated later on
            const newLocation = new req.models.StudySpot({
                name: req.body.name,
                address: req.body.address,
                authorReview: req.body.authorReview,
                initialRating: req.body.initialRating,
                ratingsList: req.body.ratingsList,
                avgRating: req.body.avgRating,
                author: req.body.author,
                dateCreated: req.body.dateCreated
            })

            await newLocation.save()

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

export default router