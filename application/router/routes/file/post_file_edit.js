"use strict"
module.exports = {
    route: (req, res) => {
        if (req.body.bookName == '' || typeof req.body.bookName == 'undefined' ||
            req.body.id == '' || typeof req.body.id == 'undefined' ||
            !Number.isInteger(req.body.pageCount)) {
            return res.status(400).send('empty field or bad input');
        } else {
            const fileController = require('../../../controllers/file');
            const accountController = require('../../../controllers/account');
            const Book = require('../../../data_models/book');
            fileController.checkName(req).then(() => {
                accountController.findUserId(req, result => {
                    Book.count({ _id: id, uploaderUserId: result.userId }).then(bookCount => {
                        if (bookCount == 0) errorHandler('book not found');
                        Book.updateOne({ _id: id, uploaderUserId: result.userId },
                            { $set: { bookName: req.body.bookName, pageCount: Math.abs(req.body.pageCount) } }).then(() => {
                                return res.status(200).send('update data is ok');
                            }).catch((err) => errorHandler('book not found'));
                    }).catch((err) => errorHandler('book not found'));
                });
            }).catch((err) => errorHandler('bad book name'));
        }
        function errorHandler(err) {
            return res.status(403).send(err);
        }
    }
}