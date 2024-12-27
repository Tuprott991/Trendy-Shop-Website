const Feedback = require("../../models/index").Feedback;

exports.postCreateFeedBack = async (req, res) => {
    const { customer_id, retailer_id, product_id, rating, comment } = req.body;
    try {
        const feedback = await Feedback.createFeedBack(customer_id, retailer_id, product_id, rating, comment);
        res.status(201).json({
            message: "Feedback created successfully",
            feedback
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating feedback",
            error: error.message
        });
    }
};

exports.getFeedBackInformation = async (req, res) => {
    const { product_id } = req.params;
    try {
        const feedbacks = await Feedback.getFeedBackInformation(product_id);
        res.status(200).json({
            message: "Feedbacks retrieved successfully",
            feedbacks
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving feedbacks",
            error: error.message
        });
    }
};
