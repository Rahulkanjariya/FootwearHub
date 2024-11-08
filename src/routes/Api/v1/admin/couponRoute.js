"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../../controllers/Api/v1/admin/couponController");
const Msg = require("../../../../helpers/localization");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../../../helpers/middleware");

/**
 * This route add a new coupon
 */
router.post(
    "/add/coupon",authenticateAdmin,
    body("code")
        .notEmpty()
        .withMessage(Msg.COUPON_CODE_REQUIRED),
    body("description")
        .notEmpty()
        .withMessage(Msg.COUPON_DESCRIPTION_REQUIRED),
    body("discount")
        .notEmpty()
        .withMessage(Msg.DISCOUNT_AMOUNT_REQUIRED),
    body("expiryDate")
        .notEmpty()
        .withMessage(Msg.EXPIRY_DATE_REQUIRED)
        .isDate({ format: "DD-MM-YYYY", strictMode: true })
        .withMessage(Msg.INVALID_EXPIRY_DATE),
    body("maxUses")
        .notEmpty()
        .withMessage(Msg.INVALID_MAX_USES),
    controller.addCoupon
);

/**
 * This route list all coupon
 */
router.get(
    "/list/coupon",authenticateAdmin,
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listCoupon
);

/**
 * This route retrieve the detail of a specific coupon
 */
router.get(
    "/coupon/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_COUPON_ID),
    controller.couponDetail
);

/**
 * This route delete a specific coupon
 */
router.delete(
    "/delete/coupon/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_COUPON_ID),
    controller.deleteCoupon
);

module.exports = router;