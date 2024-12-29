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
      async updateQuantity(productID, stock_quantity) {
        if (typeof stock_quantity === "undefined") {
          throw new Error("Stock quantity is required");
        }
  
        const updatedProduct = await this.findByIdAndUpdate(
          productID,
          { $set: { stock_quantity } },
          { new: true, runValidators: true }
        );
  
        if (!updatedProduct) {
          throw new Error("Product not found");
        }
        return updatedProduct;
      },
  
      async updProduct(productID, name, description, price, user_id, category_id, size, stock_quantity, rating, image_url) {
        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (user_id) updateData.user_id = user_id;
        if (category_id) updateData.category_id = category_id;
        if (size) updateData.size = size;
        if (stock_quantity) updateData.stock_quantity = stock_quantity;
        if (rating) updateData.rating = rating;
        if (image_url) updateData.image_url = image_url;
  
        const updatedProduct = await this.findByIdAndUpdate(
          productID,
          { $set: updateData },
          { new: true, runValidators: true }
        );
  
        if (!updatedProduct) {
          throw new Error("Product not found");
        }
        return updatedProduct
      }
    
  }});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;