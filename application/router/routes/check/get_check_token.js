"use strict"
module.exports = {
    route: (req, res) => {
        if (req.headers.token == '' || typeof req.headers.token == 'undefined') {
            return res.status(410).send('bad or no token');
        }

        const User = require('../../../data_models/user');
        const tokenController = require('../../../controllers/token');

        tokenController.passToken(req)
            .then(userId => {
                let date = new Date();
                User.updateOne({ _id: userId }, { lastLogDate: date })
                    .then(() => {
                        tokenController.createToken(userId, date, result => {
                            return res.json([{ token: result }]);
                        });
                    }).catch(() => {
                        return res.status(500).send('user not found');
                    });
            })
            .catch(() => {
                return res.status(410).send('no or bad token');
            });
    }
}