const knex = require('../config/knex');
const moment = require('moment');

module.exports = {

  setLocal(req, res) {

    let date = new Date();
    date = date.setDate(date.getDate());
    let dateFormat = moment(date).format("YYYY-MM-DD");

    return knex.raw(
      `UPDATE schedule
        SET my_odds= '${req.odds}'
        WHERE date_parsed='${dateFormat}' AND team='${req.team}'
      `
    )
      .then(function () {
        return 'done'
      });
  }

}