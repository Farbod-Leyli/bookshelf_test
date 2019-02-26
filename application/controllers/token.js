"use strict"
module.exports = {
    passToken: (req) => {

        // this function/promise checks the request's token availability

        const configUser = require('../../configs/configUser');
        const jwt = require('jsonwebtoken');
        const User = require('../data_models/user');

        let promise = new Promise((resolve, reject) => {
            if (req.headers.token) {
                let token = req.headers.token;
                jwt.verify(token, `${configUser.secret}`), (err, decoded) => {
                    if (err) reject();
                    else {
                        req.decoded = decoded;
                        let _decoded = jwt.decode(token, { complete: true });
                        try {
                            User.count({ _id: _decoded.payload.userId, lastLogDate: _decoded.payload.lastLogDate }, userCount => {
                                if (userCount == 0) reject();
                                else resolve(_decoded.payload.userId);
                            });
                        } catch (err) {
                            reject();
                        }
                    }
                }
            } else reject();
        });
        return promise;
    },
    createToken: (username, userId, date, callback) => {

        const jwt = require('jsonwebtoken');
        const configUser = require('../../configs/configUser')
        const payload = {
            userId: userId,
            username: username,
            lastLogDate: date
        };
        let token = jwt.sign(payload, app.get('secret'), {
            expiresIn: configUser.tokenExpiration //seconds
        });
        callback(token);
    }
}