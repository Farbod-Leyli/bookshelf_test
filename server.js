
"use strict"

//********** IMPORTANT ***********************************
//********** Take a look at '_read_me.txt' to start server
//********************************************************

// Packages and Config --------------------------------
const express = require('express');
const config = require('./configs/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const unCapitalize = require('express-uncapitalize');
const slash = require('express-slash');

const app = express();
const port = process.env.PORT || 8080;
//mongoose.connect(config.database);
mongoose.Promise = Promise;
app.enable('strict routing');
app.set('secret', config.secret);
app.set('key', config.key);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(unCapitalize());



// TEST SERVER ----------------------------------------
app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING...');
});
app.listen(port);
console.log('Server is up at http//localhost:' + port);




// ROUTER ---------------------------------------------
const routerController = require('./application/router/controller');
const tokenController = require('./application/controllers/token');

const Router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict: app.get('strict routing')
});
app.use(slash());


// Free Routes apis
let routhPath = config.routePath;
Router.get(`/api/:${routhPath}`, routerController.api_separator);
Router.post(`/api/:${routhPath}`, routerController.api_separator);


// Passing token
Router.use(`/sapi/:${routhPath}`, function (req, res, next) {
    tokenController.passToken(req)
        .then(() => {
            next();
        })
        .catch(() => {
            return res.status(410).send('bad or no token');
        });
});


// Token needed apis
Router.get(`/sapi/:${routhPath}`, routerController.sapi_separator);
Router.post(`/sapi/:${routhPath}`, routerController.sapi_separator);

app.use('/', Router);