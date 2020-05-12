
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { Make: 'Tesla', Model: 'Model S', VIN: '1234567890abcdefg', Mileage: 100 },
        { Make: 'Tesla', Model: 'Model 3', VIN: '2234567890abcdefg', Mileage: 80 },
        { Make: 'Tesla', Model: 'Model X', VIN: '3234567890abcdefg', Mileage: 120, Transmission_Type: 'Electric', Status_of_Title: 'New' },
      ]);
    });
};
