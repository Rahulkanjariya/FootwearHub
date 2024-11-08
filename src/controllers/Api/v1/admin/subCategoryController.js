"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const subCategoryRepo = require("../../../../data-access/subCategoryRepo");

module.exports = {
    /**
    * This function will create a new subCategory with the provided information
    * 
    * @param {string} req.body.name -The name of the subCategory
    * @param {string} req.body.categoryId -The id of the category
    * @returns subCategory create and return new subCategory id
    */
    addSubCategory : async function (req,res){
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const subCategoryExist = await subCategoryRepo.getDetail({ name: req.body.name });
            if (subCategoryExist) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.SUB_CATEGORY_EXISTS
                    )
                );
            }
            
            const subCategoryDetail = {
                name: req.body.name,
                categoryId: req.body.categoryId
            };

            const newSubCategory = await subCategoryRepo.create(subCategoryDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.SUB_CATEGORY_CREATED,
                    { id: newSubCategory.id }
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
    * This function will list of all sub category
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
     * @returns Return subCategory detail by id
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

    /**
     * This function will update a subCategory with the provided information
     * 
     * @param {string} req.params.id -The id of the subCategory
     * @param {string} req.body.name -The name of the category
     * @param {string} req.body.categoryId -The id of the category
     * @returns Update subCategory and return new id
     */
    updateSubCategory : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const subCategoryId = req.params.id;

            const existSubCategory = await subCategoryRepo.getDetail({ _id:subCategoryId });
            if (!existSubCategory) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.SUB_CATEGORY_NOT_FOUND
                    )
                );
            }
            
            const subCategoryDetail = {
                name: req.body.name,
                categoryId: req.body.categoryId
            };

            const updatedSubCategory = await subCategoryRepo.update(subCategoryId,subCategoryDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUB_CATEGORY_UPDATED,
                    { id: updatedSubCategory.id }
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
     * This function will delete subCategory by id
     * 
     * @param {string} req.params.id -The id of the subCategory
     * @returns Delete subCategory by id
     */
    deleteSubCategory : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const subCategoryId = req.params.id;

            const deleteSubCategory = await subCategoryRepo.deleteSubCategory(subCategoryId);
            if (!deleteSubCategory) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.SUB_CATEGORY_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.SUB_CATEGORY_DELETED
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
    }
}