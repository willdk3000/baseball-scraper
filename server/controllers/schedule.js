const knex = require('../config/knex')

module.exports = {

    list(req, res) {
        return knex.raw(
            `SELECT * FROM schedule WHERE home_away = 'home'`)
            .then(result => {
                res.json(result.rows)
            });//.finally(function() {
        //    knex.destroy();
        //});
    },

    refresh(req, res) {
        return knex.raw(
            `WITH schedule_json (doc) as (
                values('${req}'::json)
            )
            INSERT INTO schedule (
                gameno,
                team,
                franchise,
                date,
                date_parsed, 
                opponent_clean,
                opponent_initials,
                home_away,
                outcome)
            SELECT p.*
            FROM schedule_json t
            CROSS JOIN LATERAL json_populate_recordset(null::schedule, doc) as p
            ON CONFLICT (gameno) DO UPDATE 
            SET
                team = excluded.team, 
                franchise = excluded.franchise,
                date = excluded.date, 
                date_parsed = excluded.date_parsed, 
                opponent_clean = excluded.opponent_clean, 
                opponent_initials = excluded.opponent_initials,
                home_away = excluded.home_away,
                outcome='null'`
        )
            .then(function () {
                return 'done'
            });
    },

    requete(req, res) {

        let d = new Date();
        let year = d.getFullYear();

        switch (req.params.action) {

            case ':getDay-odds':
                return knex.raw(

                    `WITH daysched AS (
                    SELECT gameno, team, date_parsed, opponent_initials, home_away, moj_outcome, moj_odds 
                    FROM schedule 
                    WHERE home_away = 'home' AND date_parsed = '${req.body.date}' 
                    ORDER BY team
                ),
                team_ratio AS (
                    SELECT
                        daysched.*,
                        team_batting.r AS team_runs,
                        team_batting.obp AS team_obp,
                        team_batting.ops AS team_ops,
                        team_batting.opsp AS team_opsp,
                        team_batting.xrr AS team_xrr,
                        team_batting.erp AS team_erp
                    FROM daysched
                    LEFT JOIN team_batting ON daysched.team = team_batting.team
                    WHERE team_batting.playername = 'Team Totals' AND team_batting.season = '${year}'
                ),
                team_opp_ratio AS (
                    SELECT
                        team_ratio.*,
                        team_batting.r AS opponent_runs,
                        team_batting.obp AS opponent_obp,
                        team_batting.ops AS opponent_ops,
                        team_batting.opsp AS opponent_opsp,
                        team_batting.xrr AS opponent_xrr,
                        team_batting.erp AS opponent_erp
                    FROM team_ratio
                    LEFT JOIN team_batting ON team_ratio.opponent_initials = team_batting.team
                    WHERE team_batting.playername = 'Team Totals' AND team_batting.season = '${year}'
                ),
                team_opp_ratio_logoT AS (
                    SELECT
                        team_opp_ratio.*,
                        logos.logo as logo_team
                        FROM team_opp_ratio
                        LEFT JOIN logos ON team_opp_ratio.team = logos.team               
                )
                SELECT 
                    team_opp_ratio_logoT.*,
                    logos.logo as logo_opponent
                    FROM team_opp_ratio_logoT
                    LEFT JOIN logos ON team_opp_ratio_logoT.opponent_initials = logos.team`,
                )
                    .then(result => {
                        res.json(result.rows)
                    })
                break;

                case ':getDay':
                return knex.raw(
                    `WITH homegames AS (
                        SELECT 
                            schedule.*,
                            logos.logo AS team_logo
                        FROM schedule
                        LEFT JOIN logos ON logos.team = schedule.team
                        WHERE date_parsed='${req.body.date}' AND home_away='home'
                    ),
                    awaygames AS (
                        SELECT 
                        schedule.*,
                        logos.logo AS opponent_logo
                        FROM schedule
                        LEFT JOIN logos ON logos.team = schedule.team
                        WHERE date_parsed='${req.body.date}' AND home_away='away'
                    )
                    SELECT
                        homegames.*,
                        awaygames.opponent_logo,
                        awaygames.my_odds as opponent_my_odds,
                        awaygames.my_outcome as opponent_my_outcome,
                        awaygames.moj_odds as opponent_moj_odds,
                        awaygames.moj_outcome as opponent_moj_outcome
                    FROM homegames
                    LEFT JOIN awaygames
                    ON awaygames.team = homegames.opponent_initials`,
                )
                    .then(result => {
                        res.json(result.rows)
                    })
                break;

            case ':getMatchupPrevious':
                return knex.raw(
                    `WITH daysched AS (
                    SELECT gameno, team, date_parsed, opponent_initials, home_away 
                    FROM schedule 
                    WHERE home_away = 'home' AND gameno = '${req.body.gameno}' 
                    ORDER BY team
                ),
                team_ratio AS (
                    SELECT
                        daysched.*,
                        team_batting.r AS team_runs,
                        team_batting.obp AS team_obp,
                        team_batting.ops AS team_ops,
                        team_batting.opsp AS team_opsp,
                        team_batting.xrr AS team_xrr,
                        team_batting.erp AS team_erp
                    FROM daysched
                    LEFT JOIN team_batting ON daysched.team = team_batting.team
                    WHERE team_batting.playername = 'Team Totals' AND team_batting.season = '${year - 1}'
                ),
                team_opp_ratio AS (
                    SELECT
                        team_ratio.*,
                        team_batting.r AS opponent_runs,
                        team_batting.obp AS opponent_obp,
                        team_batting.ops AS opponent_ops,
                        team_batting.opsp AS opponent_opsp,
                        team_batting.xrr AS opponent_xrr,
                        team_batting.erp AS opponent_erp
                    FROM team_ratio
                    LEFT JOIN team_batting ON team_ratio.opponent_initials = team_batting.team
                    WHERE team_batting.playername = 'Team Totals' AND team_batting.season = '${year - 1}'
                ),
                team_opp_ratio_logoT AS (
                    SELECT
                        team_opp_ratio.*,
                        logos.logo as logo_team
                        FROM team_opp_ratio
                        LEFT JOIN logos ON team_opp_ratio.team = logos.team               
                )
                SELECT 
                    team_opp_ratio_logoT.*,
                    logos.logo as logo_opponent
                    FROM team_opp_ratio_logoT
                    LEFT JOIN logos ON team_opp_ratio_logoT.opponent_initials = logos.team`,
                )
                    .then(result => {
                        res.json(result.rows)
                    })
                break;

            case ':getMatchupCurrent':
                return knex.raw(
                    `WITH daysched AS (
                    SELECT gameno, team, date_parsed, opponent_initials, home_away 
                    FROM schedule 
                    WHERE home_away = 'home' AND gameno = '${req.body.gameno}' 
                    ORDER BY team
                ),
                team_ratio AS (
                    SELECT
                        daysched.*,
                        team_batting.r AS team_runs,
                        team_batting.obp AS team_obp,
                        team_batting.ops AS team_ops,
                        team_batting.opsp AS team_opsp,
                        team_batting.xrr AS team_xrr,
                        team_batting.erp AS team_erp
                    FROM daysched
                    LEFT JOIN team_batting ON daysched.team = team_batting.team
                    WHERE team_batting.playername = 'Team Totals' AND team_batting.season = '${year}'
                ),
                team_opp_ratio AS (
                    SELECT
                        team_ratio.*,
                        team_batting.r AS opponent_runs,
                        team_batting.obp AS opponent_obp,
                        team_batting.ops AS opponent_ops,
                        team_batting.opsp AS opponent_opsp,
                        team_batting.xrr AS opponent_xrr,
                        team_batting.erp AS opponent_erp
                    FROM team_ratio
                    LEFT JOIN team_batting ON team_ratio.opponent_initials = team_batting.team
                    WHERE team_batting.playername = 'Team Totals' AND team_batting.season = '${year}'
                ),
                team_opp_ratio_logoT AS (
                    SELECT
                        team_opp_ratio.*,
                        logos.logo as logo_team
                        FROM team_opp_ratio
                        LEFT JOIN logos ON team_opp_ratio.team = logos.team               
                )
                SELECT 
                    team_opp_ratio_logoT.*,
                    logos.logo as logo_opponent
                    FROM team_opp_ratio_logoT
                    LEFT JOIN logos ON team_opp_ratio_logoT.opponent_initials = logos.team`,
                )
                    .then(result => {
                        res.json(result.rows)
                    })
                break;

        }
    }
}