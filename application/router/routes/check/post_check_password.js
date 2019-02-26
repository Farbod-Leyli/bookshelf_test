"use strict"
module.exports = {
    route: (req, res) => {
        if (req.body.password == '' || typeof req.body.password == 'undefined') {
            return res.status(400).send('empty field');
        }
        else if (req.body.password.length < 6 || req.body.password.length > 15) {
            return res.status(400).send('too short or too long');
        } else {
            const accountController = require('../../../controllers/account');
            accountController.checkPassword(req)
                .then(message => {
                    return res.status(200).send(message);
                })
                .catch(errorMessage => {
                    return res.status(403).send(errorMessage);
                });
        }
    }
}