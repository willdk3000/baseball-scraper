//Modules
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const controllers = require('./controllers')

//Variables
//const season = (new Date()).getFullYear();
const season = 2018;
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
            

        if (franchise_name!="") {
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
        await getLogo(team.initials, teams, team.teamno);
        await delay(3000);
    }

}

const getLogo = async (team, teams, teamno) => {
    const url = `https://www.baseball-reference.com/teams/${team}/${season}.shtml`
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    var team_logos = [];

    $('img[class="teamlogo"]').each((i, logodiv) => {
        const $logodiv = $(logodiv);
        const logo = $logodiv.attr('src')
        var team_logo = {
            team,
            logo
        }
        team_logos.push(team_logo)
    })
    const done_logos = await controllers.team_logo.refresh(JSON.stringify(team_logos));
    console.log(team + ' logo ' + done_logos);
}

getTeams();

