const addressModel = require('../../../../models/address');

module.exports = {
    /**
     * List all address
     */
    list: async function (req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1; 
            const itemsPerPage = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * itemsPerPage;

            const totalAddresses = await addressModel.countDocuments();

            const addresses = await addressModel.find()
                .populate('userId', 'firstName lastName')
                .skip(skip)
                .limit(itemsPerPage);

            const totalPages = Math.ceil(totalAddresses / itemsPerPage);

            res.render('admin/customerAddress', {
                title: 'FootwearHub',
                addresses,
                currentPage: page,
                totalPages,
                itemsPerPage
            });
        } catch (error) {
            console.error('Error listing addresses:', error);
            next(error);
        }
    },
};
