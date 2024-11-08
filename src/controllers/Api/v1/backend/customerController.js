const Msg = require("../../../../helpers/localization");
const customerModel = require("../../../../models/auth");

module.exports = {
    /**
     * List all customer
     */
    list: async function (req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const itemsPerPage = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * itemsPerPage;
    
            // Get search query from the request
            const searchQuery = req.query.search || '';
    
            const searchCriteria = { type: 2 };
            if (searchQuery) {
                searchCriteria.$or = [
                    { firstName: { $regex: searchQuery, $options: 'i' } },
                    { lastName: { $regex: searchQuery, $options: 'i' } },
                    { email: { $regex: searchQuery, $options: 'i' } }
                ];
            }

            const totalCustomers = await customerModel.countDocuments(searchCriteria);
            const customers = await customerModel.find(searchCriteria)
                .skip(skip)
                .limit(itemsPerPage);
    
            const totalPages = Math.ceil(totalCustomers / itemsPerPage);
    
            res.render('admin/customer', {
                title: 'FootwearHub',
                customers,
                currentPage: page,
                totalPages,
                itemsPerPage,
                searchQuery
            });
        } catch (error) {
            console.error('Error listing customers:', error);
            next(error);
        }
    },    

    /**
     * Delete customer
     */
    delete: async function (req,res,next) {
        try {
            const { id } = req.params;
            const customer = await customerModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
            if (!customer) {
                return res.status(HttpStatus.NOT_FOUND).send({ 'message': Msg.USER_NOT_FOUND });
            }
            res.redirect('/admin/customer');
        } catch (error) {
            console.error('Error deleting customer:', error);
            next(error);
        }
    }
}
