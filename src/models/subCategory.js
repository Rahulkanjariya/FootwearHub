"use strict";

const mongoose = require("mongoose");

/**
 * Schema for subcategory detail
 */
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
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

module.exports = mongoose.model("subCategory",subCategorySchema);