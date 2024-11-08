"use strict";

const jwt = require("jsonwebtoken");
require("dotenv").config();
const services = require("../helpers/index");
const { HttpStatus } = require("../errors/code");
const Msg = require("../helpers/localization");
const userRepo = require("../data-access/userRepo");

/**
 * Verify jwt token for any user authentication
 * 
 * @param {string} token -Token
 * @return
 */
async function authenticateAnyUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.send(
            services.prepareResponse(
                HttpStatus.NOT_FOUND,
                Msg.TOKEN_REQUIRED
            )
        );
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userRepo.getDetail({ _id: verifiedToken.id });

        if (!user) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.NOT_FOUND,
                    Msg.USER_NOT_EXIST
                )
            );
        }

        req.authUser = user;
        switch (user.type) {
            case 1: // Admin
                authenticateAdmin(req, res, next);
                break;
            case 2: // User
                authenticateUser(req, res, next);
                break;
            default:
                res.status(403).send({
                    responseCode: 403,
                    responseMessage: 'Unauthorized'
                });
                break;
        }

    } catch (error) {
        return res.send(
            services.prepareResponse(
                HttpStatus.UNAUTHORIZED,
                Msg.INVALID_TOKEN
            )
        );
    }
};


/**
 * Verify jwt token for admin authentication
 * 
 * @param {string} token -Token
 * @return
 */

async function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.send(
            services.prepareResponse(
                HttpStatus.NOT_FOUND,
                Msg.TOKEN_REQUIRED
            )
        );
    }

    try {
        const decodedToken = jwt.decode(token); 

        const currentTimestamp = Date.now() / 1000;
        if (currentTimestamp > decodedToken.exp) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.UNAUTHORIZED,
                    Msg.TOKEN_EXPIRED
                )
            );
        }
        
        const verifiedToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userRepo.getDetail({ _id: verifiedToken.id });

        if (!user) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.NOT_FOUND,
                    Msg.USER_NOT_EXIST
                )
            );
        }

        if (user.type === 2) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.UNAUTHORIZED,
                    Msg.UNAUTHORIZED_ACCESS
                )
            );
        }

        req.authUser = user;
        next();

    } catch (error) {
        return res.send(
            services.prepareResponse(
                HttpStatus.UNAUTHORIZED,
                Msg.INVALID_TOKEN
            )
        );
    }
}

/**
 * Verify jwt token for user authentication
 * 
 * @param {string} token -Token
 * @return
 */

async function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.send(
            services.prepareResponse(
                HttpStatus.NOT_FOUND,
                Msg.TOKEN_REQUIRED
            )
        );
    }

    try {
        const decodedToken = jwt.decode(token); 

        const currentTimestamp = Date.now() / 1000;
        if (currentTimestamp > decodedToken.exp) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.UNAUTHORIZED,
                    Msg.TOKEN_EXPIRED
                )
            );
        }

        const verifiedToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userRepo.getDetail({ _id: verifiedToken.id });

        if (!user) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.NOT_FOUND,
                    Msg.USER_NOT_EXIST
                )
            );
        }

        if (user.type === 1) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.UNAUTHORIZED,
                    Msg.UNAUTHORIZED_ACCESS
                )
            );
        }

        req.authUser = user;
        next();

    } catch (error) {
        return res.send(
            services.prepareResponse(
                HttpStatus.UNAUTHORIZED,
                Msg.INVALID_TOKEN
            )
        );
    }
}


module.exports = {
    authenticateAnyUser,
    authenticateAdmin,
    authenticateUser 
};
