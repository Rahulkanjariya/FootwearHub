"use strict";

const mongoose = require("mongoose");
const { discountType } = require("../helpers/enum");
const moment = require("moment");

/**
 * Schema for coupon detail
 */
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Number,
        required: true,
        default: () => moment().valueOf()
    },
    maxUses: {
        type: Number,
        required: true
    },
    usedCount: {
        type: Number,
        default: 0
    },
    createdAt: Number,
    updatedAt: Number
},
{
    timestamps: true
});

module.exports = mongoose.model("coupon",couponSchema);