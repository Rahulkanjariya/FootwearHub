"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../../controllers/Api/v1/user/userController");
const Msg = require("../../../../helpers/localization");
const { body } = require("express-validator");
const { authenticateUser } = require("../../../../helpers/middleware");

/**
 * This route retrieve the user profile
 */
router.get(
    "/profile",authenticateUser,
    controller.getMyProfile
);

/**
 * This route update the user profile
 */
router.put(
    "/update/profile",authenticateUser,
    body("firstName")
        .optional()
        .notEmpty()
        .withMessage(Msg.FIRST_NAME_REQUIRED),
    body("lastName")
        .optional()
        .notEmpty()
        .withMessage(Msg.LAST_NAME_REQUIRED),
    body("email")
        .optional()
        .notEmpty()
        .withMessage(Msg.EMAIL_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    body("password")
        .optional()
        .notEmpty()
        .withMessage(Msg.PASSWORD_REQUIRED)
        .isLength({ min: 6 })
        .withMessage(Msg.INVALID_PASSWORD),
    body("mobileNumber")
        .optional()
        .notEmpty()
        .withMessage(Msg.MOBILE_NUMBER_REQUIRED)
        .isLength({ min: 10, max: 12 })
        .withMessage(Msg.INVALID_MOBILE_NUMBER),
    body("dateOfBirth")
        .optional()
        .notEmpty()
        .withMessage(Msg.DATE_OF_BIRTH_REQUIRED)
        .isDate({ format: "DD-MM-YYYY", strictMode: true })
        .withMessage(Msg.INVALID_DATE_FORMAT),
    body("gender")
        .optional()
        .notEmpty()
        .withMessage(Msg.INVALID_GENDER),
    controller.updateUser
);

/**
 * This route delete the user profile
 */
router.delete(
    "/delete/profile",authenticateUser,
    controller.deleteUser
);

module.exports = router;
