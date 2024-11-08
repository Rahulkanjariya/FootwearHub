"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const categoryRepo = require("../../../../data-access/categoryRepo");

module.exports = {
    /**
    * This function will create a new category with the provided information
    * 
    * @param {string} req.body.name -The name of the category
    * @returns Category create and return new category id
    */
    addCategory : async function (req,res){
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            
            const categoryExist = await categoryRepo.getDetail({ name: req.body.name });
            if (categoryExist) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.CATEGORY_EXISTS
                    )
                );
            }

            const categoryDetail = {
                name: req.body.name,
            };

            const newCategory = await categoryRepo.create(categoryDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.CATEGORY_CREATED,
                    { id: newCategory.id }
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
    * This function will list of all category
    * 
    * @param {string} req.query.search -The search term
    * @param {number} req.query.page -The page number
    * @param {number} req.query.perPage -The number of record per page
    * @returns Return All category
    */ 
    listCategory : async function (req,res) {
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

            const { list, total } = await categoryRepo.list(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        category: list,
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
     * This function will return category detail by id
     * 
     * @param {string} req.params.id -The id of the category
     * @returns Return category detail by id
     */
    categoryDetail : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const categoryId = req.params.id;

            const categoryInfo = await categoryRepo.getDetail({ _id:categoryId });
            if (!categoryInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.CATEGORY_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { categoryInfo }
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
     * This function will update a category with the provided information
     * 
     * @param {string} req.params.id -The id of the category
     * @param {string} req.body.name -The name of the category
     * @returns Update category and return new id
     */
    updateCategory : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const categoryId = req.params.id;

            const existCategory = await categoryRepo.getDetail({ _id:categoryId });
            if (!existCategory) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.CATEGORY_NOT_FOUND
                    )
                );
            }

            const categoryDetail = {
                name: req.body.name,
            };
            
            const updatedCategory = await categoryRepo.update(categoryId,categoryDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.CATEGORY_UPDATED,
                    { id: updatedCategory.id }
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
     * This function will delete category by id
     * 
     * @param {string} req.params.id -The id of the category
     * @returns Delete category by id
     */
    deleteCategory : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const categoryId = req.params.id;

            const deleteCategory = await categoryRepo.deleteCategory(categoryId);
            if (!deleteCategory) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.CATEGORY_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.CATEGORY_DELETED
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