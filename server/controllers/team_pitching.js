const knex = require('../config/knex')

module.exports = {

    list(req, res){
        return knex.raw(
            `SELECT * FROM team_pitching`) 
        .then(result => {
            res.json(result)
        });//.finally(function() {
        //    knex.destroy();
        //});
    },

    refresh(req, res){
        return knex.raw(
            `WITH team_pitching_json (doc) as (
                values('${req}'::json)
            )
            INSERT INTO team_pitching (
                pid,
                season, 
                team,
                playername,
                age,
                w,
                l,
                wlp,
                --era,
                g,
                gs,
                gf,
                cg,
                sho,
                sv,
                ip,
                h,
                r,
                er,
                hr,
                bb,
                ibb,
                so,
                hbp,
                bk,
                wp,
                bf,
                --erap,
                --fip,
                whip,
                h9,
                hr9,
                bb9,
                so9,
                sow)
            SELECT p.*
            FROM team_pitching_json t
            CROSS JOIN LATERAL json_populate_recordset(null::team_pitching, doc) as p
            ON CONFLICT (pid) DO UPDATE 
            SET
            season = excluded.season, 
            team = excluded.team,
            playername = excluded.playername,
            age = excluded.age,
            w = excluded.w,
            l = excluded.l,
            wlp = excluded.wlp,
            --era,
            g = excluded.g,
            gs = excluded.gs,
            gf = excluded.gf,
            cg = excluded.cg,
            sho = excluded.sho,
            sv = excluded.sv,
            ip = excluded.ip,
            h = excluded.h,
            r = excluded.r,
            er = excluded.er,
            hr = excluded.hr,
            bb = excluded.bb,
            ibb = excluded.ibb,
            so = excluded.so,
            hbp = excluded.hbp,
            bk = excluded.bk,
            wp = excluded.wp,
            bf = excluded.bf,
            --erap,
            --fip,
            whip = excluded.whip,
            h9 = excluded.h9,
            hr9 = excluded.hr9,
            bb9 = excluded.bb9,
            so9 = excluded.so9,
            sow = excluded.sow`
        )
        .then(function() {
            return 'done'
        });
    }
}