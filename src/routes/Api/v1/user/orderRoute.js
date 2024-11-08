"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../../../../controllers/Api/v1/user/orderController");
const Msg = require("../../../../helpers/localization");
const { body,param,query } = require("express-validator");
const { authenticateUser } = require("../../../../helpers/middleware");

/**
 * This route create a new order
 */
router.post(
    "/place/order",authenticateUser,
    body("productId")
        .notEmpty()
        .withMessage(Msg.PRODUCT_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_PRODUCT_ID),
    body("quantity")
        .notEmpty()
        .withMessage(Msg.QUANTITY_REQUIRED),
    body("orderStatus")
        .notEmpty()
        .withMessage(Msg.ORDER_STATUS_REQUIRED),
    body("paymentMethod")
        .notEmpty()
        .withMessage(Msg.PAYMENT_METHOD_REQUIRED),
    body("paymentStatus")
        .notEmpty()
        .withMessage(Msg.PAYMENT_STATUS_REQUIRED),
    body("addressId")
        .notEmpty()
        .withMessage(Msg.ADDRESS_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_ADDRESS_ID),
    controller.placeNewOrder
);

router.post(
    "/apply/coupon",authenticateUser,
    controller.applyCoupon
)

/**
 * This route list all order
 */
router.get(
    "/list/order",authenticateUser,
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listOrder
);

/**
 * This route retrieve the detail of a specific order
 */
router.get(
    "/order/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_ORDER_ID),
    controller.orderDetail
);

/**
 * This route cancel a specific order
 */
router.delete(
    "/order/cancel/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_ORDER_ID),
    controller.cancelOrder
);

module.exports = router;