const Car = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async(req, res, next) => {
  try {
    const idExists = await Car.getById(req.params.id)
    if (!idExists) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` })
    } else {
      req.carInfo = idExists
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  try {
    const { vin, make, model, mileage } = req.body
    if (!vin) {
      res.status(400).json({ message: "vin is missing" })
    } else if (!make) {
      res.status(400).json({ message: "make is missing" })
    } else if (!model) {
      res.status(400).json({ message: "model is missing" })
    } else if (!mileage) {
      res.status(400).json({ message: "mileage is missing" })
    } else {
      next()
    }
  } catch (err) {
    next (err)
  }
}

const checkVinNumberValid = (req, res, next) => {
  try {
    const isValidVin = vinValidator.validate(req.body.vin)
    if (!isValidVin) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const allCars = await Car.getAll()
    const found = allCars.find(car => car.vin === req.body.vin) 
    if (found) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}