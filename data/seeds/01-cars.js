// STRETCH
exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function() {
      return knex('cars').insert([
        {vin:'2C4RC1BG0DR665992', make: 'Toyota', model: 'Corolla', mileage: 2999},
        {vin:'1N6AD0EV9BC484536', make: 'Toyota', model: 'Prius', mileage: 9399},
        {vin:'1C4RDJDG3EC569181', make: 'Toyota', model: 'Camry', mileage: 1999},
        {vin:'1C6RR6FT0FS592795', make: 'Toyota', model: 'Highlander', mileage: 999}
      ])
    })
}
