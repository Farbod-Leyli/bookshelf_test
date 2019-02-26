"use strict"
module.exports = {
    checkUsername: (req) => {
        let promise = new Promise((resolve, reject) => {
            let result = /^([a-zA-Z0-9_])+$/.test(req.body.username);
            let checkArray = [/admin/, /fuck/, /sex/, /__/]
            let m = 0;
            for (let i = 0; i < checkArray.length; i++) {
                if (checkArray[i].test(req.body.username) == true) m += 1
            }
            if (result == false || m != 0) {
                reject('bad input');
            } else {
                const User = require('../../../data_models/user');
                User.count({ username: req.body.username.toLowerCase() })
                    .then(userCount => {
                        if (userCount == 0) {
                            resolve('username is ok');
                        } else {
                            reject('username is not available')
                        }
                    })
                    .catch(() => {
                        reject('user not found')
                    });
            }
        });
        return promise;
    },
    checkPassword: (req) => {
        let promise = new Promise((resolve, reject) => {
            let checkArray = [/000000/, /123456/]
            let m = 0;
            for (let i = 0; i < checkArray.length; i++) {
                if (checkArray[i].test(req.body.password) == true) m += 1
            }
            if (m != 0) {
                reject('bad input');
            } else {
                resolve('password is ok');
            }
        });
        return promise;
    },
    checkEmail: (req) => {
        let promise = new Promise((resolve, reject) => {
            const emailValidator = require('email-validator');
            if (!emailValidator.validate(req.body.email)) {
                reject('bad email');
            } else {
                const User = require('../data_models/user');
                User.count({ email: req.body.email })
                    .then(emailCount => {
                        if (emailCount == 0) {
                            resolve('email is ok');
                        } else {
                            reject('email is not available');
                        }
                    })
                    .catch(() => {
                        reject('user not found');
                    });
            }
        });
        return promise;
    },
    findUserId: (req, callback) => {
        const jwt = require('jsonwebtoken');
        let decoded = jwt.decode(req.headers.token, { complete: true });
        callback({
            userId: decoded.payload.userId,
            username: decoded.payload.username
        });
    }
}