"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const wishlistRepo = require("../../../../data-access/wishlistRepo");

module.exports = {
    /**
     * This function is use for Add a product to the user's wishlist
     * 
     * @param {string} req.body.userId -The id of the user adding to wishlist
     * @param {string} req.body.productId -The id of the product being added
     * @returns Wishlist create and return new wishlist id
     */
    addToWishList : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const wishlistDetail = {
                userId: req.body.userId,
                productId: req.body.productId,
            };

            const newWishlist = await wishlistRepo.create(wishlistDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.ITEM_ADDED_TO_WISHLIST,
                    { id: newWishlist.id }
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
    * This function will list of all wishlist item
    * 
    * @param {number} req.query.page -The page number
    * @param {number} req.query.perPage -The number of record per page
    * @returns Return all wishlist
    */
    listWishlist : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            const { perPage, page, skip } = services.parsePagination(req.query);
            const { list, total } = await wishlistRepo.list(skip, perPage);
            const totalPages = Math.ceil(total / perPage);
            
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        wishList: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages

                    }
                )
            )

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
     * This function is use for remove a product from the user's wishlist
     * 
     * @param {string} req.params.id -The id of the wishlist item to be removed
     * @returns Remove product from the wishlist
     */
    removeWishlist: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const wishistId = req.params.id;

            const wishlistInfo = await wishlistRepo.removeWishlist(wishistId);
            if (!wishlistInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.WISHLIST_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.ITEM_REMOVED_FROM_WISHLIST
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
