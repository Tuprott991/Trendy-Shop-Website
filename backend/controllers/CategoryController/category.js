// controllers/CategoryController/category.js
const Category = require("../../models/index").Category;
const Product = require("../../models/index").Product;
exports.createCate = async (req, res) => {
  try {
    // Extract category and target from the request body (or params, if needed)
    const { category, target } = req.body; // assuming these are sent in the request body

    // Check if category and target are provided in the request
    if (!category || !target) {
      return res.status(400).json({ message: 'Category and target are required' });
    }

    // Check if category already exists in the database for the given target
    const existingCategory = await Category.findOne({ category, target });

    if (!existingCategory) {
      // Create a new category if it doesn't exist
      const newCategory = new Category({
        category,
        target
      });

      // Save the category into MongoDB
      await newCategory.save();
      console.log(`Added category: ${category} with target: ${target}`);

      return res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } else {
      return res.status(400).json({ message: 'Category already exists for this target' });
    }
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getId = async (req, res) => {
  try {
    
    const { category, target } = req.body; 

    if (!category || !target) {
      return res.status(400).json({ message: 'Category and target are required' });
    }

    const categoryFound = await Category.findOne({ category, target });

    if (!categoryFound) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ categoryId: categoryFound._id });
  } catch (error) {
    console.error('Error retrieving category ID:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};  

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    const filteredCategories = categories.map(category => ({
      category: category.category,
      target: category.target
    }));

    res.status(200).send(
      filteredCategories
    );
  } catch (error) {
    res.status(500).send(
      'Error retrieving categories'
    );
  }
};



exports.filterCategory = async (req, res) => {
  try {
    
    const { id } = req.params; 
    
    if (!id) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    
    const categoryFound = await Category.findById(id);

    if (!categoryFound) {
      return res.status(404).json({ message: 'Category not found' });
    }

    
    const products = await Product.find({ categoryId: id });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    return res.status(200).json({ products });
  } catch (error) {
    console.error('Error filtering products by category:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


