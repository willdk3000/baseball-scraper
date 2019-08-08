const knex = require('../config/knex')

module.exports = {

    refresh(req, res){
        return knex.raw(
            `WITH logos_json (doc) as (
                values('${req}'::json)
            )
            INSERT INTO logos (
                team,
                logo)
            SELECT p.*
            FROM logos_json t
            CROSS JOIN LATERAL json_populate_recordset(null::logos, doc) as p
            ON CONFLICT (team) DO UPDATE 
            SET
                logo=excluded.logo`
        )
        .then(function() {
            return 'done'
        });
    }
}