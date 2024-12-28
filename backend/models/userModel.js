const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const Order = require('./index').Order;

// User Schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    order_list: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    role: { type: String, enum: ['admin', 'customer', 'retailer'], default: 'customer' },
    birthday: { type: String, required: false },
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

      async update(userID, name, email, birthday, gender, region, avatar) {
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (birthday) updateData.birthday = birthday;
        if (gender) updateData.gender = gender;
        if (region) updateData.region = region;
        if (avatar) updateData.avatar = avatar;
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

      async getRevenue(userID){
        try {
          const totalRevenue = await Order.aggregate([
            {
              $match: {
                retailer_id: mongoose.Types.ObjectId(userID),
                status: 'completed',
              }
            },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: '$total_money' }
              }
            }
          ]);
      
          return totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;
        } catch (error) {
          console.error('Error calculating revenue:', error);
          throw new Error('Failed to calculate revenue');
        }
      },
      

      // Instance method for creating a new user (can be used directly from an instance)
        async create(name, email, password, role, birthday, gender, avatar, region) {
          try{
            // Check if the user already exists
            const existingUser = await this.findOne({ email });

            if (existingUser) {
              return 1
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
              birthday,
              gender,
              avatar,
              region
            });

            // Save User to the database
            const savedUser = await user.save();

            // Return the saved user details (excluding the password for security)
            const { password: _, ...userData } = savedUser.toObject();

            return userData
        }
        catch (error){
          throw new Error('Failed to create account');
        }
      },

      async getAllRetailer(){
        try {
          // Tìm kiếm tất cả người dùng có vai trò là 'retailer'
          const retailers = await this.find({ role: 'retailer' });
          return retailers;
        } catch (error) {
          console.error('Error fetching retailers:', error);
          throw new Error('Failed to fetch retailers');
        }
      }
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User
     