//Modules
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const controllers = require('./controllers');

// Delay method - to prevent getting ip banned
const delay = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
}

const getScores = async () => {
  const url = `https://www.baseball-reference.com/boxes/`
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  const results = [];

  // Store winning teams to array using initials
  $('tr[class="winner"] td').each((i, winner) => {
    const $winner = $(winner);
    const winning_team = $winner.find('a').text();

    if (winning_team !== '' && winning_team !== 'Final') {

      var initials = winning_team.substring(0, 3).toUpperCase();

      if (winning_team == "New York Mets") {
        var initials = "NYM"
      } else if (winning_team == "New York Yankees") {
        var initials = "NYY"
      } else if (winning_team == "Chicago Cubs") {
        var initials = "CHC"
      } else if (winning_team == "Chicago White Sox") {
        var initials = "CHW"
      } else if (winning_team == "San Diego Padres") {
        var initials = "SDP"
      } else if (winning_team == "San Francisco Giants") {
        var initials = "SFG"
      } else if (winning_team == "St. Louis Cardinals") {
        var initials = "STL"
      } else if (winning_team == "Washington Nationals") {
        var initials = "WSN"
      } else if (winning_team == "Los Angeles Angels") {
        var initials = "LAA"
      } else if (winning_team == "Los Angeles Dodgers") {
        var initials = "LAD"
      } else if (winning_team == "Kansas City Royals") {
        var initials = "KCR"
      }

      results.push({
        'team': initials,
        'outcome': 'win'
      });

    }

  });

  // Store losing teams to array using initials
  $('tr[class="loser"] td').each((i, loser) => {
    const $loser = $(loser);
    const losing_team = $loser.find('a').text();

    if (losing_team !== '' && losing_team !== 'Final') {

      var initials = losing_team.substring(0, 3).toUpperCase();

      if (losing_team == "New York Mets") {
        var initials = "NYM"
      } else if (losing_team == "New York Yankees") {
        var initials = "NYY"
      } else if (losing_team == "Chicago Cubs") {
        var initials = "CHC"
      } else if (losing_team == "Chicago White Sox") {
        var initials = "CHW"
      } else if (losing_team == "San Diego Padres") {
        var initials = "SDP"
      } else if (losing_team == "San Francisco Giants") {
        var initials = "SFG"
      } else if (losing_team == "St. Louis Cardinals") {
        var initials = "STL"
      } else if (losing_team == "Washington Nationals") {
        var initials = "WSN"
      } else if (losing_team == "Los Angeles Angels") {
        var initials = "LAA"
      } else if (losing_team == "Los Angeles Dodgers") {
        var initials = "LAD"
      } else if (losing_team == "Kansas City Royals") {
        var initials = "KCR"
      }

      results.push({
        'team': initials,
        'outcome': 'loss'
      });
    }

  });


  for (i = 0; i <= results.length - 1; i++) {
    const done_scores = await controllers.scores.refresh(results[i]);
    console.log(results[i].team + ' ' + results[i].outcome);
  }

  // for (const team of teams) {
  //   await getLogo(team.initials, teams, team.teamno);
  //   await delay(3000);
  // }

}

getScores();