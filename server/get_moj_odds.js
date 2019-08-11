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

const getOdds = async () => {
  const url = `https://miseojeu.lotoquebec.com/fr/offre-de-paris/baseball/majeur/matchs?idAct=11`
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  const mojOdds = [];

  // Store left column from moj
  $('div[expandableid="1001"] td[class="gabarit1colonne1 colonneCentre selectable"]').each((i, team)=>{
    const $team = $(team);
    const teamodds = $team.text();
    const teamoddsformat = teamodds.replace(/\s+/g, ' ')
    .replace("Baseball Majeur ", '')
    .replace(/Numéro.+/g, '')
    .trim()
    .replace(",", ".")
    .split(/[\s](?=[\d])/g);

      var initials = teamoddsformat[0].substring(0, 3).toUpperCase();

      if (teamoddsformat[0] == "New York-M") {
        var initials = "NYM"
      } else if (teamoddsformat[0] == "New York-Y") {
        var initials = "NYY"
      } else if (teamoddsformat[0] == "Chicago-C") {
        var initials = "CHC"
      } else if (teamoddsformat[0] == "Chicago-W") {
        var initials = "CHW"
      } else if (teamoddsformat[0] == "San Diego") {
        var initials = "SDP"
      } else if (teamoddsformat[0] == "San Francisco") {
        var initials = "SFG"
      } else if (teamoddsformat[0] == "St. Louis") {
        var initials = "STL"
      } else if (teamoddsformat[0] == "Washington") {
        var initials = "WSN"
      } else if (teamoddsformat[0] == "Los Angeles-A") {
        var initials = "LAA"
      } else if (teamoddsformat[0] == "Los Angeles-D") {
        var initials = "LAD"
      } else if (teamoddsformat[0] == "Kansas City") {
        var initials = "KCR"
      }

    mojOdds.push({
       'team':initials,
       'odds':Number(teamoddsformat[1])
    })
    
  })

  // Store right column from moj
  $('div[expandableid="1001"] td[class="gabarit1colonne2 colonneCentre selectable"]').each((i, team)=>{
    const $team = $(team);
    const teamodds = $team.text();
    const teamoddsformat = teamodds.replace(/\s+/g, ' ')
    .replace("Baseball Majeur ", '')
    .replace(/Numéro.+/g, '')
    .trim()
    .replace(",", ".")
    .split(/[\s](?=[\d])/g);

    var initials = teamoddsformat[0].substring(0, 3).toUpperCase();

    if (teamoddsformat[0] == "New York-M") {
      var initials = "NYM"
    } else if (teamoddsformat[0] == "New York-Y") {
      var initials = "NYY"
    } else if (teamoddsformat[0] == "Chicago-C") {
      var initials = "CHC"
    } else if (teamoddsformat[0] == "Chicago-W") {
      var initials = "CHW"
    } else if (teamoddsformat[0] == "San Diego") {
      var initials = "SDP"
    } else if (teamoddsformat[0] == "San Francisco") {
      var initials = "SFG"
    } else if (teamoddsformat[0] == "St. Louis") {
      var initials = "STL"
    } else if (teamoddsformat[0] == "Washington") {
      var initials = "WSN"
    } else if (teamoddsformat[0] == "Los Angeles-A") {
      var initials = "LAA"
    } else if (teamoddsformat[0] == "Los Angeles-D") {
      var initials = "LAD"
    } else if (teamoddsformat[0] == "Kansas City") {
      var initials = "KCR"
    }

    mojOdds.push({
       'team':initials,
       'odds':Number(teamoddsformat[1])
    })
    
  })
  
  // Eval outcome
  for (i=0; i<=(mojOdds.length/2); i++) {
    if (mojOdds[i].odds > mojOdds[i+(mojOdds.length/2)-1].odds) {
      mojOdds[i].outcome='win';
      mojOdds[i+(mojOdds.length/2)-1].outcome='loss'
    } else {
      mojOdds[i].outcome='loss';
      mojOdds[i+(mojOdds.length/2)-1].outcome='win'
    }
  }


  for (i=0; i<=mojOdds.length-1; i++) {
    const done_moj_odds = await controllers.odds.setMoj(mojOdds[i]);
    console.log(mojOdds[i].team + ' ' + mojOdds[i].odds+ ' ' + mojOdds[i].outcome);
  }

}

getOdds();