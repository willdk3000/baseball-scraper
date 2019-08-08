
exports.up = function(knex, Promise) {
    return knex.schema.createTable('team_batting', (table) => {
        table.text('pid');
        table.unique('pid');
        table.integer('season');
        table.text('team');
        table.text('playername');
        table.integer('age');
        table.integer('gp');
        table.integer('pa');
        table.integer('ab');
        table.integer('r');
        table.integer('h');
        table.integer('s');
        table.integer('twob');
        table.integer('threeb');
        table.integer('hr');
        table.integer('rbi');
        table.integer('sb');
        table.integer('cs');
        table.integer('bb');
        table.integer('so');
        table.double('ba');
        table.double('obp');
        table.double('slg');
        table.double('ops');
        table.integer('opsp');
        table.integer('tb');
        table.integer('gdp');
        table.integer('hbp');
        table.integer('sh');
        table.integer('sf');
        table.integer('ibb');
        table.double('rc');
        table.double('erp');
        table.double('xrr');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('team_batting');
};