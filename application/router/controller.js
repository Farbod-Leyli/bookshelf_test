"use strict"
module.exports = {
    
    // these functions help requests to reach their module correctly

    api_separator: (req, res) => {
        let apiType = (req.method == 'GET') ? 'getRoutes' : 'postRoutes';
        let routesList = require('./routesList');
        let selectedList = routesList.api[apiType]
        if (selectedList.indexOf(req.params.routePath) == -1) {
            return res.status(404).send('api not found');
        } else {
            let pathFinder = require('../controllers/public').pathFinder;
            pathFinder(req, result =>{
                if (!result) {
                    return res.status(404).send('api not found');
                } else {
                    let modulePath = require(`./routes/${result[0][0]}/${result[1]}.js`);
                    modulePath.route(req, res);
                }
            });
        }
    },
    sapi_separator: (req, res) => {
        let apiType = (req.method == 'GET') ? 'getRoutes' : 'postRoutes';
        let routesList = require('./routesList');
        let selectedList = routesList.sapi[apiType]
        if (selectedList.indexOf(req.params.routePath) == -1) {
            return res.status(404).send('api not found');
        } else {
            let pathFinder = require('../controllers/public').pathFinder;
            pathFinder(req, result =>{
                if (!result) {
                    return res.status(404).send('api not found');
                } else {
                    let modulePath = require(`./routes/${result[0][0]}/${result[1]}.js`);
                    modulePath.route(req, res);
                }
            });
        }
    }
}