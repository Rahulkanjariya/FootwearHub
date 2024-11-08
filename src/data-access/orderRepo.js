"use strict";

const orderModel = require("../models/order");

/**
 * This function is use for get detail by filter
 *
 * @param {object} filter -Filter
 * @returns
 */
async function getDetail(filter)
{
    const detail = await orderModel.findOne(filter).exec();
    return detail;
}

/**
 * This function is use for list order
 *
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function list(skip, limit, filters = {}, sort = {}) {
    const pipeline = [
        { $match: filters },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userDetail"
            }
        },
        { 
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productDetail"
            }
        },
        { 
            $lookup: {
                from: "addresses",
                localField: "addressId",
                foreignField: "_id",
                as: "addressDetail"
            }
        },
        
        { 
            $unwind: { 
                path: "$userDetail", 
                preserveNullAndEmptyArrays: true 
            }
        },
        { 
            $unwind: { 
                path: "$productDetail", 
                preserveNullAndEmptyArrays: true 
            }
        },
        { 
            $unwind: { 
                path: "$addressDetail", 
                preserveNullAndEmptyArrays: true 
            }
        },
        
        { 
            $project: {
                _id: 1,
                quantity: 1,
                totalAmount: 1,
                "userDetail.firstName": 1,
                "userDetail.lastName": 1,
                "userDetail.mobileNumber": 1,
                "productDetail.name": 1,
                "productDetail.price": 1,
                "addressDetail.apartmentName": 1,
                "addressDetail.streetNo": 1,
                "addressDetail.city": 1,
                "addressDetail.state": 1,
                "addressDetail.country": 1,
            }
        },

        { $sort: sort },
        { $skip: skip },
        { $limit: limit }
    ];

    const list = await orderModel.aggregate(pipeline);
    const total = await orderModel.countDocuments(filters).exec();
    return { list, total };
}

/**
 * This function is use for place a new order
 *
 * @param {object} detail -The order detail
 * @returns
 */
async function placeNewOrder(detail) {
    const data = new orderModel(detail);
    const newData = await data.save();
    return newData;
}

async function updateOrder(orderId, updateField) {
    const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: updateField },
        { new: true }
    );
    return updatedOrder;
}

/**
 * This function is use for update status by id
 * 
 * @param {string} id -The id of the order
 * @returns
 */
async function updateStatus(id, detail) {
    const updatedOrder = await orderModel.findByIdAndUpdate(
        id, 
        detail, 
        { new: true }
    );
    return updatedOrder;
}

/**
 * This function is use for delete order by id
 * 
 * @param {string} id -The id of the order
 * @returns
 */
async function cancelOrder(id) {
    return await orderModel.findByIdAndDelete(id);
}

module.exports = {
    getDetail,
    list,
    placeNewOrder,
    updateOrder,
    cancelOrder,
    updateStatus,
};