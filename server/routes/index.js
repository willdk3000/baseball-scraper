const team_battingController = require('../controllers').team_batting;
const team_pitchingController = require('../controllers').team_pitching;
const scheduleController = require('../controllers').schedule;

module.exports = (app) => {

  app.get('/team_batting', team_battingController.list);
  //app.post('/api/team_batting/:action', team_battingController.requete);

  app.get('/team_pitching', team_pitchingController.list);
  //app.post('/api/team_pitching/:action', team_pitchingController.requete);

  app.get('/schedule', scheduleController.list);
  app.post('/schedule/:action', scheduleController.requete);

};
