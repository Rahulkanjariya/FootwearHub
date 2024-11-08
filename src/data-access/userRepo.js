"use strict";

const userModel = require("../models/auth");

/**
 * This function is use for get detail by filter
 * 
 * @param {object} filter -Filter
 * @returns
 */
async function getDetail(filter) {
    const user = await userModel.findOne({ ...filter, isDeleted: false }).exec();
    return user;
}

/**
 * This function is use for list user
 *
 * @param {object} query -The query criteria
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function list(query, skip, limit, sort) {
    query.isDeleted = false;
    const list = await userModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
    const total = await userModel.find(query).countDocuments().exec();
    return { list, total };
}

/**
 * This function is use for create user
 * 
 * @param {object} detail -The user detail
 * @returns 
 */
async function create(userInfo) {
    const user = new userModel(userInfo);
    const userData = await user.save();
    return userData;
}

/**
 * This function is use for update user
 * 
 * @param {string} id -The id of the user
 * @param {object} detail -The updated user detail
 * @returns 
 */
async function update(id, detail) {
    const data = await userModel.findByIdAndUpdate(
        id, 
        detail, 
        { new: true }
    )
    return data;
}

/**
 * This function is use for delete user by id
 * 
 * @param {string} userId -The id of the user
 * @returns
 */
async function deleteUser(userId) {
    const user = await userModel.findById(userId).exec();
    if(user){
      user.isDeleted = true;
      user.save();
    }
  
    return user;
}

module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteUser,
};