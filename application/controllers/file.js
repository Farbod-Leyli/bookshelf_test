"use strict"
module.exports = {
    checkName: (req) => {
        let promise = new Promise((resolve, reject) => {
            let result = /^([a-zA-Z0-9 -])+$/.test(req.body.bookName);
            let checkArray = [/admin/, /fuck/, /sex/, /__/]
            let m = 0;
            for (let i = 0; i < checkArray.length; i++) {
                if (checkArray[i].test(req.body.bookName) == true) m += 1
            }
            if (result == false || m != 0) {
                reject('bad input');
            } else {
                resolve();
            }
        });
        return promise;
    }
}