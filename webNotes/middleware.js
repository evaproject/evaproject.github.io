var database = require('./db');

const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator();

module.exports = {
    checkAll: async (req, res, next) => {
        var authCookie = req.cookies.auth;
        if (req.path.indexOf("/login") != -1) return next();

        if (!(await database.getAuth(authCookie))) {
            return res.redirect("/login");
        }
        return next();
    },
    checkLogin: async (req, res, next) => {
        var authCookie = req.cookies.auth;
        if (await database.getAuth(authCookie)) {
            console.log("login redirect")
            res.clearCookie("auth");
            //return res.redirect("/");
        }
        return next();
    },
    cookies: function (req, res, next) {
        // check if client sent cookie
        var cookie = req.cookies.auth;
        if (cookie === undefined) {
            // no: set a new cookie
            var authToken = tokgen.generate();
            res.cookie('auth', authToken, { maxAge: 900000, httpOnly: true });
            console.log('cookie created successfully');
        } else {
            // yes, cookie was already present 
            console.log('cookie exists', cookie);
        }
        next(); // <-- important!
    }
}