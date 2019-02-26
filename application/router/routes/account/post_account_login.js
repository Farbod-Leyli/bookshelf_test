"use strict"
module.exports = {
    route: (req, res) => {
        if (
            req.body.username == '' || typeof req.body.username == 'undefined' ||
            req.body.password == '' || typeof req.body.password == 'undefined' ||
            req.body.username.length < 6 || req.body.username.length > 15 ||
            req.body.password.length < 6 || req.body.password.length > 15
        ) {
            return res.status(400).send('bad input');
        } else {
            const User = require('../../../data_models/user');
            const md5 = require('js-md5');
            User.findOne({ username: req.body.username.toLowerCase(), password: md5(req.body.password) })
                .then(data => {
                    let date = new Date();
                    User.updateOne({ _id: data._id }, { lastLogDate: date })
                        .then(() => {
                            const tokenController = require('../../../controllers/token');
                            tokenController.createToken(data.username, data._id, date, result => {
                                return res.json([{ token: result }]);
                            }).catch(err => { errorHandler() });
                        }).catch(err => { errorHandler() });
                }).catch(err => { errorHandler() });
        }
        function errorHandler() {
            return res.status(403).send('login failed');
        }
    }
}