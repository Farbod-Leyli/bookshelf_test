"use strict"
module.exports = {
    route: (req, res) => {
        if (!Number.isInteger(+req.body.pageNumber)) {
            return res.status(400).send('empty field');
        } else {
            const Favorite = require('../../../data_models/favorite');
            const Book = require('../../../data_models/book');
            const accountController = require('../../../controllers/account');
            accountController(req, result => {
                Favorite.count({ userId: result.userId }).then(fCount => {
                    Favorite.aggregate([
                        { userId: result.userId },
                        { $sort: { favoriteDate: 1 }, skip: +pageNumber * 10, limit: 10 },
                        {
                            $lookup: {
                                from: 'book',
                                localField: 'bookId',
                                foreignField: '_id',
                                as: 'bookDetails'
                            }
                        }
                    ]).then(data => {
                        return res.json([{
                            favoriteList: data,
                            pageCount: Math.ceil(fCount / 10),
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