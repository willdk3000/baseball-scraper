const knex = require('../config/knex')

module.exports = {

    list(req, res){
        return knex.raw(
            `SELECT * FROM team_batting`) 
        .then(result => {
            res.json(result)
        });//.finally(function() {
        //    knex.destroy();
        //});
    },

    refresh(req, res){
        return knex.raw(
            `WITH team_batting_json (doc) as (
                values('${req}'::json)
            )
            INSERT INTO team_batting (
                pid,
                season, 
                team,
                playername, 
                age, 
                gp, 
                pa, 
                ab, 
                r, 
                h,
                s, 
                twob, 
                threeb, 
                hr, 
                rbi, 
                sb, 
                cs, 
                bb, 
                so, 
                ba, 
                obp, 
                slg, 
                ops, 
                opsp, 
                tb, 
                gdp, 
                hbp, 
                sh, 
                sf, 
                ibb,
                rc,
                erp,
                xrr)
            SELECT p.*
            FROM team_batting_json t
            CROSS JOIN LATERAL json_populate_recordset(null::team_batting, doc) as p
            ON CONFLICT (pid) DO UPDATE 
            SET
                season = excluded.season, 
                team = excluded.team,
                playername = excluded.playername, 
                age = excluded.age, 
                gp = excluded.gp, 
                pa = excluded.pa, 
                ab = excluded.ab, 
                r = excluded.r, 
                h = excluded.h,
                s = excluded.s, 
                twob = excluded.twob, 
                threeb = excluded.threeb, 
                hr = excluded.hr, 
                rbi = excluded.rbi, 
                sb = excluded.sb, 
                cs = excluded.cs, 
                bb = excluded.bb, 
                so = excluded.so, 
                ba = excluded.ba, 
                obp = excluded.obp, 
                slg = excluded.slg, 
                ops = excluded.ops, 
                opsp = excluded.opsp, 
                tb = excluded.tb, 
                gdp = excluded.gdp, 
                hbp = excluded.hbp, 
                sh = excluded.sh, 
                sf = excluded.sf, 
                ibb = excluded.ibb,
                rc = excluded.rc,
                erp = excluded.erp,
                xrr = excluded.xrr`
        )
        .then(function() {
            return 'done'
        });
    }
}