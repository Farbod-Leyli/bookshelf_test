"use strict"
module.exports = {
    route: (req, res) => {
        if (req.body.username == '' || typeof req.body.username == 'undefined') {
            return res.status(400).send('empty field');
        }
        else if (req.body.username.length < 6 || req.body.username.length > 15) {
            return res.status(400).send('too short or too long');
        } else {
            const accountController = require('../../../controllers/account');
            accountController.checkUsername(req)
                .then(message => {
                    return res.status(200).send(message);
                })
                .catch(errorMessage => {
                    return res.status(403).send(errorMessage);
                });
        }
    }
}