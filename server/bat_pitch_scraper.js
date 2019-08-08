//Modules
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const controllers = require('./controllers')

//Variables
//const season = (new Date()).getFullYear();
const season = 2019;
console.log(season)

const delay = (milliseconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, milliseconds);
    });
}

/*const getPlayers = (team) => {
    const url = `https://www.nhl.com/${team}/roster/`
  fetch(url)
    .then(response => response.text())
    .then(body => {
        console.log(body);
    })
}; */

//Async/Await permet de gérer les requêtes de façon
//plus "synchrone" c'est à dire de haut en bas plutôt que
//de laisser JS décider à quel moment c'est lancé.
//Le code suivant fait le même travail que le code ci-dessus:
//Retourne un promise

const getTeams = async () => {
    const url = `https://www.baseball-reference.com/teams/`
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    let teamno = 0;
    const teams = [];


    $('div[id="div_teams_active"] tr').each((i, team_active) => {
        const $team_active = $(team_active);
        const franchise_name = $team_active.find('td[data-stat="franchise_name"]').text();
        var initials = franchise_name.substring(0, 3).toUpperCase();

        if (franchise_name == "New York Mets") {
            var initials = "NYM"
        } else if (franchise_name == "New York Yankees") {
            var initials = "NYY"
        } else if (franchise_name == "Chicago Cubs") {
            var initials = "CHC"
        } else if (franchise_name == "Chicago White Sox") {
            var initials = "CHW"
        } else if (franchise_name == "San Diego Padres") {
            var initials = "SDP"
        } else if (franchise_name == "San Francisco Giants") {
            var initials = "SFG"
        } else if (franchise_name == "St. Louis Cardinals") {
            var initials = "STL"
        } else if (franchise_name == "Washington Nationals") {
            var initials = "WSN"
        } else if (franchise_name == "Los Angeles Angels") {
            var initials = "LAA"
        } else if (franchise_name == "Los Angeles Dodgers") {
            var initials = "LAD"
        } else if (franchise_name == "Kansas City Royals") {
            var initials = "KCR"
        }


        if (franchise_name != "") {
            teamno++
            const team = {
                teamno,
                franchise_name,
                initials
            }
            teams.push(team)
        }
    });

    for (const team of teams) {
        await getPlayers(team.initials, teams, team.teamno);
        await delay(3000);
    }

    //console.log(teams)
}



