const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  size: { type: String, required: false },
  stock_quantity: { type: Number, default: 0 },
  rating: { type: Number, default: 0.0, max: 5.0 },
  image_url: { type: String }
},
  {
    timestamps: true,
    statics: {
      async SearchProduct(name) {
        const regex = new RegExp('\\b' + name + '\\b', 'i');
        const productInfo = await Product.find({ name: { $regex: regex } });
        return productInfo;
      },
      async GetProductInfo(productID) {
        const productInfo = await Product.findById(productID);
        return productInfo
      },
      async SaveProduct(product) {
        await product.save();
      },
      async delete(productID) {
        try {
          if (!productID) {
            throw new Error("ProductID is required");
          }

          const deletedProduct = await this.findByIdAndDelete(productID);

          if (!deletedProduct) {
            throw new Error("Product not found");
          }

          return { message: "Product deleted successfully", product: deletedProduct };
        } catch (error) {
          throw new Error(`Failed to delete product: ${error.message}`);
        }
      },
      async getAllProduct() {
        try {
          const product = await this.find();
          return product;
        }
        catch (error) {
          console.error('Error get all product:', error);
          throw new Error('failed to get all product');
        }
      },

    
  }});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;