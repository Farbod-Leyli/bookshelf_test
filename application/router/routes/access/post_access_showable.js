"use strict"
module.exports = {
    route: (req, res) => {
        if (req.body.id == '' || typeof req.body.id == 'undefined') {
            return res.status(400).send('empty field');
        } else {
            const Book = require('../../../data_models/book');
            const accountController = require('../../../controllers/account');
            accountController(req, result => {
                Book.find({ _id: id, userId: result.userId }).then(data => {
                    if (data.length < 1) errorHandler();
                    else {
                        let showable = (data[0].showable == true) ? false : true;
                        Book.updateOne({ _id: data[0]._id }, { showable: showable }).then(() => {
                            return res.json([{
                                _id: data[0]._id,
                                showable: showable
                            }]);
                        }).catch((err) => { errorHandler(); });
                    }
                }).catch((err) => { errorHandler(); });
            });
        }
        function errorHandler() {
            return res.status(403).send('bad id');
        }
    }
}