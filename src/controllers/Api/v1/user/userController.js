"use strict";

const moment = require("moment");
const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const userRepo = require("../../../../data-access/userRepo");

module.exports = {
    /**
    * This function will get profile of user 
    * 
    * @param {string} req.body.userId - user id
    * @return  Detail of user by id
    */
    getMyProfile: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const userId = req.authUser.id;

            const userInfo = await userRepo.getDetail({ _id:userId });
            if (!userInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { profile: userInfo }
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    /**
     * This function will update a user with the provided information
     * 
     * @param {number} req.body.type -The type of the user
     * @param {string} req.body.firstName -The first name of the user
     * @param {string} req.body.lastName -The last name of the user
     * @param {string} req.body.email -The email address of the user
     * @param {string} req.body.password -The password of the user
     * @param {number} req.body.mobileNumber -The mobile number of the user
     * @param {date} req.body.dateOfBirth -The date of birth of the user
     * @param {number} req.body.gender -The gender of the user
     * @returns Update the user detail and return updated user id
     */
    updateUser: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const userId = req.authUser.id;

            const existUser = await userRepo.getDetail({ _id:userId });
            if (!existUser) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }

            const userDetail = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                dateOfBirth: moment(req.body.dateOfBirth, "DD-MM-YYYY").valueOf(),
                gender: req.body.gender,
            };

            if (req.body.password) {
                userDetail.password = await services.bcryptPassword(req.body.password);
            }

            const updatedUser = await userRepo.update(userId, userDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.USER_PROFILE_UPDATE,
                    { id: updatedUser.id }
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    /**
    * This function will delete user profile
    * 
    * @param {string} req.body.userId -The id of the user
    * @return Delete of user by id
    */
    deleteUser: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            
            const userId = req.authUser.id;

            const result = await userRepo.deleteUser(userId);
            if (!result) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.USER_PROFILE_DELETE
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },
}