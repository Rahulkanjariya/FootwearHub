"use strict";

const mongoose = require("mongoose");

/**
 * Schema for category detail
 */
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: Number,
    updatedAt: Number,
},
{
    timestamps: true
});

module.exports = mongoose.model("category",categorySchema);