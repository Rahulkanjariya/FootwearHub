"use strict";

const mongoose = require("mongoose");

/**
 * Schema for brand detail
 */
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: Number,
    updatedAt: Number,
},
{
    timestamps: true
});

module.exports = mongoose.model("brand",brandSchema);