const User = require("../models/models.js").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
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
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "Email is already in use!" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new User
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role, // Assign the role selected by the user
        order_list: [] // Ensure order_list is empty
      });
  
      // Save User to the database
      const savedUser = await user.save();
  
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
  

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role}, "secret_key", { expiresIn: "1d" });

    res.status(200).send({ message: "Login successful", token, role: user.role });
  } catch (err) {
    res.status(500).send({ message: "Error during login", error: err.message });
  }
};
