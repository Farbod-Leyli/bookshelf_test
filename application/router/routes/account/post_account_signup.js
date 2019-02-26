"use strict"
module.exports = {
    route: (req, res) => {
        if (
            req.body.username == '' || typeof req.body.username == 'undefined' ||
            req.body.password == '' || typeof req.body.password == 'undefined' ||
            req.body.email == '' || typeof req.body.email == 'undefined' ||
            req.body.username.length < 6 || req.body.username.length > 15 ||
            req.body.password.length < 6 || req.body.password.length > 15
        ) {
            return res.status(400).send('bad input');
        } else {
            const acountController = require('../../../controllers/account');
            acountController.checkUsername(req)
                .then(() => {
                    acountController.checkPassword(req)
                        .then(() => {
                            acountController.checkEmail(req)
                                .then(() => {
                                    const User = require('../../../data_models/user');
                                    const md5 = require('js-md5');
                                    let date = new Date();
                                    let newUser = new User({
                                        'username': req.body.username.toLowerCase(),
                                        'password': md5(req.body.password),
                                        'email': req.body.email,
                                        'lastLogDate': date
                                    });
                                    newUser.save()
                                        .then(data => {
                                            const tokenController = require('../../../controllers/token');
                                            tokenController.createToken(data.username, data._id, date, result => {
                                                res.json([{ token: result }]);
                                            });
                                        }).catch(err => { return res.status(500).send('user not found') });
                                }).catch(err => { errorHandler(err) });
                        }).catch(err => { errorHandler(err) });
                }).catch(err => { errorHandler(err) });
        }
        function errorHandler(err) {
            return res.status(403).send(err);
        }
    }
}