const Category = require("../../models/models").Category;

exports.add_cate = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Validate request
      if (!name || !email || !password || !role) {
        return res.status(400).send({ message: "All fields are required!" });
      }
  
      // Validate role: Only 'retailer' or 'customer' allowed during signup
      if (!['retailer', 'customer'].includes(role)) {
        return res.status(400).send({ message: "Role must be either 'retailer' or 'customer'!" });
      }
  
      // Check if the user already exists
      const existingUser = await Category.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "Email is already in use!" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new User
      const category = new Category({
        name,
        email,
        password: hashedPassword,
        role, // Assign the role selected by the user
        order_list: [] // Ensure order_list is empty
      });
  
      // Save User to the database
      const savedUser = await category.save();
  
      // Return the saved user details (excluding the password for security)
      const { password: _, ...userData } = savedUser.toObject();
      res.status(201).send({
        message: "User registered successfully",
        user: userData
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while signing up."
      });
    }
  };

const categoryDictionary = {
'Men': ['T-shirts', 'Casual Shirts','Formal Shirts','Jackets'],
'Woman': ['T-shirts', 'Casual Shirts','Formal Shirts','Jackets'],
'Footwear':[],
'Kids':[],
'Western':[],
'Eastern':[],
'Product feature':[]
};
  