"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const productRepo = require("../../../../data-access/productRepo");
const imageMimeType = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

module.exports = {
    /**
     * This function will create a new product with the provided information
     *
     * @param {string} req.body.name -The name of the product
     * @param {string} req.body.categoryId -The id of the product category
     * @param {string} req.body.subCategoryId -The id of the product subCategory
     * @param {string} req.body.brandId -The id of the product brand
     * @param {number} req.body.price -The price of the product
     * @param {string} req.body.description -The description of the product
     * @param {string} req.body.image -Image of the product
     * @param {string} req.body.size -The size of the product
     * @param {string} req.body.color -The color of the product
     * @param {number} req.body.stock -The stock quantity of the product
     * @returns Product create and return new product id 
     */
    addProduct : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const productExist = await productRepo.getDetail({ name: req.body.name });
            if (productExist) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.PRODUCT_EXISTS
                    )
                );
            }

            if (!req.files || !req.files?.image) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.IMAGE_IS_REQUIRED
                    )
                )
            }

            if (!imageMimeType.includes(req.files.image.mimetype)) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.INVALID_IMAGE_TYPE
                    )
                )
            }

            const productImage = await services.imageUpload(req.files.image, "product-image")
            const productDetail = {
                name: req.body.name,
                categoryId: req.body.categoryId,
                subCategoryId: req.body.subCategoryId,
                brandId: req.body.brandId,
                price: req.body.price,
                description: req.body.description,
                image: productImage,
                size: req.body.size,
                color: req.body.color,
                stock: req.body.stock,
            };
            
            const newProduct = await productRepo.create(productDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.PRODUCT_CREATED,
                    { id: newProduct.id }
                )
            );

        } catch(error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    /**
     * This function will list of all product
     * 
     * @param {string} req.query.search -The search term
     * @param {number} req.query.page -The page number
     * @param {number} req.query.perPage -The number of record per page
     * @returns Return all product list
     */
    listProduct : async function (req,res) {
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

            const { list, total } = await productRepo.list(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        product: list,
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
     * This function will return product detail by id
     * 
     * @param {string} req.params.id -The id of the product
     * @return Return product detail by id
     */
    productDetail : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const productId = req.params.id;

            const productInfo = await productRepo.getDetail({ _id:productId });
            if (!productInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.PRODUCT_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { productInfo }
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
     * This function will update a product with the provided information
     * 
     * @param {string} req.params.id -The id of the product
     * @param {string} req.body.name -The name of the product
     * @param {string} req.body.categoryId -The id of the product category
     * @param {string} req.body.subCategoryId -The id of the product subCategory
     * @param {string} req.body.brandId -The id of the product brand.
     * @param {number} req.body.price -The price of the product
     * @param {string} req.body.description -The description of the product
     * @param {string} req.body.image -Image of the product
     * @param {string} req.body.size -The size of the product
     * @param {string} req.body.color -The color of the product
     * @param {number} req.body.stock -The stock quantity of the product
     * @returns Update product and return new product id
     */
    updateProduct: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
    
            const productId = req.params.id;

            const existProduct = await productRepo.getDetail({ _id:productId });
            if (!existProduct) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.PRODUCT_NOT_FOUND
                    )
                );
            }
    
            let productImage = existProduct.image;
            if (req.files && req.files.image) {
                if (!imageMimeType.includes(req.files.image.mimetype)) {
                    return res.send(
                        services.prepareResponse(
                            HttpStatus.BAD_REQUEST,
                            Msg.INVALID_IMAGE_TYPE
                        )
                    );
                }
                if (productImage) await services.deleteImage(productImage);
                productImage = await services.imageUpload(req.files.image, 'product-image');
            }
    
            const productDetail = {
                name: req.body.name,
                categoryId: req.body.categoryId,
                subCategoryId: req.body.subCategoryId,
                brandId: req.body.brandId,
                price: req.body.price,
                description: req.body.description,
                image: productImage,
                size: req.body.size,
                color: req.body.color,
                stock: req.body.stock,
            };
    
            const updatedProduct = await productRepo.update(productId, productDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.PRODUCT_UPDATED,
                    { id: updatedProduct.id }
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
     * This function will delete product by Id
     * 
     * @param {string} req.params.id -The id of the product
     * @return Delete product by id
     */
    deleteProduct : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            
            const productId = req.params.id;

            const deleteProduct = await productRepo.deleteProduct(productId);
            if (!deleteProduct) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.PRODUCT_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.PRODUCT_DELETED,
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