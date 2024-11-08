const SubcategoryModel = require('../../../../models/subCategory');
const CategoryModel = require('../../../../models/category');
const { HttpStatus } = require("../../../../errors/code");
const Msg = require("../../../../helpers/localization");
const Service = require("../../../../helpers/index");

module.exports = {
    /**
     * List all subcategory
     */
    list: async function (req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const itemsPerPage = parseInt(req.query.limit) || 10;
            const searchQuery = req.query.search || '';

            const searchCriteria = searchQuery 
                ? { 
                    $or: [
                        { name: { $regex: searchQuery, $options: 'i' } },
                        { 'categoryId.name': { $regex: searchQuery, $options: 'i' } }
                    ]
                  } 
                : {};
    
            const totalSubcategories = await SubcategoryModel.countDocuments(searchCriteria);
            const skip = (page - 1) * itemsPerPage;

            const subcategories = await SubcategoryModel.find(searchCriteria)
                .populate('categoryId', 'name')
                .skip(skip)
                .limit(itemsPerPage)
                .exec();
    
            const totalPages = Math.ceil(totalSubcategories / itemsPerPage);
    
            return res.render('admin/subCategory', {
                title: 'FootwearHub',
                subcategories,
                currentPage: page,
                totalPages,
                itemsPerPage,
                searchQuery 
            });
        } catch (error) {
            console.error('Error listing subcategories:', error);
            next(error);
        }
    },
    
    
    /**
     * Show add subcategory form
    */
    addForm: async function (req, res, next) {
        try {
            const categories = await CategoryModel.find().exec();
            return res.render('admin/addsubCategory', { categories });
        } catch (error) {
            console.error('Error displaying add subcategory form:', error);
            next(error);
        }
    },

    /**
     * Add a new subcategory
     */
    add: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }

            const { name, categoryId } = req.body;

            const categoryExist = await CategoryModel.findById(categoryId).exec();
            if (!categoryExist) {
                return res.status(HttpStatus.BAD_REQUEST).send({ 'message': Msg.CATEGORY_NOT_FOUND });
            }

            const subcategoryExist = await SubcategoryModel.findOne({ name, categoryId }).exec();
            if (subcategoryExist) {
                return res.status(HttpStatus.BAD_REQUEST).send({ 'message': Msg.SUB_CATEGORY_EXISTS });
            }

            const newSubcategory = new SubcategoryModel({
                name,
                categoryId
            });
            await newSubcategory.save();
            return res.redirect('/admin/subCategory');
        } catch (error) {
            console.error('Error adding subcategory:', error);
            next(error);
        }
    },

    /**
     * Edit subcategory detail
     */
    edit: async function (req, res, next) {
        try {
            const { id } = req.params;
            const subcategory = await SubcategoryModel.findById(id).exec();
            if (!subcategory) {
                return res.status(404).send({ 'message': Msg.SUB_CATEGORY_NOT_FOUND });
            }

            const categories = await CategoryModel.find().exec();
            return res.render('admin/updateSubCategory', { subcategory, categories });
        } catch (error) {
            console.error('Error showing edit subcategory form:', error);
            next(error);
        }
    },

    /**
     * Update subcategory detail
     */
    update: async function (req, res, next) {
        try {
            const { id } = req.params;
            const { name, category } = req.body;

            if (!name || !category) {
                return res.status(400).send({ 'message': Msg.SUB_CATEGORY_NAME_REQUIRED });
            }

            const subcategory = await SubcategoryModel.findById(id).exec();
            if (!subcategory) {
                return res.status(404).send({ 'message': 'Subcategory not found' });
            }

            subcategory.name = name;
            subcategory.categoryId = category;
            await subcategory.save();

            return res.redirect('/admin/subCategory');
        } catch (error) {
            console.error('Error updating subcategory:', error);
            next(error);
        }
    },

    /**
     * Delete a subcategory
     */
    delete: async function (req, res, next) {
        try {
            const { id } = req.params;
    
            const subcategory = await SubcategoryModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    
            if (!subcategory) {
                return res.status(HttpStatus.NOT_FOUND).send({ 'message': Msg.SUB_CATEGORY_NOT_FOUND });
            }
    
            return res.redirect('/admin/subCategory');
        } catch (error) {
            console.error('Error deleting subcategory:', error);
            next(error);
        }
    }
};
