"use strict"
module.exports = {

    // these objects show the routes' path on any acceptable request

    api: { // no token needed
        // example:     server_ip:8080/api/check/username
        getRoutes: [
        ],
        postRoutes: [
            'check/username/',
            'check/email/',
            'check/password/',
            'account/signup/',
            'account/login/',
            'data/book/',
            'data/profile/', //token is optional
            'data/search/'
        ]
    },
    sapi: { // token needed
        // example:     server_ip:8080/sapi/access/favorite
        getRoutes: [
            'check/token/'
        ],
        postRoutes: [
            'access/favorites/',
            'access/favorite/',
            'access/mybooks/',
            'access/showable/',
            'check/upload/',
            'check/update/',
            'file/upload/',
            'file/update/',
            'file/edit/',
            'file/download/'
        ]
    }
}