"use strict";

const productModel = require("../models/product");

/**
 * This function is use for get detail by filter
 *
 * @param {object} filter -Filter
 * @returns
 */
async function getDetail(filter) {
    const detail = await productModel.findOne({ ...filter, isActive: true }).exec();
    return detail;
}

/**
 * This function is use for list product
 *
 * @param {object} query -The query criteria
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function list(filters = {}, skip, limit, sort = {}) {
    filters.isActive = true;
    const pipeline = [
        { $match: filters },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "categoryDetail"
            }
        },
        {
            $lookup: {
                from: "subcategories",
                localField: "subCategoryId",
                foreignField: "_id",
                as: "subCategoryDetail"
            }
        },
        {
            $lookup: {
                from: "brands",
                localField: "brandId",
                foreignField: "_id",
                as: "brandDetail"
            }
        },

        {
            $unwind: {
                path: "$categoryDetail",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: "$subCategoryDetail",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: "$brandDetail",
                preserveNullAndEmptyArrays: true
            }
        },

        {
            $project: {
                _id: 1,
                name: 1,
                price: 1,
                size: 1,
                color: 1,
                "categoryDetail.name": 1,
                "subCategoryDetail.name": 1,
                "brandDetail.name": 1,
            }
        },

        { $sort: sort },
        { $skip: skip },
        { $limit: limit }
    ];

    const list = await productModel.aggregate(pipeline).exec();
    const total = await productModel.countDocuments(filters).exec();
    return { list, total };
}


/**
 * This function is use for create Product
 * 
 * @param {object} detail -The product detail
 * @return 
 */
async function create(detail) {
    const data = new productModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for update product by id 
 * 
 * @param {string} productId -The id of the product
 * @param {object} detail -The updated product detail
 * @return 
 */
async function update(productId, detail) {
    const data = await productModel.findByIdAndUpdate(
        productId, 
        detail, 
        { new: true }
    );
    return data;
}

/**
 * This function is use for soft delete product by id
 * 
 *  @param {string} productId -The id of the product
 *  @return
 */
async function deleteProduct(productId) {
    const productInfo = {
        name: "",
        price: 0,
        description: "",
        image: "",
        size: [],
        color: [],
        stock: 0,
        isActive: false
    };

    const product = await productModel.findOneAndUpdate(
        { _id: productId, isActive: true },
        productInfo,
        { new: true }
    ).exec();

    return product;
}

module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteProduct,
}