"use strict";

const mongoose = require("mongoose");

/**
 * Schema for wishlist detail
 */
const wishlistSchema = new mongoose.Schema({
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
    createdAt: Number,
    updatedAt: Number,
},
{
    timestamps: true
});

module.exports = mongoose.model("wishlist",wishlistSchema);