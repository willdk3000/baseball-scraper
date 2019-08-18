//Modules
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const controllers = require('./controllers')

//Variables
//const season = (new Date()).getFullYear();
const season = 2019;
//console.log(season)

var gameno = 1;

const delay = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
}

const getTeams = async () => {
  const url = `http://printableteamschedules.com/MLB/baseballopponents.php`
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  let teamno = 0;
  const teams = [];


  $('ul[class="teamlist"] li').each((i, team_active) => {
    const $team_active = $(team_active);

    var franchise_name = $team_active.find('a[class="resource"]').text().replace(' Schedule 2019', '').replace(/ /g, '');

    const franchise = $team_active.find('a[class="resource"]').text().replace(' Schedule 2019', '')

    var initials = franchise_name.substring(0, 3).toUpperCase();

    switch (franchise) {
      case "New York Mets":
        var initials = "NYM";
        break;
      case "New York Yankees":
        var initials = "NYY";
        break;
      case "Chicago Cubs":
        var initials = "CHC";
        break;
      case "Chicago White Sox":
        var initials = "CHW";
        break;
      case "San Diego Padres":
        var initials = "SDP";
        break;
      case "San Francisco Giants":
        var initials = "SFG";
        break;
      case "St. Louis Cardinals":
        var initials = "STL";
        var franchise_name = "StLouisCardinals"
        break;
      case "Washington Nationals":
        var initials = "WSN";
        break;
      case "Los Angeles Angels":
        var initials = "LAA";
        break;
      case "Los Angeles Dodgers":
        var initials = "LAD";
        break;
      case "Kansas City Royals":
        var initials = "KCR";
        break;
    }

    if (franchise_name != "2019MLBTeamSchedules" && franchise_name != "2020MLBTeamSchedules") {
      teamno++
      const team = {
        teamno,
        franchise_name,
        franchise,
        initials
      }
      teams.push(team)
    }

    //console.log(teams)

  });

  //await getGames(teams, teams.initials);

  for (const team of teams) {
    await getGames(team.initials, team.franchise_name, team.franchise, team.teamno);
    await delay(3000);
  }


}

const getGames = async (team, teamname, franchise, teamno) => {
  const url = `http://printableteamschedules.com/MLB/${teamname}opponents.php`
  //const url = `http://printableteamschedules.com/MLB/oaklandathleticsopponents.php`
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  const games = [];
  var home_away = '';


  $('tr').each((i, gameday) => {
    const $gameday = $(gameday);

    var date = $gameday.find('td[class="nascardate"]').text().replace(/    /g, '').split(',')[1] + ', 2019';

    switch (date.substr(0, 3)) {
      case "Mar":
        var date = date.replace(/Mar/g, 'March');
        break;
      case "Apr":
        var date = date.replace(/Apr/g, 'April');
        break;
      case "Jun":
        var date = date.replace(/Jun/g, 'June');
        break;
      case "Jul":
        var date = date.replace(/Jul/g, 'July');
        break;
      case "Aug":
        var date = date.replace(/Aug/g, 'August');
        break;
      case "Sep":
        var date = date.replace(/Sep/g, 'September');
        break;
      case "Oct":
        var date = date.replace(/Oct/g, 'October');
    }

    var msec = Date.parse(date);
    var date_parsed = new Date(msec);

    const opponent = $gameday.find('td[class="nascarevent"]').text();

    if (opponent.substr(0, 2) == "at") {
      var home_away = "away"
    }
    else { var home_away = "home" }

    var opponent_clean = opponent.replace('at ', '').replace(/   /g, '');
    if (opponent_clean.substr(0, 1) == " ") {
      var opponent_clean = opponent_clean.substr(1)
    }

    var opponent_initials = opponent_clean.substring(0, 3).toUpperCase();

    switch (opponent_clean) {
      case "NY Mets":
        opponent_initials = "NYM";
        break;
      case "NY Yankees":
        opponent_initials = "NYY";
        break;
      case "Chicago Cubs":
        opponent_initials = "CHC";
        break;
      case "Chicago Sox":
        opponent_initials = "CHW";
        break;
      case "San Diego":
        opponent_initials = "SDP";
        break;
      case "San Francisco":
        opponent_initials = "SFG";
        break;
      case "St. Louis":
        opponent_initials = "STL";
        break;
      case "Washington":
        opponent_initials = "WSN";
        break;
      case "LA Angels":
        opponent_initials = "LAA";
        break;
      case "LA Dodgers":
        opponent_initials = "LAD";
        break;
      case "Kansas City":
        opponent_initials = "KCR";
        break;
    }


    if (date_parsed.getMonth() != 0) {
      var game = {
        gameno,
        team,
        franchise,
        date,
        date_parsed,
        opponent_clean,
        opponent_initials,
        home_away
      }
      games.push(game);
      gameno++;
    };


  });

  const done_schedule = await controllers.schedule.refresh(JSON.stringify(games));

  console.log(season + ' ' + teamno + '/30' + ' ' + team + ' schedule ' + done_schedule);
}

getTeams();
