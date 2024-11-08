const reviewModel = require('../../../../models/review');

module.exports = {
    /**
     * List all review
     */
    list: async function (req, res, next) {
        try {
            const reviews = await reviewModel.find()
                .populate('userId', 'name') 
                .populate('productId', 'name');
            
            res.render('admin/review', {
                title: 'FootwearHub',
                reviews: reviews
            });
        } catch (error) {
            console.error('Error listing reviews:', error);
            next(error); 
        }
    }
};
