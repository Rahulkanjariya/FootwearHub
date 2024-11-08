const CategoryModel = require('../../../../models/category');
const SubcategoryModel = require('../../../../models/subCategory');
const BrandModel = require('../../../../models/brand');
const ProductModel = require('../../../../models/product'); 
const { HttpStatus } = require("../../../../errors/code");
const Msg = require("../../../../helpers/localization");
const Service = require("../../../../helpers/index");
const path = require('path');
const fs = require('fs');

module.exports = {
    /**
     * List all products
     */
    list: async function (req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const itemsPerPage = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * itemsPerPage;
    
            const totalProducts = await ProductModel.countDocuments();
            const products = await ProductModel.find()
                .skip(skip)
                .limit(itemsPerPage);

            const totalPages = Math.ceil(totalProducts / itemsPerPage);

            res.render('admin/product', {
                title: 'FootwearHub',
                products,
                currentPage: page,
                totalPages,
                itemsPerPage
            });
        } catch (error) {
            console.error('Error listing products:', error);
            next(error);
        }
    },

    /**
     * Render add product form
     */
    addForm: async function (req, res, next) {
        try {
            const categories = await CategoryModel.find().exec();
            const subcategories = await SubcategoryModel.find().exec();
            const brands = await BrandModel.find().exec();
    
            // Log the fetched data
            console.log('Categories:', categories);
            console.log('Subcategories:', subcategories);
            console.log('Brands:', brands);
            
            return res.render('admin/addProduct', { 
                title: 'FootwearHub', 
                categories, 
                subcategories, 
                brands 
            });
        } catch (error) {
            console.error('Error displaying add product form:', error);
            next(error);
        }
    },
    
    /**
     * Add new product
     */
    add: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
    
            const { name, categoryId, subCategoryId, brandId, price, description, size, color, stock } = req.body;
            let image = '';
    
            const uploadDir = path.join(__dirname, '../../../../uploads/product-images');
    
            // Check if the directory exists, if not, create it recursively
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
    
            if (req.files && req.files.image) {
                const productImage = req.files.image;
                image = productImage.name;
    
                const filePath = path.join(uploadDir, image);
    
                // Check if file already exists
                if (fs.existsSync(filePath)) {
                    return res.status(HttpStatus.BAD_REQUEST).send({ 'message': Msg.FILE_ALREADY_EXISTS });
                }
                await productImage.mv(filePath);
            }
    
            const productExist = await ProductModel.findOne({ name }).exec();
            if (productExist) {
                return res.status(HttpStatus.BAD_REQUEST).send({ 'message': Msg.PRODUCT_EXISTS });
            }
    
            const newProduct = new ProductModel({
                name,
                categoryId,      
                subCategoryId,   
                brandId,         
                price,
                description,
                image,
                size,
                color,
                stock,            });
            await newProduct.save();
    
            return res.redirect('/admin/product');
        } catch (error) {
            console.error('Error adding product:', error);
            next(error);
        }
    },
    

    /**
     * Edit product
     */
    edit: async function (req, res, next) {
        try {
            const { id } = req.params;

            const product = await ProductModel.findById(id).exec();
            if (!product) {
                return res.status(HttpStatus.NOT_FOUND).send({ 'message': Msg.PRODUCT_NOT_FOUND });
            }

            return res.render('admin/updateProduct', { product });
        } catch (error) {
            console.error('Error fetching product for editing:', error);
            next(error);
        }
    },

    /**
     * Update product
     */
    update: async function (req, res, next) {
        try {
            const { id } = req.params;
            const { name, category, subcategory, brand, price, description, size, color, stock, isActive } = req.body;
            let image = req.body.image;
    
            const product = await ProductModel.findById(id).exec();
            if (!product) {
                return res.status(HttpStatus.NOT_FOUND).send({ "message": Msg.PRODUCT_NOT_FOUND });
            }

            if (req.files && req.files.image) {
                if (product.image) {
                    const existingImagePath = path.join(__dirname, '../../../../uploads/product-images', product.image);
                    if (fs.existsSync(existingImagePath)) {
                        fs.unlinkSync(existingImagePath);
                    }
                }
    
                const productImage = req.files.image;
                image = productImage.name;
    
                const uploadDir = path.join(__dirname, '../../../../uploads/product-images');

                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
    
                const newImagePath = path.join(uploadDir, image);
    
                if (fs.existsSync(newImagePath)) {
                    return res.status(HttpStatus.BAD_REQUEST).send({ 'message': Msg.FILE_ALREADY_EXISTS });
                }
    
                await productImage.mv(newImagePath);
            }
            
            product.name = name;
            product.category = category;
            product.subcategory = subcategory;
            product.brand = brand;
            product.price = price;
            product.description = description;
            product.size = size;
            product.color = color;
            product.stock = stock;
            product.isActive = isActive;
            product.image = image;
    
            await product.save();
            res.redirect('/admin/product');
        } catch (error) {
            console.error('Error updating product:', error);
            next(error);
        }
    },

    /**
     * Delete product
     */
    delete: async function (req, res, next) {
        try {
            const { id } = req.params;

            const product = await ProductModel.findByIdAndDelete(id);
            if (!product) {
                return res.status(HttpStatus.NOT_FOUND).send({ 'message': Msg.PRODUCT_NOT_FOUND });
            }

            if (product.image) {
                fs.unlinkSync(path.join(__dirname, '../../../../uploads/product-images', product.image));
            }

            return res.redirect('/admin/product');
        } catch (error) {
            console.error('Error deleting product:', error);
            next(error);
        }
    }
};
