const categoryModel = require('../../../../models/category');
const { HttpStatus } = require("../../../../errors/code");
const Msg = require("../../../../helpers/localization");
const Service = require("../../../../helpers/index");

module.exports = {
    /**
     * List all category
     */
    list: async function (req, res, next) {
        try {
            const searchQuery = req.query.search || '';
            const page = parseInt(req.query.page) || 1; 
            const itemsPerPage = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * itemsPerPage;

            const query = searchQuery ? { name: { $regex: searchQuery, $options: 'i' } } : {};
    
            const totalCategories = await categoryModel.countDocuments(query);
    
            const categories = await categoryModel.find(query)
                .skip(skip)
                .limit(itemsPerPage);
    
            const totalPages = Math.ceil(totalCategories / itemsPerPage);
    
            res.render('admin/category', {
                title: 'FootwearHub',
                categories,
                currentPage: page,
                totalPages,
                itemsPerPage,
                searchQuery
            });
    
        } catch (error) {
            console.error('Error listing categories:', error);
            next(error); 
        }
    },
    

    /**
     * Add new category
     */
    add: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }

            const { name } = req.body;

            const categoryExist = await categoryModel.findOne({ name }).exec();
            if (categoryExist) {
                return res.status(HttpStatus.BAD_REQUEST).send({ 'message': Msg.CATEGORY_EXISTS });
            }

            const newCategory = new categoryModel({ name });
            await newCategory.save();

            return res.redirect('/admin/category',);
        } catch (error) {
            console.error('Error adding category:', error);
            next(error);
        }
    },
    
    /**
     * Edit category
     */
    edit: async function (req, res, next) {
        try {
            const { id } = req.params;

            const category = await categoryModel.findById(id).exec();
            if (!category) {
                return res.status(HttpStatus.NOT_FOUND).send({ 'message': Msg.CATEGORY_NOT_FOUND });
            }

            return res.render('admin/updateCategory', { category });
        } catch (error) {
            console.error('Error fetching category for editing:', error);
            next(error);
        }
    },

    /**
     * Update category
     */
    update: async function (req, res, next) {
        try {
            const { id } = req.params;   
            const { name, isActive } = req.body; 
    
            if (!name) {
                return res.status(HttpStatus.BAD_REQUEST).send({ "message": Msg.CATEGORY_NAME_REQUIRED });
            }
    
            const category = await categoryModel.findById(id).exec();
            if (!category) {
                return res.status(HttpStatus.NOT_FOUND).send({ "message": Msg.CATEGORY_NOT_FOUND });
            }

            category.name = name;
            category.isActive = isActive === 'true'; 
    
            await category.save(); 
            res.redirect('/admin/category');
        } catch (error) {
            console.error('Error updating category:', error);
            next(error);
        }
    },

    /**
     * Delete category
     */
    delete: async function (req, res, next) {
        try {
            const { id } = req.params;
            
            const category = await categoryModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    
            if (!category) {
                return res.status(HttpStatus.NOT_FOUND).send({ 'message': Msg.CATEGORY_NOT_FOUND });
            }
    
            return res.redirect('/admin/category');
        } catch (error) {
            console.error('Error deactivating category:', error);
            next(error);
        }
    } 
};
