const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (car_id) => {
  return db('cars').where('car_id', car_id).first()
}

const create = async (newCar) => {
  const newId = await db('cars').insert(newCar)
  return getById(newId)
}

module.exports = {
  getAll,
  getById,
  create
}
