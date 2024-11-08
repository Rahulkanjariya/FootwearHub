"use strict";

const bcrypt = require("bcryptjs");
const moment = require("moment");
const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const userRepo = require("../../../../data-access/userRepo");
const { sendEmail } = require("../../../../helpers/email");

module.exports = {
    /**
     * This function will create a new user with the provided information
     * 
     * @param {number} req.body.type -The type of the user
     * @param {string} req.body.firstName -The first name of the user
     * @param {string} req.body.lastName -The last name of the user
     * @param {string} req.body.email -The email address of the user
     * @param {string} req.body.password -The password of the user
     * @param {number} req.body.mobileNumber -The mobile number of the user
     * @param {date} req.body.dateOfBirth -The date of birth of the user
     * @param {number} req.body.gender -The gender of the user
     * @returns User create and return new user id
     */
    signUp: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { email } = req.body;
            const emailExist = await userRepo.getDetail({ email });
            if (emailExist) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.EMAIL_EXIST
                    )
                );
            }

            const userDetail = {
                type: req.body.type,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: await services.bcryptPassword(req.body.password),
                mobileNumber: req.body.mobileNumber,
                dateOfBirth: moment(req.body.dateOfBirth, "DD-MM-YYYY").valueOf(),
                gender: req.body.gender,
            };
            
            const newUser = await userRepo.create(userDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.USER_REGISTER,
                    { id: newUser.id }
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
     * This function will check email and password exits in user Collection
     * 
     * @param {string} req.body.email -The email address of the user
     * @param {string} req.body.password -The password of the user
     * @returns 
     */
    login: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { email } = req.body;
            const userLogin = await userRepo.getDetail({ email });
            if (!userLogin) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.INVALID_EMAIL
                    )
                );
            }

            const passwordMatch = await bcrypt.compare(req.body.password, userLogin.password)
            if (!passwordMatch) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.UNAUTHORIZED,
                        Msg.INVALID_PASSWORD
                    )
                );
            }
            
            const token = services.generateToken(userLogin);
            return res.send(
                services.prepareResponse(
                    HttpStatus.SUCCESS,
                    Msg.USER_LOGIN,
                    { token: token }
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
     * This function will update user password
     * 
     * @param {string} req.body.currentPassword
     * @param {string} res.body.newPassword 
     * @returns 
     */
    updatePassword: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const userId = req.authUser.id;
            const { currentPassword, newPassword } = req.body;
            const user = await userRepo.getDetail({ _id:userId });

            if (!user) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }
            
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.UNAUTHORIZED,
                        Msg.PASSWORD_NOT_MATCH
                    )
                );
            }
            
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPassword;
            await user.save();

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.PASSWORD_UPDATE
                )
            )

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
     * This function will return new password to user email
     * 
     * @param {string} req.body.email -The email of the user
     * @returns Return new password to email
     */
    forgotPassword: async function(req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            
            const { email } = req.body;

            const user = await userRepo.getDetail({ email });
            if(!user) {
                return res.send (
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                )
            }
            
            const newPassword = await services.generatePassword();            
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            const emailSent = await sendEmail(
                user.email,
                'Password Reset',
                `Your new password is ${newPassword}.`
            );
            
            if (!emailSent) {
                return res.send (
                    services.prepareResponse(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        Msg.EMAIL_SEND_ERROR
                    )
                )
            }
            return res.send (
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.PASSWORD_RESET_SUCCESS
                )
            )

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