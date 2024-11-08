"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const subCategoryRepo = require("../../../../data-access/subCategoryRepo");

module.exports = {
    /**
    * This function will list of all subCategory
    * 
    * @param {string} req.query.search -The search term
    * @param {number} req.query.page -The page number
    * @param {number} req.query.perPage -The number of record per page
    * @returns Return All subCategory
    */
    listSubCategory : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);
            let query = {};
            let sort = {};

            if (req.query.search) {
                query.$or = [
                    { name: { $regex: req.query.search, $options: 'i' } },
                ];
            }

            if (req.query.sortBy) {
                sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
            }

            const { list, total } = await subCategoryRepo.list(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        subCategory: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages,
                    }
                )
            );

        } catch (error){
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    /**
     * This function will return subCategory detail by id
     * 
     * @param {string} req.params.id -The id of the subCategory
     * @return Return subCategory detail by id
     */
    subCategoryDetail : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const subCategoryId = req.params.id;
            
            const subCategoryInfo = await subCategoryRepo.getDetail({ _id:subCategoryId });
            if (!subCategoryInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.SUB_CATEGORY_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { subCategoryInfo }
                )
            );
            
        } catch (error){
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },
}