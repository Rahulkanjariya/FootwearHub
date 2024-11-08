"use strict";

const subCategoryModel = require("../models/subCategory");

/**
 * This function is use for get detail by filter
 *
 * @param {object} filter -Filter
 * @returns
 */
async function getDetail(filter) {
    const detail = await subCategoryModel.findOne({ ...filter, isActive: true }).exec();
    return detail;
}

/**
 * This function is use for list sub category
 *
 * @param {object} query -The query criteria
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function list(query, skip, limit, sort) {
    query.isActive = true;
    const list = await subCategoryModel
        .find(query)
        .populate("categoryId", "name -_id")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
    
    const total = await subCategoryModel.find(query).countDocuments().exec();
    return { list, total };
}

/**
 * This function is use for create sub category
 * 
 * @param {object} detail -The sub category detail
 * @returns 
 */
async function create(detail) {
    const data = new subCategoryModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for update sub category by id
 * 
 * @param {string} subCategoryId -The id of the sub category
 * @param {object} detail -The updated sub category detail
 * @returns 
 */
async function update(subCategoryId, detail) {
    const data = await subCategoryModel.findByIdAndUpdate(
        subCategoryId, 
        detail, 
        { new: true }
    );
    return data;
}

/**
 * This function is use for soft delete sub category by id
 * 
 *  @param {string} subCategoryId -The id of the sub category
 *  @returns
 */
async function deleteSubCategory(subCategoryId) {
    const subCategoryInfo = {
        name: "",
        isActive: false
    };

    const subCategory = await subCategoryModel.findOneAndUpdate(
        { _id: subCategoryId, isActive: true },
        subCategoryInfo,
        { new: true }
    ).exec();

    return subCategory;
}


module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteSubCategory,
};