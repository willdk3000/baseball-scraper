
exports.up = function(knex, Promise) {
    return knex.schema.createTable('logos', (table) => {
        table.unique('team');
        table.text('team');
        table.text('logo');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('logos');
};
