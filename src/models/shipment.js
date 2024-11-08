"use strict";

const mongoose = require("mongoose");
const { shipmentStatus } = require("../helpers/enum");
const moment = require("moment");

/**
 * Schema for shipment detail
 */
const shipmentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true
    },
    status: {
        type: Number,
        enum: [
            shipmentStatus.PENDING,
            shipmentStatus.SHIPPED,
            shipmentStatus.IN_TRANSIT,
            shipmentStatus.DELIVERED,
            shipmentStatus.RETURNED
        ],
        required: true
    },
    trackingNumber: {
        type: String,
        required: true
    },
    estimatedDelivery: {
        type: Number,
        required: true,
        default: () => moment().valueOf()
    },
    createdAt: Number,
    updatedAt: Number,
},
{
    timestamps: true
});

module.exports = mongoose.model("shipment",shipmentSchema);
