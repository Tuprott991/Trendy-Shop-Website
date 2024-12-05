// controllers/ProductController/product.js
const mongoose = require('mongoose'); // Import mongoose
const Product = require("../../models/index").Product;

exports.importProduct = async (req, res) => {
    try {

        const {name_pro,description_pro,price_pro,size_pro,stock_quantity_pro,rating_pro,link_img,user_id_pro,category_id_pro} = req.body
        
        const product = new Product({
            name: name_pro,
            description: description_pro,
            price: price_pro,
            size: size_pro,
            stock_quantity: stock_quantity_pro,
            rating: rating_pro,
            image_url: link_img, // Assuming 'link' is the image URL
            user_id: mongoose.Types.ObjectId(user_id_pro), // Convert user_id to ObjectId
            category_id: mongoose.Types.ObjectId(category_id_pro) // Convert category_id to ObjectId
        });

            // Save the product to the database
            await product.save();

        res.status(200).json({ message: 'Products imported successfully!' });
    } catch (error) {
        console.error("Error importing products:", error);
        res.status(500).json({ message: 'Error importing products', error });
    }
};

exports.SearchProduct = async (req, res) => {
    try {
        const {keyword} = req.params;
        const productInfo = await Product.SearchProduct(keyword);
        res.status(200).json({ 
            productInfo
        });
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: 'Error searching products', error });
    }
}





