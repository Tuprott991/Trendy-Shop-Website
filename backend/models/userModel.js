const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    order_list: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    role: { type: String, enum: ['admin', 'customer', 'retailer'], default: 'customer' },
    birthday: { type: Date, required: false },
    gender: { type: String, required: false },
    avatar: { type: String, default: 1 },
    region: { type: String, required: false }
  },
  {
    timestamps: true,
    statics: {
      // Instance method to get user information (you can directly call this on an instance of User)
      async getInfo(userID) {
        const userInfo = await User.findById(userID);
        return userInfo
      },

      // Instance method for creating a new user (can be used directly from an instance)
        async create(req, res) {
        try {
          const { name, email, password, role } = req.body;

          // Validate request
          if (!name || !email || !password || !role) {
            return res.status(400).send({ message: "All fields are required!" });
          }

          // Validate role: Only 'retailer' or 'customer' allowed during signup
          if (!["retailer", "customer"].includes(role)) {
            return res
              .status(400)
              .send({ message: "Role must be either 'retailer' or 'customer'!" });
          }

          // Check if the user already exists
          const existingUser = await this.findOne({ email });
          if (existingUser) {
            return res.status(400).send({ message: "Email is already in use!" });
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Create a new User
          const user = new this({
            name,
            email,
            password: hashedPassword,
            role, // Assign the role selected by the user
            order_list: [], // Ensure order_list is empty
          });

          // Save User to the database
          const savedUser = await user.save();

          // Return the saved user details (excluding the password for security)
          const { password: _, ...userData } = savedUser.toObject();
          res.status(200).send({
            message: "User registered successfully",
            user: userData,
          });
        } catch (err) {
          res.status(500).send({
            message: err.message || "Some error occurred while signing up.",
          });
        }
      }
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User
