"use strict";

const mongoose = require("mongoose");

/**
 * Schema for user address detail
 */
const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    apartmentName: {
        type: String,
        required: true
    },
    streetNo: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    createdAt: Number,
    updatedAt: Number,
},
{
    timestamps: true
});

module.exports = mongoose.model("address",addressSchema);