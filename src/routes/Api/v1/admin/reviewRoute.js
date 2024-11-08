"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../../controllers/Api/v1/admin/reviewController");
const Msg = require("../../../../helpers/localization");
const { param,query } = require("express-validator");
const { authenticateAdmin } = require("../../../../helpers/middleware");

/**
 * This route list all review
 */
router.get(
    "/list/review",authenticateAdmin,
    query("search").optional().toInt(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listReview
);

/**
 * This route retrieve the detail of a specific review
 */
router.get(
    "/review/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_REVIEW_ID),
    controller.reviewDetail
);

module.exports = router;
