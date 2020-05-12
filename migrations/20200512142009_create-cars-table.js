
exports.up = function(knex) {
    // Table records should always have id which autoincrements, VIN, Make, Model, and Mileage
    // Records may also have Transmission Type and Status of the Title which are both optional
    return knex.schema.createTable('cars', table => {
        table.increments()
        table.text('VIN', 17)
            .unique()
            .notNullable()
        table.text('Make', 50)
            .notNullable()
        table.text('Model', 50)
            .notNullable()
        table.decimal('Mileage')
            .notNullable()
        table.text('Transmission_Type', 30)
        table.text('Status_of_Title', 100)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
