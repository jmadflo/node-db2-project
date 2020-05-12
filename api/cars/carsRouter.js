const express = require('express')
const router = express.Router()
const carsData = require('../../data/dbConfig.js')

router.get('/', (req, res) => {
    carsData('cars')
        .then(cars => {
            res.status(200).json(cars)
        }) 
        .catch (() => {
            res.status(500).json({ message: 'Cars could not be retrieved' })
        })
})



module.exports = router