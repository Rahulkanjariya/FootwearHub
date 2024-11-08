"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../../controllers/Api/v1/user/addressController");
const Msg = require("../../../../helpers/localization");
const { body,param,query } = require("express-validator");
const { authenticateUser } = require("../../../../helpers/middleware");

/**
 * This route add a new address
 */
router.post(
    "/add/address",authenticateUser,
    body("apartmentName")
        .notEmpty()
        .withMessage(Msg.APARTMENT_NAME_REQUIRED),
    body("streetNo")
        .notEmpty()
        .withMessage(Msg.STREET_NO_REQUIRED),
    body("city")
        .notEmpty()
        .withMessage(Msg.CITY_REQUIRED),
    body("state")
        .notEmpty()
        .withMessage(Msg.STATE_REQUIRED),
    body("postalCode")
        .isNumeric()
        .withMessage(Msg.POSTAL_CODE_REQUIRED),
    body("country")
        .notEmpty()
        .withMessage(Msg.COUNTRY_REQUIRED),
    controller.addAddress
);

/**
 * This route is for listing all address for a user
 */
router.get(
    "/list/address",authenticateUser,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listAddress
);

/**
 * This route is for retrieving a specific user address detail
 */
router.get(
    "/address/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_ADDRESS_ID),
    controller.addressDetail
);

/**
 * This route update the detail of an existing address
 */
router.put(
    "/update/address/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_ADDRESS_ID),
    body("apartmentName")
        .optional()
        .notEmpty()
        .withMessage(Msg.APARTMENT_NAME_REQUIRED),
    body("streetNo")
        .optional()
        .notEmpty()
        .withMessage(Msg.STREET_NO_REQUIRED),
    body("city")
        .optional()
        .notEmpty()
        .withMessage(Msg.CITY_REQUIRED),
    body("state")
        .optional()
        .notEmpty()
        .withMessage(Msg.STATE_REQUIRED),
    body("postalCode")
        .optional()
        .isNumeric()
        .withMessage(Msg.POSTAL_CODE_REQUIRED),
    body("country")
        .optional()
        .notEmpty()
        .withMessage(Msg.COUNTRY_REQUIRED),
    controller.updateAddress
);

/**
 * This route delete a specific address
 */
router.delete(
    "/delete/address/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_ADDRESS_ID),
    controller.deleteAddress
);

module.exports = router;
