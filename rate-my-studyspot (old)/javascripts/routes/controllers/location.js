// get location and all its reviews
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('location test')
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    // get location from db with id
    res.send(`id: ${id}`)
})

export default router