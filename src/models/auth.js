"use strict";

const mongoose = require("mongoose");
const { type,gender,status } = require("../helpers/enum");
const moment = require("moment");

/**
 * Schema for user detail
 */
const userSchema = new mongoose.Schema({
    type: {
        type: Number,
        enum: [type.USER,type.ADMIN],
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Number,
        required: true,
        default: () => moment().valueOf()
    },
    gender: {
        type: Number,
        enum: [
            gender.MALE,
            gender.FEMALE,
            gender.OTHER
        ],
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        enum: [
            status.Active,
            status.Inactive
        ],
        default: status.Active,
    },
    createdAt: Number,
    updatedAt: Number,
},
{
    timestamps: true
});

module.exports = mongoose.model("user",userSchema);

