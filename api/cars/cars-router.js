// DO YOUR MAGIC
const router = require('express').Router()
const Car = require('./cars-model')
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique } = require('./cars-middleware')

// *** Base URL /api/cars ***
// [GET] / (Returns array of cars sorted by id)
router.get('/', async (req, res, next) => {
  try {
    const allCars = await Car.getAll()
    res.json(allCars)
  } catch (err) {
    next(err)
  }
})

// [GET] /:id (Returns car with given id)
router.get('/:id/', checkCarId,  (req, res) => {
  res.json(req.carInfo)
})

// [POST] / (Creates car, and returns new car)
router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
  try {
    const newCar = await Car.create(req.body)
    res.status(201).json(newCar)
  } catch (err) {
    next(err)
  }
})

// Error Catching
router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: 'Something went wrong in the cars router',
    errMessage: err.message,
    stack: err.stack
  })
})

module.exports = router