
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
        table.double('my_odds');
        table.text('my_outcome');
        table.double('moj_odds');
        table.text('moj_outcome');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('schedule');
};
