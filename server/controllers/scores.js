const knex = require('../config/knex');
const moment = require('moment');

module.exports = {

  refresh(req, res) {

    let date = new Date();
    date = date.setDate(date.getDate() - 1);
    let dateFormat = moment(date).format("YYYY-MM-DD");

    return knex.raw(
      `UPDATE schedule
        SET outcome = '${req.outcome}'
        WHERE date_parsed='${dateFormat}' AND team='${req.team}'
      `
    )
      .then(function () {
        return 'done'
      });
  }

}
