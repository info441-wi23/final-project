// gets the study spots for home page
import express from 'express'

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("study spot router get is now being used");
   try {
    let allStudySpots = await req.models.StudySpot.find();
    res.send(allStudySpots);
   } catch(error) {
        console.log("Error: " + error);
        res.status(500).json({"status": "error","error": error});
   }
})

export default router;