const getPlayers = async (team, teams, teamno) => {
    const url = `https://www.baseball-reference.com/teams/${team}/${season}.shtml`
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);


    //Ici, on passe tous les éléments "span" de la classe name-col, qui sont
    //des objets avec des dizaines de propriétés, on les affecte à une variable
    //cheerio $playername grâce à jquery $(playername), et on extrait la propriété text
    //pour l'afficher à l'écran. Le site d'ou on scrape doit avoir jquery d'installé

    const players_batting = [];
    const players_pitching = [];

    ////////////////
    //
    //Batting
    //
    ////////////////
    $('div[id="div_team_batting"] tr').each((i, playercard_batting) => {
        const $playercard_batting = $(playercard_batting);
        //////////////
        //Stats tirées directement
        /////////////
        const playername = $playercard_batting.find('td[data-stat="player"]').text().replace(/'|\*|#/g, "");
        var age = parseInt($playercard_batting.find('td[data-stat="age"]').text());
        const gp =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="G"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="G"]').text());
        const pa =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="PA"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="PA"]').text());
        const ab =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="AB"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="AB"]').text());
        const r =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="R"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="R"]').text());
        const h =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="H"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="H"]').text());
        const twob =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="2B"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="2B"]').text());
        const threeb =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="3B"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="3B"]').text());
        const hr =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="HR"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="HR"]').text());
        const rbi =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="RBI"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="RBI"]').text());
        const sb =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="SB"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="SB"]').text());
        const cs =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="CS"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="CS"]').text());
        const bb =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="BB"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="BB"]').text());
        const so =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="SO"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="SO"]').text());
        const ba =
            (isNaN(
                parseFloat(
                    $playercard_batting.find('td[data-stat="batting_avg"]').text()))) ?
                0 : parseFloat($playercard_batting.find('td[data-stat="batting_avg"]').text());
        const obp =
            (isNaN(
                parseFloat(
                    $playercard_batting.find('td[data-stat="onbase_perc"]').text()))) ?
                0 : parseFloat($playercard_batting.find('td[data-stat="onbase_perc"]').text());
        const slg =
            (isNaN(
                parseFloat(
                    $playercard_batting.find('td[data-stat="slugging_perc"]').text()))) ?
                0 : parseFloat($playercard_batting.find('td[data-stat="slugging_perc"]').text());
        const ops =
            (isNaN(
                parseFloat(
                    $playercard_batting.find('td[data-stat="onbase_plus_slugging"]').text()))) ?
                0 : parseFloat($playercard_batting.find('td[data-stat="onbase_plus_slugging"]').text());
        const opsp =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="onbase_plus_slugging_plus"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="onbase_plus_slugging_plus"]').text());
        const tb =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="TB"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="TB"]').text());
        const gdp =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="GIDP"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="GIDP"]').text());
        const hbp =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="HBP"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="HBP"]').text());
        const sh =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="SH"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="SH"]').text());
        const sf =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="SF"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="SF"]').text());
        const ibb =
            (isNaN(
                parseInt(
                    $playercard_batting.find('td[data-stat="IBB"]').text()))) ?
                0 : parseInt($playercard_batting.find('td[data-stat="IBB"]').text());

        const pid = season + "_" + team + "_" + playername;

        //////////////
        //Stats calculées
        /////////////
        const s = tb - (2 * twob) - (3 * threeb) - (4 * hr);
        const rc = (tb) * (h + bb) / (ab + bb);
        const erp = (tb * 0.318) + ((bb - ibb + hbp - cs - gdp) * 0.333) + (h * 0.25) + (sb * 0.2) - (ab * 0.085);
        const xrr = (0.50 * s) + (0.72 * twob) + (1.04 * threeb) + (1.44 * hr) + (0.33 * (bb + hbp)) + (0.18 * sb) - (0.32 * cs) - (0.098 * (ab - h));

        if (playername != "" && playername.substr(0, 4) != "Rank") {
            var player = {
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
                xrr
            }
            players_batting.push(player)
        }
    });

    const done_batting = await controllers.team_batting.refresh(JSON.stringify(players_batting));



    ////////////////
    //
    //Pitching
    //
    ////////////////
    $('div[id="div_team_pitching"] tr').each((i, playercard_pitching) => {
        const $playercard_pitching = $(playercard_pitching);

        const playername = $playercard_pitching.find('td[data-stat="player"]').text().replace(/'|\*|#/g, "");
        var age = parseInt($playercard_pitching.find('td[data-stat="age"]').text());
        const w =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="W"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="W"]').text());
        const l =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="L"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="L"]').text());
        const wlp =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="win_loss_perc"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="win_loss_perc"]').text());
        //const era = 
        //(isNaN(
        //    parseInt(
        //        $playercard_pitching.find('td[data-stat="win_loss_perc"]').text()))) ? 
        //        0 : parseInt($playercard_pitching.find('td[data-stat="win_loss_perc"]').text());
        const g =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="G"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="G"]').text());
        const gs =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="GS"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="GS"]').text());
        const gf =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="GF"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="GF"]').text());
        const cg =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="CG"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="CG"]').text());
        const sho =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="SHO"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="SHO"]').text());
        const sv =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="SV"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="SV"]').text());
        const ip =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="IP"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="IP"]').text());
        const h =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="win_loss_perc"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="win_loss_perc"]').text());
        const r =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="R"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="R"]').text());
        const er =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="ER"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="ER"]').text());
        const hr =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="HR"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="HR"]').text());
        const bb =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="BB"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="BB"]').text());
        const ibb =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="IBB"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="IBB"]').text());
        const so =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="SO"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="SO"]').text());
        const hbp =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="HBP"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="HBP"]').text());
        const bk =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="BK"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="BK"]').text());
        const wp =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="WP"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="WP"]').text());
        const bf =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="batters_faced"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="batters_faced"]').text());
        //const erap = ...
        //const fip = ...
        const whip =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="whip"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="whip"]').text());
        const h9 =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="hits_per_nine"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="hits_per_nine"]').text());
        const hr9 =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="home_runs_per_nine"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="home_runs_per_nine"]').text());
        const bb9 =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="bases_on_balls_per_nine"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="bases_on_balls_per_nine"]').text());
        const so9 =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="strikeouts_per_nine"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="strikeouts_per_nine"]').text());
        const sow =
            (isNaN(
                parseInt(
                    $playercard_pitching.find('td[data-stat="strikeouts_per_base_on_balls"]').text()))) ?
                0 : parseInt($playercard_pitching.find('td[data-stat="strikeouts_per_base_on_balls"]').text());

        const pid = season + "_" + team + "_" + playername;

        var stat = "pitching";

        if (playername != "" && playername.substr(0, 4) != "Rank") {
            var player = {
                pid,
                season,
                team,
                stat,
                playername,
                age,
                w,
                l,
                wlp,
                //era,
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
                //erap,
                //fip,
                whip,
                h9,
                hr9,
                bb9,
                so9,
                sow
            };
            players_pitching.push(player)
        };

    });


    const done_pitching = await controllers.team_pitching.refresh(JSON.stringify(players_pitching));

    console.log(season + ' ' + teamno + '/' + teams.length + ' ' + team + ' batting ' + done_batting + ' pitching ' + done_pitching);
};

getTeams();


