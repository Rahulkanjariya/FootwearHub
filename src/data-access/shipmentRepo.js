"use strict";

const shipmentModel = require("../models/shipment");

/**
 * This function is use for get detail by filter
 *
 * @param {object} filter -Filter
 * @returns
 */
async function getDetail(filter) {
    const detail = await shipmentModel.findOne(filter).exec();
    return detail;
}

/**
 * This function is use for create new shipment 
 *
 * @param {object} detail -The shipment detail
 * @returns
 */
async function create(detail) {
    const data = new shipmentModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for update shipment by id 
 * 
 * @param {string} shipmentId -The id of the shipment
 * @param {object} detail -The updated shipment status
 * @returns 
 */
async function updateStatus(shipmentId,detail) {
    const data = await shipmentModel.findByIdAndUpdate(
        shipmentId, 
        detail, 
        { new: true }
    ).exec();
    return data;
}

module.exports = {
    getDetail,
    create,
    updateStatus,
};
