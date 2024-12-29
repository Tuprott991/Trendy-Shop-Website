const Feedback = require("../../models/feedbackModel");
const Product = require("../../models/productModel");

exports.getProductFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const feedbacks = await Feedback.getProductFeedback(id);
        res.status(200).json({
            feedbacks,
        });
    } catch (error) {
        console.error("Error getting feedback:", error);
        res.status(500).json({ message: "Error getting feedback", error });
    }
};

exports.postProductFeedback = async (req, res) => {
    try {
        const { customer_id, product_id, name, contact, email, rating, comment } =
            req.body;
        const product_info = await Product.GetProductInfo(product_id);
        const retailer_id = product_info.user_id;
        const feedback = await Feedback.create({
            customer_id,
            product_id,
            retailer_id,
            name,
            contact,
            email,
            rating,
            comment,
        });
        res.status(200).json({
            message: "Feedback created successfully",
            feedback,
        });
    } catch (error) {
        console.error("Error creating feedback:", error);
        res.status(500).json({ error: "Failed to create feedback" });
    }

};

exports.findfeedbackbyproductid = async(req, res) => {
    try {
        const { customer_id, product_id } = req.params;
        const feedback = await Feedback.findfeedbackbyproductid(customer_id, product_id);
        res.status(200).json({
            feedback,
        });
    } catch (error) {
        console.error("Error getting feedback:", error);
        res.status(500).json({ message: "Error getting feedback", error });
    }
};

exports.updateFeedback= async(req, res) => {
    try {
        const { id } = req.params;
        const { name, contact, email, rating, comment } = req.body;
        const feedback = await Feedback.updateFeedback(id, name, contact, email, rating, comment);
        res.status(200).json({
            feedback,
        });
    } catch (error) {
        console.error("Error updating feedback:", error);
        res.status(500).json({ message: "Error updating feedback", error });
    }
}