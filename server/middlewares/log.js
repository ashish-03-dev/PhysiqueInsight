const fs = require('fs');

function logReqRes(filename) {
    return async (req, res, next) => {
        fs.appendFile(filename, `Request: ${req.method} ${req.url}\n`, (err) => {
            
            next();
        });
    };
}


module.exports = {
    logReqRes
};