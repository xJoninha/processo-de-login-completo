const User = require('../models/User');

function loggedUserMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findUserByField('email', emailInCookie)

    if (userFromCookie) {
        req.session.userLogged = userFromCookie
    }

    if(req.session.userLogged){
        return res.redirect('/user/profile')
    }

    next()
}

module.exports = loggedUserMiddleware;