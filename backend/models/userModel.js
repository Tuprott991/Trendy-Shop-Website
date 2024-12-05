const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { getRetailerInfor } = require('../controllers/UserController/ad_dashboard.controllers');
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

      async update(userID, name, email) {
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        // Tìm kiếm và cập nhật người dùng trong database

        const updatedUser = await this.findByIdAndUpdate(
          userID,
          { $set: updateData },
          { new: true, runValidators: true } // Trả về tài liệu đã được cập nhật và áp dụng validate
        );

         // Nếu không tìm thấy user, báo lỗi
        if (!updatedUser) {
          throw new Error("User not found");
        }
        return updatedUser
      },

      async delete(userID){
        try {
          // Kiểm tra xem userID có được cung cấp không
          if (!userID) {
            throw new Error("UserID is required");
          }
      
          // Tìm và xóa người dùng trong cơ sở dữ liệu
          const deletedUser = await this.findByIdAndDelete(userID);
      
          // Nếu không tìm thấy user, báo lỗi
          if (!deletedUser) {
            throw new Error("User not found");
          }
      
          // Trả về thông báo thành công hoặc dữ liệu user đã xóa
          return { message: "User deleted successfully", user: deletedUser };
        } catch (error) {
          throw new Error(`Failed to delete user: ${error.message}`);
        }
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
