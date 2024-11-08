"use strict";

const categoryModel = require("../models/category");

/**
 * This function is use for get detail by filter
 *
 * @param {object} filter -Filter
 * @returns
 */
async function getDetail(filter) {
    const detail = await categoryModel.findOne({ ...filter, isActive: true }).exec();
    return detail;
}

/**
 * This function is use for list category
 *
 * @param {object} query -The query criteria
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function list(query, skip, limit, sort) {
    query.isActive = true;
    const list = await categoryModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
    const total = await categoryModel.find(query).countDocuments().exec();
    return { list, total };
}

/**
 * This function is use for create category
 * 
 * @param {object} detail -The category detail
 * @returns 
 */
async function create(detail) {
    const data = new categoryModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for update category by id
 * 
 * @param {string} categoryId -The id of the category
 * @param {object} detail -The updated category detail
 * @returns 
 */
async function update(categoryId, detail) {
    const data = await categoryModel.findByIdAndUpdate(
        categoryId, 
        detail, 
        { new: true }
    );
    return data;
}

/**
 * This function is use for soft delete category by id
 * 
 *  @param {string} categoryId -The id of the category
 *  @returns
 */
async function deleteCategory(categoryId) {
    const categoryInfo = {
        name: "",
        isActive: false
    };

    const category = await categoryModel.findOneAndUpdate(
        { _id: categoryId, isActive: true },
        categoryInfo,
        { new: true }
    ).exec();

    return category;
}


module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteCategory,
};