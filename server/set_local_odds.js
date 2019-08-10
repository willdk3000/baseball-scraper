const moment = require('moment');
const fetch = require('node-fetch');
const controllers = require('./controllers');

const localOdds = [];

async function setLocalOdds() {

let date = new Date();
date = date.setDate(date.getDate());
let dateFormat = moment(date).format("YYYY-MM-DD");

async function getDay(calendar_date) {

	const response = await fetch('http://localhost:8000/api/schedule/:getDay', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			'date': calendar_date
		})
	});

	return response.json({ 'games': response })

}

let games = await getDay(dateFormat);

games.forEach((game)=>{

	let odds_outcome_team='';
	let odds_outcome_opponent='';
	let odds_team = (game.team_erp + game.team_xrr)/(game.opponent_erp + game.opponent_xrr);
	let odds_opponent = (game.opponent_erp + game.opponent_xrr)/(game.team_erp + game.team_xrr);

	if (odds_team>odds_opponent) {
		odds_outcome_team = 'win';
		odds_outcome_opponent = 'loss';
	} else {
		odds_outcome_team = 'loss';
		odds_outcome_opponent = 'win';
	}

	localOdds.push({
		'team':game.team,
		'odds':odds_outcome_team
	},
	{
		'team':game.opponent_initials,
		'odds':odds_outcome_opponent
	})
	
})

for (i=0; i<=localOdds.length-1; i++) {
	const done_odds = await controllers.odds.setLocal(localOdds[i]);
	console.log(localOdds[i]);
}

}

setLocalOdds();


// { game.team }
// ({((game.team_xrr + game.team_erp) / (game.opponent_xrr + game.opponent_erp)).toFixed(2)})

// { game.opponent_initials }
// ({((game.opponent_xrr + game.opponent_erp) / (game.team_xrr + game.team_erp)).toFixed(2)})

// const done_local_odds = controllers.odds.setLocal();