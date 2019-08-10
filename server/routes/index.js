const team_battingController = require('../controllers').team_batting;
const team_pitchingController = require('../controllers').team_pitching;
const scheduleController = require('../controllers').schedule;
const scoresController = require('../controllers').scores;
const oddsController = require('../controllers').odds;

module.exports = (app) => {

  app.get('/api/team_batting', team_battingController.list);
  //app.post('/api/team_batting/:action', team_battingController.requete);

  app.get('/api/team_pitching', team_pitchingController.list);
  //app.post('/api/team_pitching/:action', team_pitchingController.requete);

  app.get('/api/schedule', scheduleController.list);
  app.post('/api/schedule/:action', scheduleController.requete);

};
