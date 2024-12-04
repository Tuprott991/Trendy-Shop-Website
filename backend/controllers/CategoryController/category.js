// controllers/CategoryController/category.js
const Category = require("../../models/index").Category;

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
    // Extract category and target from the request (e.g., req.query or req.params)
    const { category, target } = req.body; // or req.query if passed in query params

    // Check if category and target are provided
    if (!category || !target) {
      return res.status(400).json({ message: 'Category and target are required' });
    }

    // Find the category by category and target
    const categoryFound = await Category.findOne({ category, target });

    if (!categoryFound) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Return the category ID
    return res.status(200).json({ categoryId: categoryFound._id });
  } catch (error) {
    console.error('Error retrieving category ID:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};  

exports.getAllCategory = async (req, res) => {
  try {
    // Retrieve all categories
    const categories = await Category.find();

    // Map the categories to only include category and target
    const filteredCategories = categories.map(category => ({
      category: category.category,
      target: category.target
    }));

    // Return the filtered categories
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
    // Extract categoryId from the request body (or query params if needed)
    const { id } = req.body; // or req.query if passed in query params

    // Check if categoryId is provided
    if (!id) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    // Find the category by its ID (optional check, if needed)
    const categoryFound = await Category.findById(id);

    if (!categoryFound) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find all products associated with the category ID
    const products = await Product.find({ categoryId: id });

    // If no products are found
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    // Return the list of products
    return res.status(200).json({ products });
  } catch (error) {
    console.error('Error filtering products by category:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


