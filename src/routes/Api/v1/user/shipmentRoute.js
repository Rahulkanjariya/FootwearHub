"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../../../../controllers/Api/v1/user/shipmentController");
const Msg = require("../../../../helpers/localization");
const { param } = require("express-validator");
const { authenticateUser } = require("../../../../helpers/middleware");

/**
 * This route retrieve the detail of a specific shipment
 */
router.get(
    "/shipment/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_SHIPMENT_ID),
    controller.shipmentDetail
);

module.exports = router;