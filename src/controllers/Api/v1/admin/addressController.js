"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const addressRepo = require("../../../../data-access/addressRepo");

module.exports = {
    /**
     * This function will list of all user address
     * 
     * @param {string} req.query.search -The search term
     * @param {number} req.query.page -The page number
     * @param {number} req.query.perPage -The number of record per page
     * @returns Return all user List
     */
    listAddress : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);
            let query = {};

            if (req.query.search) {
                query.$or = [
                    { city: { $regex: req.query.search, $options: 'i' } },
                    { state: { $regex: req.query.search, $options: 'i' } },
                ];
            }

            const { list, total } = await addressRepo.list(query, skip, perPage);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        address: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages
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
     * This function will detail of user address by id 
     * 
     * @param {string} req.params.id -The user address id
     * @return Return user address by id
     * */
    addressDetail : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const addressId = req.params.id;
            const address = await addressRepo.getDetail({ _id:addressId });

            if (!address) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_ADDRESS_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { address }
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