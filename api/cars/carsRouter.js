const express = require('express')
const router = express.Router()
const carData = require('../../data/dbConfig.js')

// get all cars from database
router.get('/', (req, res) => {
    carData('cars')
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

// inserts new car to the database
router.post('/' , validateCar, (req, res) => {
    carData('cars')
        .insert(req.body)
            .then(carId => {
                // this returns an array containing the id of the posted car. I've called it carId
                carData('cars').where({id: carId[0]}).first()
                    // now I want to return the inserted car
                    .then(car => {
                        res.status(200).json(car)
                    })
                    .catch(() => {
                        res.status(500).json({ message: 'The car was inserted, but could not be returned'})
                    })
            })
            .catch(() => {
                res.status(500).json({ message: `The car with id of ${req.params.id} could not be inserted`})
            })
})

// updates car already in database
router.put('/:id', validateCar, validateCarId, (req, res) => {
    carData('cars').where({ id: req.params.id }).update(req.body)
        .then(numberOfCarsUpdated => {
            if (numberOfCarsUpdated === 1) {
                // retrieve the car that was updated and return it to the client
                carData('cars').where({ id: req.params.id }).first()
                    .then(car => {
                        res.status(200).json(car)
                    })
                    .catch(() => {
                        res.status(500).json({ message: `The car with id of ${req.params.id} could not be retrieved after being updated`})
                    })
            } else {
                res.status(500).json({ message: `The car with id of ${req.params.id} could not be updated`})
            }
        })
        .catch(() => {
            res.status(500).json({ message: `The car with id of ${req.params.id} could not be updated`})
        })
})

// deletes a car from the database
router.delete('/:id', validateCarId, (req, res) => {
    carData('cars').where({ id: req.params.id }).del()
        .then(() => res.status(200).json({ message: `The car with id of ${req.params.id} has been deleted` }))
        .catch(() => res.status(500).json({ message: `The car with id of ${req.params.id} could not be deleted`}))
})


// Middleware

function validateCar(req, res, next) {
    // send 400 error if req.body is missing, if req.body.Make is missing, if req.body.Model is missing, if req.body.Mileage is missing, or if req.body.VIN is missing
    if (!req.body){
        res.status(400).json({ message: 'missing car data' })
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