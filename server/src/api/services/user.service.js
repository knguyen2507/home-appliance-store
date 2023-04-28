'use strict'

const bcrypt = require('bcrypt');
const client = require('../../database/init.redis');
// services
const {
    signAccessToken,
    signRefreshToken
} = require('./jwt.service');
// models
const _User = require('../models/user.model');
// utils
const { getData } = require('../utils');

// get all users
const get_all_users = async () => {
    const users = await _User.find({});
    if (users.length === 0) {
        return {
            code: 500,
            message: "Internal Server Error"
        }
    }
    return {
        code: 200,
        metadata: {
            users: users.map(user => (
                getData({
                    fields: ['_id', 'name', 'email', 'role'],
                    object: user
                })
            ))
        }
    }
};
// get user by id
const get_user_by_id = async ({id}) => {
    const user = await _User.findOne({_id: id});
    if (!user) {
        return {
            code: 500,
            message: "Internal Server Error"
        }
    }
    return {
        code: 200,
        metadata: {
            user: getData({
                    fields: ['_id', 'name', 'email'],
                    object: user
                })
        }
    }
};
// login
const login = async ({us, pwd}) => {
    // find user by username
    const user = await _User.findOne({username: us});
    if (!user) {
        return {
            code: 403,
            message: "Wrong username or password"
        }
    }
    // check password is valid
    const isValid = await bcrypt.compare(pwd, user.password);
    if (!isValid) {
        return {
            code: 403,
            message: "Wrong username or password"
        }
    }
    // get token
    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);

    return {
        code: 200,
        metadata: {
            user: getData({
                fields: ['_id', 'name', 'role'],
                object: user
            }),
            refreshToken,
            accessToken
        },
        message: `${user.name} Login Successfully`
    }

};
// Log out
const logout = ({ id }) => {
    // delete in redis
    client.del(id.toString());
    
    return {
        code: 201,
        message: `Logout Successfully!`
    }
};
// register guest account
const sign_up_guest = async ({
    name, username, password, email
}) => {
    // hash password
    const hashPw = await bcrypt.hash(password, 10);

    const newUser = {
        name: name,
        username: username,
        password: hashPw,
        email: email,
        role: "Guest"
    }

    const user = await _User.create(newUser);

    return {
        code: 201,
        message: "Your account has been successfully created",
        metadata: user
    }
};

// export module
module.exports = {
    get_all_users,
    get_user_by_id,
    login,
    logout,
    sign_up_guest
}