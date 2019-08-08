//////////////////////////
//
//modules requis par l'app
//
//////////////////////////
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//////////////////////////
//
//declaration des variables
//
//////////////////////////

const app = express();

//////////////////////////
//
//utilisation des modules
//
//////////////////////////
app.use(logger('dev'));

app.use(bodyParser.json());

// Serve static files from the React app

//app.use('/assets', express.static('public'))
app.use(express.static('client/build'));

//////////////////////////
//
//Déclaration des routes
//
//////////////////////////

require('./routes')(app);


//////////////////////////
//
//Gestion des erreurs
//
//////////////////////////

//Promise errors
/* process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
}) */

// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
/* app.use(function(err, req, res, next) {
    res.status(err.status || res.statusCode || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}    
    });
}); */

module.exports = app;