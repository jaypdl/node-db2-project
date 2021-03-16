const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()
}

const create = async (newCar) => {
  const newId = await db('cars').insert(newCar)
  return getById(newId)
}

const update = async (id, car) => {
  await db('cars').where('id', id).update(car)
  return getById(id)
}

const deleteCar = async (id) => {
  const deleted = await getById(id)
  await db('cars').where('id', id).del()
  return deleted
}

module.exports = {
  getAll,
  getById,
  create, 
  update,
  deleteCar
}
