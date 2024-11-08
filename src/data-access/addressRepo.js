"use strict";

const addressModel = require("../models/address");

/**
 * This function is use for get detail by filter
 *
 * @param {object} filter -Filter
 * @returns 
 */
async function getDetail(filter) {
    const detail = await brandModel.findOne(filter).exec();
    return detail;
}

/**
 * This function is use for list user address
 *
 * @param {object} query -The query criteria
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function list(query, skip, limit) {
    const list = await addressModel
        .find(query)
        .populate("userId", "firstName lastName mobileNumber -_id")
        .skip(skip)
        .limit(limit)
    const total = await addressModel.find(query).countDocuments().exec();
    return { list, total };
}

/**
 * This function is use for create new user address
 * 
 * @param {object} detail -The user address detail
 * @returns 
 */
async function create(detail) {
    const data = new addressModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for update user address by id
 * 
 * @param {string} userId -The id of the user
 * @param {object} detail -The updated address detail
 * @returns 
 */
async function update(userId, detail) {
    const data = await addressModel.findByIdAndUpdate(
        userId, 
        detail, 
        { new: true }
    );
    return data;
}

/**
 * This function is use for delete user address by id
 * 
 * @param {string} userId -The id of the user
 * @returns
 */
async function deleteAddress(userId) {
    const data = await addressModel.findByIdAndDelete(userId).exec();
    return data;
}

module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteAddress
};