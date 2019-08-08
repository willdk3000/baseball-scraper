///////////////////
//
//Game schedule
//
///////////////////

export async function getSchedule() {
	const response = await fetch('/api/schedule');
	return response.json({ 'games': response });

}

export async function getDay(calendar_date) {

	const response = await fetch('/api/schedule/:getDay', {
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

///////////////////
//
//Date format
//
///////////////////

export function today(date) {
	var today = ''
	var dd = date.getDate();
	var mm = date.getMonth() + 1; //January is 0!
	var yyyy = date.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}

	today = yyyy + '-' + mm + '-' + dd;
	//today2='2019-04-01'
	return today

}

export function plusToDate(date, days) {

	var result = new Date(date);
	result.setDate(date.getDate() + days);
	return result;

}

///////////////////
//
//Matchup
//
///////////////////
//Get matchup for previous year
export async function getMatchupPrevious(gameno) {

	const response = await fetch('/api/schedule/:getMatchupPrevious', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			'gameno': gameno
		})
	});

	return response.json({ 'game': response })

}

//Get matchup for current year
export async function getMatchupCurrent(gameno) {

	const response = await fetch('/api/schedule/:getMatchupCurrent', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			'gameno': gameno
		})
	});

	return response.json({ 'game': response })

}