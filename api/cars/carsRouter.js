const express = require('express')
const router = express.Router()
const carsData = require('../../data/dbConfig.js')

// get all cars from database
router.get('/', (req, res) => {
    carsData('cars')
        .then(cars => {
            res.status(200).json(cars)
        }) 
        .catch (() => {
            res.status(500).json({ message: 'Cars could not be retrieved' })
        })
})

router.get('/:id', validateCarId, (req, res) => {
    res.status(200).json(req.car)
})

router.get

// Middleware

function validateCar(req, res, next) {
    // send 400 error if req.body is missing, if req.body.Make is missing, if req.body.Model is missing, if req.body.Mileage is missing, or if req.body.VIN is missing
    if (!req.body){
        res.status(400).json({ message: 'missing account data' })
    } else if (!req.body.Make){
        res.status(400).json({ message: 'missing required Make field' })
    } else if (!req.body.Mileage){
        res.status(400).json({ message: 'missing required Mileage field' })
    } else if (!req.body.VIN){
        res.status(400).json({ message: 'missing required VIN field' })
    } else if (!req.body.Model){
        res.status(400).json({ message: 'missing required Model field' })
    } else {
        next()
    }
}

function validateCarId(req, res, next) {
    // get car with the params id and assign it to req.car, otherwise return a 400 error
    carData('cars')
        .where({id: parseInt(req.params.id)}).first()
            .then(car => {
                    req.car = car
                    next()
            })
            .catch(() => {
                    res.status(400).json({ message: 'You requested with an invalid car id' })
            })
}

module.exports = router