"use strict"
route: (req, res) => {
    if (req.body.email == '' || typeof req.body.email == 'undefined') {
        return res.status(400).send('empty field');
    } else {
        const accountController = require('../../../controllers/account');
        accountController.checkEmail(req)
            .then(message => {
                return res.status(200).send(message);
            })
            .catch(errorMessage => {
                return res.status(403).send(errorMessage);
            });
    }
}