"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const userRepo = require("../../../../data-access/userRepo");

module.exports = {
    /**
     * This function will list of all user
     * 
     * @param {string} req.query.search -The search term
     * @param {number} req.query.page -The page number
     * @param {number} req.query.perPage -The number of record per page
     * @returns Return all user
     *
     */ 
    listUser: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);
            let query = {
                type: 2
            };
            let sort = {};

            if (req.query.search) {
                query.$or = [
                    { firstName: { $regex: req.query.search, $options: 'i' } },
                    { lastName: { $regex: req.query.search, $options: 'i' } },
                ];
            }

            if (req.query.sortBy) {
                sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
            }

            const { list, total } = await userRepo.list(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);
    
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        user: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages,
                    }
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },
    
    /**
     * This function return user detail by id
     * 
     * @param {string} req.params.id -The id of the user
     * @returns Return user detail by id
     */
    userDetail: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const userId = req.params.id;

            const userInfo = await userRepo.getDetail({ _id:userId });
            if (!userInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { userInfo }
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    /**
     * This function will delete user profile
     * 
     * @param {string} req.params.id -The id of the user
     * @returns Delete user detail by id
     */
    deleteUser: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            
            const userId = req.params.id;

            const deleteUser = await userRepo.deleteUser(userId);
            if (!deleteUser) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.USER_PROFILE_DELETE
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },
}