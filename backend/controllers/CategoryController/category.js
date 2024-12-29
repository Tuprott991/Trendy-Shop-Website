// controllers/CategoryController/category.js
const Category = require("../../models/index").Category;
const Product = require("../../models/index").Product;

exports.postcreateCate = async (req, res) => {
  try {
    const { category, target } = req.body; 
    
    if (!category || !target) {
      return res.status(400).json({ message: 'Category and target are required' });
    }

    try {
      const newCategory = await Category.createCategory(category, target);
      return res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } catch (error) {-
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
    const filteredCategories = await Category.filterCategories();
    res.status(200).send(filteredCategories);
  } catch (error) {
    res.status(500).send('Error retrieving categories');
  }
};


exports.getFilterCategory = async (req, res) => {
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


