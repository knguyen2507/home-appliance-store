'use strict'

const createError = require('http-errors');
// services
const { 
    get_all_users,
    get_user_by_id,
    login,
    logout,
    sign_up_guest
} = require('../services/user.service');

// get all users
const getAllUsers = async (req, res) => {
    const {code, metadata, message} = await get_all_users({});

    return res.status(code).json({
        code, metadata, message
    })
};
// get user by id
const getUserById = async (req, res) => {
    const id = req.params.id;
    if (id !== req.user_id) {
        return res.status(401).json({
            code: 401, message: "You don't have Access"
        })
    }; 
    const {code, metadata, message} = await get_user_by_id({id});

    return res.status(code).json({
        code, metadata, message
    })
};
// login
const logIn = async (req, res) => {
    const {username, password} = req.body;

    const {code, metadata, message} = await login({us: username, pwd: password});

    if (!metadata) {
        return res.status(code).json({
            code, metadata: metadata, message
        })
    }

    return res.status(code).json({
        code, metadata, message
    })
};
// Log out
const logOut = async (req, res) => {
    const id = req.payload.id;
    const { code, message } = await logout({id});

    return res.status(code).json({
        code, message
    })
};
// register guest account
const signUpGuest = async (req, res) => {
    const { name, username, password, email } = req.body;
    const { code, message, metadata } = await sign_up_guest({name, username, password, email});

    return res.status(code).json({
        code, message, metadata
    })
};

// export module
module.exports = {
    getAllUsers,
    getUserById,
    logIn,
    logOut,
    signUpGuest
}