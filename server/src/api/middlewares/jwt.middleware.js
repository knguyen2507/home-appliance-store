'use strict'

const JWT = require("jsonwebtoken");
const createError = require('http-errors');
// Models
const _User = require('../models/user.model');

// verify access token
const verifyAccessToken = async (req, res, next) => {
    // get authorization header
    const authHeader = req.headers["authorization"];
    const idUser = req.body.idUser;

    if (!authHeader) {
        return next(createError.Forbidden('You need sign in!'));
    }

    // authHeader = 'bearer' + accessToken
    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
        return next(createError.BadRequest('No token!'));
    }

    // verify access token
    JWT.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(createError.Unauthorized());
            }
            return next(createError.Unauthorized(err.message));
        }

        if (idUser !== decoded.id) {
            return next(createError.Unauthorized("You don't have permission to access"));
        }
        req.user_id = decoded.id;
        next();
    });
};


// export module
module.exports = {
    verifyAccessToken
};