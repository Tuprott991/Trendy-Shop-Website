const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    category: { type: String, required: true },
    target: { type: String, required: true },
  },
  {
    timestamps: true,
    statics: {
      createCategory: async function (category, target) {
        const existingCategory = await this.findOne({ category, target });

        if (!existingCategory) {
          const newCategory = new this({
            category,
            target,
          });

          // Save the category into MongoDB
          await newCategory.save();
          console.log(`Added category: ${category} with target: ${target}`);

          return newCategory;
        } else {
          throw new Error('Category already exists for this target');
        }
      },
      filterCategories: async function () {
        const categories = await this.find();
        return categories.map((category) => ({
          id: category._id,
          category: category.category,
          target: category.target,
        }));
      },
      getCategoryID: async function (category, target) {
        let categoryDoc = await this.findOne({ category, target });

        if (!categoryDoc) {
          categoryDoc = await this.createCategory(category, target);
        }

        return categoryDoc._id;
      },
    },
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
