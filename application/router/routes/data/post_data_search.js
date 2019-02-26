"use strict"
module.exports = {
    route: (req, res) => {
        if (!Number.isInteger(+req.body.pageNumber)) {
            errorHandler('bad page number')
        } else {
            let sortOrders = ['pageCount', 'date'];
            let sortOrder = (sortOrders.indexOf(req.body.sortOrder) == 0) ? 'pageCount' : 'uploadDate';
            const Book = require('../../../data_models/book');
            Book.count().then(bookCount => {
                let pageCount = Math.ceil(bookCount / 10)
                if (Math.abs(+req.body.pageNumber) > pageCount) errorHandler('high page number');
                else {
                    let findObject = (req.body.search == '' || typeof req.body.search == 'undefined') ?
                        { showable: true } : { bookName: { $regex: req.body.search }, showable: true };
                    Book.find(findObject, null, { $sort: { [sortOrder]: 1 }, skip: +pageNumber * 10, limit: 10 })
                        .then(data => {
                            return res.json([{
                                searchPageCount: pageCount,
                                searchPage: Math.abs(+req.body.pageNumber),
                                searchResult: data
                            }]);
                        }).catch(err => { errorHandler('no book') })
                }
            }).catch(err => { errorHandler('no book') })
        }
        function errorHandler(errorMessage) {
            return res.status(403).send(errorMessage);
        }
    }
}