"use strict"
module.exports = {
    route: (req, res) => {
        if (req.body.bookName == '' || typeof req.body.bookName == 'undefined' ||
            !Number.isInteger(req.body.pageCount)) {
            return res.status(400).send('empty field or bad input');
        } else {
            const fileController = require('../../../controllers/file');
            fileController.checkName(req).then(() => {
                return res.status(200).send('upload data is ok');
            }).catch(errorMessage => errorHandler(errorMessage))
        }
        function errorHandler(err) {
            return res.status(403).send(err);
        }
    }
}