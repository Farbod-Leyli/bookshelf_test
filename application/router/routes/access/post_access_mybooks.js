"use strict"
module.exports = {
    route: (req, res) => {
        if (!Number.isInteger(+req.body.pageNumber)) {
            return res.status(400).send('empty field');
        } else {
            const Book = require('../../../data_models/book');
            const accountController = require('../../../controllers/account');
            accountController(req, result => {
                Book.count({ uploaderUserId: result.userId }).then(bookCount => {
                    Book.find({ uploaderUserId: result.userId }, null, { $sort: { uploadDate }, skip: +pageNumber * 10, limit: 10 }).then(bookData => {
                        return res.json([{
                            myBookList: bookData,
                            pageCount: Math.ceil(bookCount / 10),
                            pageNumber: +pageNumber
                        }]);
                    }).catch((err) => { errorHandler(); });
                }).catch((err) => { errorHandler(); });
            });
        }
        function errorHandler() {
            return res.status(403).send('bad page number');
        }
    }
}