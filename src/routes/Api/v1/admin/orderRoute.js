"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../../../../controllers/Api/v1/admin/orderController");
const Msg = require("../../../../helpers/localization");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../../../helpers/middleware");

/**
 * This route list all order
 */
router.get(
    "/list/order",authenticateAdmin,
    query("search").optional().toInt(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listOrder
);

/**
 * This route retrieve the detail of a specific order
 */
router.get(
    "/order/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_ORDER_ID),
    controller.orderDetail
);

/**
 * This route update the status of a specific order
 */
router.put(
    "/update/status/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_ORDER_ID),
    body("orderStatus")
        .notEmpty()
        .withMessage(Msg.ORDER_STATUS_REQUIRED),
    controller.updateStatus
);

module.exports = router;