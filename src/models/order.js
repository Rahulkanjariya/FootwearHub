"use strict";

const mongoose = require("mongoose");
const {
    orderStatus,
    paymentMethod,
    paymentStatus 
} = require("../helpers/enum");

/**
 * Schema for order detail
 */
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: Number,
        enum: [
            orderStatus.PENDING,
            orderStatus.CONFIRMED,
            orderStatus.SHIPPED,
            orderStatus.DELIVERED,
            orderStatus.CANCELLED
        ],
        required: true
    },
    paymentMethod: {
        type: Number,
        enum: [
            paymentMethod.CREDIT_CARD,
            paymentMethod.DEBIT_CARD,
            paymentMethod.CASH_ON_DELIVERY
        ],
        required: true
    },
    paymentStatus: {
        type: Number,
        enum: [
            paymentStatus.PENDING,
            paymentStatus.COMPLETED,
            paymentStatus.FAILED
        ],
        required: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        required: true 
    },
    createdAt: Number,
    updatedAt: Number,
},
{
    timestamps: true
});

module.exports = mongoose.model("order",orderSchema);