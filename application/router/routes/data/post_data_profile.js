"use strict"
module.exports = {
    route: (req, res) => {
        if (req.body.id == '' || typeof req.body.id == 'undefined') {
            return res.status(400).send('empty field or bad input');
        }
        const User = require('../../../data_models/user');
        try {
            User.findById({ _id: req.body.id }, {password: -1}).then(data => {
                return res.json(data);
            }).catch((err) => { errorHandler('book not found'); })
        } catch (err) { errorHandler('book not found'); }
        function errorHandler(err) {
            return res.status(403).send(err);
        }
    }
}