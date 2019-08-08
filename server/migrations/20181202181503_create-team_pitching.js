
exports.up = function(knex, Promise) {
    return knex.schema.createTable('team_pitching', (table) => {
        table.text('pid');
        table.unique('pid');
        
        table.integer('season');
        table.text('team');
        table.text('playername');
        table.integer('age');
        table.integer('w'),
        table.integer('l'),
        table.double('wlp'),
        //era,
        table.integer('g'),
        table.integer('gs'),
        table.integer('gf'),
        table.integer('cg'),
        table.integer('sho'),
        table.integer('sv'),
        table.double('ip'),
        table.integer('h'),
        table.integer('r'),
        table.integer('er'),
        table.integer('hr'),
        table.integer('bb'),
        table.integer('ibb'),
        table.integer('so'),
        table.integer('hbp'),
        table.integer('bk'),
        table.integer('wp'),
        table.integer('bf'),
        //erap,
        //fip,
        table.double('whip'),
        table.double('h9'),
        table.double('hr9'),
        table.double('bb9'),
        table.double('so9'),
        table.double('sow')
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('team_pitching');
};