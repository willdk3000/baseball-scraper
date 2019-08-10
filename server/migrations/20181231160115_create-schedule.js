
exports.up = function (knex, Promise) {
    return knex.schema.createTable('schedule', (table) => {
        table.unique('gameno');
        table.integer('gameno');
        table.text('team');
        table.text('franchise');
        table.text('date');
        table.date('date_parsed');
        table.text('opponent_clean');
        table.text('opponent_initials');
        table.text('home_away');
        table.text('outcome');
        table.text('my_odds');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('schedule');
};
