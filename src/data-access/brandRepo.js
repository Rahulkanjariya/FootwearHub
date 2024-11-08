"use strict";

const brandModel = require("../models/brand");

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
 * This function is use for list brand item
 *
 * @param {object} query -The query criteria
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function list(query, skip, limit, sort) {
    const list = await brandModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
    const total = await brandModel.find(query).countDocuments().exec();
    return { list, total };
}

/**
 * This function is use for create new brand
 * 
 * @param {object} detail -The brand detail
 * @returns 
 */
async function create(detail) {
    const data = new brandModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for update brand by id
 * 
 * @param {string} brandId -The id of the brand
 * @param {object} detail -The updated brand detail
 * @returns 
 */
async function update(brandId, detail) {
    const data = await brandModel.findByIdAndUpdate(
        brandId, 
        detail, 
        { new: true }
    )
    return data;
}

/**
 * This function is use for delete brand by id
 * 
 * @param {string} brandId -The id of the brand
 * @returns
 */
async function deleteBrand(brandId) {
    const data = await brandModel.findByIdAndDelete(brandId).exec();
    return data;
}

module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteBrand
}