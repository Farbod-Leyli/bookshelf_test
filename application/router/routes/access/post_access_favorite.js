"use strict"
module.exports = {
    route: (req, res) => {
        if (req.body.id == '' || typeof req.body.id == 'undefined') {
            return res.status(400).send('empty field');
        } else {
            const Book = require('../../../data_models/book');
            const Favorite = require('../../../data_models/favorite');
            const accountController = require('../../../controllers/account');
            accountController(req, result => {
                Book.count({ _id: id })
                    .then(bookCount => {
                        if (bookCount != 1) {
                            errorHandler();
                        } else {
                            Favorite.find({ userId: result.userId, bookId: id })
                                .then(data => {
                                    if (data.length == 0) {
                                        let newFavorite = new Favorite({
                                            'username': result.username,
                                            'userId': result.userId,
                                            'bookId': id,
                                            'favoriteDate': new Date()
                                        });
                                        newFavorite.save()
                                            .then(() => {
                                                Book.updateOne({_id: id}, {$inc: {favoriteCount: +1}});
                                                return res.json([{
                                                    _id: id,
                                                    favorite: true
                                                }]);
                                            }).catch(err => { errorHandler(); });
                                    } else {
                                        Favorite.remove({ userId: result.userId, bookId: id })
                                            .then(() => {
                                                Book.updateOne({_id: id}, {$inc: {favoriteCount: -1}});
                                                return res.json([{
                                                    _id: id,
                                                    favorite: false
                                                }]);
                                            }).catch(err => { errorHandler(); });
                                    }
                                }).catch(err => { errorHandler(); });
                        }
                    }).catch(err => { errorHandler(); });
            });
        }
        function errorHandler() {
            return res.status(403).send('bad id');
        }
    }
}