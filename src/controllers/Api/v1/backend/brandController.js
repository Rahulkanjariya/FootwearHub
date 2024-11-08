const BrandModel = require('../../../../models/brand');
const { HttpStatus } = require("../../../../errors/code");
const Msg = require("../../../../helpers/localization");
const Service = require("../../../../helpers/index");
const path = require('path');
const fs = require('fs');

module.exports = {
    /**
     * List all brand
     */
    list: async function (req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const itemsPerPage = parseInt(req.query.limit) || 10;
            const searchQuery = req.query.search || '';
            const skip = (page - 1) * itemsPerPage;
    
            // Define the filter based on the search query
            const filter = searchQuery
                ? { name: { $regex: searchQuery, $options: 'i' } }
                : {};
    
            const totalBrands = await BrandModel.countDocuments(filter);
            const brands = await BrandModel.find(filter)
                .skip(skip)
                .limit(itemsPerPage);
    
            const totalPages = Math.ceil(totalBrands / itemsPerPage);
    
            res.render('admin/brand', {
                title: 'FootwearHub',
                brands,
                currentPage: page,
                totalPages,
                itemsPerPage,
                searchQuery
            });
        } catch (error) {
            console.error('Error listing brands:', error);
            next(error);
        }
    },    
    
    /**
     * Add new brand
     */
    add: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
    
            const { name } = req.body;
            let image = '';

            const uploadDir = path.join(__dirname, '../../../../uploads/brand-logo');

            // Check if the directory exists, if not, create it recursively
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
    
            if (req.files && req.files.image) {
                const brandImage = req.files.image;
                image = brandImage.name;
    
                const filePath = path.join(uploadDir, image);

                // Check if file already exists
                if (fs.existsSync(filePath)) {
                    return res.status(HttpStatus.BAD_REQUEST).send({ 'message': Msg.FILE_ALREADY_EXISTS });
                }
                await brandImage.mv(filePath);
            }

            const brandExist = await BrandModel.findOne({ name }).exec();
            if (brandExist) {
                return res.status(HttpStatus.BAD_REQUEST).send({ 'message': Msg.BRAND_EXISTS });
            }

            const newBrand = new BrandModel({ name, image });
            await newBrand.save();
    
            return res.redirect('/admin/brand');
        } catch (error) {
            console.error('Error adding brand:', error);
            next(error);
        }
    },

    /**
     * Edit brand
     */
    edit: async function (req, res, next) {
        try {
            const { id } = req.params;

            const brand = await BrandModel.findById(id).exec();
            if (!brand) {
                return res.status(HttpStatus.NOT_FOUND).send({ 'message': Msg.BRAND_NOT_FOUND });
            }

            return res.render('admin/updateBrand', { brand });
        } catch (error) {
            console.error('Error fetching brand for editing:', error);
            next(error);
        }
    },

    /**
     * Update brand
     */
    update: async function (req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            let image = req.body.image;
    
            const brand = await BrandModel.findById(id).exec();
            if (!brand) {
                return res.status(HttpStatus.NOT_FOUND).send({ "message": Msg.BRAND_NOT_FOUND });
            }

            if (req.files && req.files.image) {
                if (brand.image) {
                    const existingImagePath = path.join(__dirname, '../../../../uploads/brand-logo', brand.image);
                    if (fs.existsSync(existingImagePath)) {
                        fs.unlinkSync(existingImagePath);
                    }
                }
    
                const brandImage = req.files.image;
                image = brandImage.name;
    
                const uploadDir = path.join(__dirname, '../../../../uploads/brand-logo');

                // Ensure the uploads directory exists
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
    
                const newImagePath = path.join(uploadDir, image);
    
                if (fs.existsSync(newImagePath)) {
                    return res.status(HttpStatus.BAD_REQUEST).send({ 'message': Msg.FILE_ALREADY_EXISTS });
                }
    
                await brandImage.mv(newImagePath);
            }
            
            brand.name = name;
            brand.image = image;
    
            await brand.save();
            res.redirect('/admin/brand');
        } catch (error) {
            console.error('Error updating brand:', error);
            next(error);
        }
    },

    /**
     * Delete brand
     */
    delete: async function (req, res, next) {
        try {
            const { id } = req.params;

            const brand = await BrandModel.findByIdAndDelete(id);
            if (!brand) {
                return res.status(HttpStatus.NOT_FOUND).send({ 'message': Msg.BRAND_NOT_FOUND });
            }

            if (brand.image) {
                fs.unlinkSync(path.join(__dirname, '../../../../uploads/brand-logo', brand.image));
            }

            return res.redirect('/admin/brand');
        } catch (error) {
            console.error('Error deleting brand:', error);
            next(error);
        }
    }
};
