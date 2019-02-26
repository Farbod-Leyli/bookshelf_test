"use strict"
module.exports = {
    pathFinder: (req, callback) => {

        // this function craetes a true data for router to find its module directory
        
        let routePathArray = req.params.routePath.split('/');
        if (routePathArray.length == 0) {
            callback(false);
        } else {
            let moduleArray = []
            for (let i = 0; i < routePathArray.length; i++) {
                moduleArray.push(routePathArray[i]);
            }
            let moduleSubPath = (req.method).toLowerCase();
            for (let i = 0; i < routePathArray.length - 1; i++) {
                moduleSubPath += `_${routePathArray[i]}`
            }
            callback([moduleArray, moduleSubPath]);
        }
    },
}