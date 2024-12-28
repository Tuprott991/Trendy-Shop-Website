const Feedback = require('../../models/feedbackModel');

// exports.createFeedback = async (req, res) => {
//     try{
//         const {product_id}= req.product;
//         const{retailer_id}= req.retailer;
//         const {name,contact,email,rating,comment,}
//     }

exports.getProductFeedback= async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const feedbacks = await Feedback.getProductFeedback(id);
        
        res.status(200).json({
            feedbacks
        });
    } catch (error) {
        console.error("Error getting feedback:", error);
        res.status(500).json({ message: 'Error getting feedback', error });
    }
}
