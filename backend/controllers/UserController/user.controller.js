const User = require("../../models/index").User;
const Order = require("../../models/index").Order;
const Product = require("../../models/index").Product;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res) => {
  const { name, email, password, role, birthday, gender, avatar, region } = req.body;
  try {
    if (!name || !email || !password || !role || !birthday ||  !gender || !region) {
      return res.status(400).send({ message: "All fields are required!" });
    }
    if (!["retailer", "customer"].includes(role)) {
      return res.status(400).send({ message: "Invalid role!" });
    }
    const userData = await User.create(name, email, password, role, birthday, gender, avatar, region);
    if (userData === 1) {
      return res.status(400).send({ message: "Email already exists!" });
    }
    res.status(200).send({ message: "User registered successfully", user: userData });
  } catch (err) {
    res.status(500).send({ message: err.message || "Signup error." });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, "secret_key", {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login successful", user, token });
  } catch (err) {
    res.status(500).send({ message: "Error during login", error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userID = req.user.id
    userInfo = await User.getInfo(userID)
    if (!userInfo) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (!userInfo.gender) userInfo.gender = "N/A";
    if (!userInfo.birthday) userInfo.birthday = "N/A";
    if (!userInfo.region) userInfo.region = "N/A";
    res.status(200).json({
      id: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role,
      gender: userInfo.gender,
      birthday: userInfo.birthday,
      region: userInfo.region,
      avatar: userInfo.avatar
    });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Internal server error' });
  }
};

exports.postUpdateProfile = async (req, res) => {
  const { id } = req.user;
  const { name, email, birthday, gender, region, avatar } = req.body;

  try {
    const updatedUser = await User.update(id, name, email, birthday, gender, region, avatar);
    res.status(200).json({ updatedUser })
  }
  catch {
    console.error(error);
    res.status(500).json({ message: 'Update Error' });
  }
};


exports.postUpdateProfieCustomer = (req, res) => {
  try {
    const {id}=req.params;
    const{name,email,birthday,gender,region}=req.body;
    User.update(id,name,email,birthday,gender,region);
    res.status(200).json({message:"Update successful"});
  }catch{
    console.error(error);
    res.status(500).json({message:"Update Error"});
  }
}

// Delete retailer

exports.postDeleteUser = (req, res) => {
  const { id } = req.body;

  try {
    User.delete(id);
    res.status(200).json({ message: "Delete succesful!" })
  }
  catch {
    console.error(error);
    res.status(500).json({ message: 'Delete Error' });
  }
};

exports.getRetailerList = async (req, res) => {
  try {
    // Lấy danh sách retailer
    const retailers = await User.find({ role: 'retailer' }).select('name email order_list');

    const retailerData = [];

    // Duyệt qua từng retailer
    for (let retailer of retailers) {
      // Lấy danh sách các đơn hàng của retailer
      const orders = await Order.find({ retailer_id: retailer._id });

      // Số lượng đơn hàng
      const totalOrders = orders.length;

      // Số lượng đơn hàng đã giao (status: 'deliveried')
      const deliveredOrders = orders.filter(order => order.status === 'deliveried').length;

      // Tính doanh thu từ các đơn hàng đã giao
      const revenue = orders
        .filter(order => order.status === 'deliveried')
        .reduce((total, order) => total + order.total_money, 0);

      // Đẩy thông tin retailer vào mảng
      retailerData.push({
        name: retailer.name,
        email: retailer.email,
        totalOrders,
        deliveredOrders,
        revenue
      });
    }

    // Trả kết quả cho frontend
    res.status(200).json(retailerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching retailer data' });
  }
};


exports.getAdminDashboardData = async (req, res) => {
  try {
    // Fetch total products
    const retailerCount = await User.countDocuments({ role: 'retailer' });

    // Fetch total orders
    const totalOrders = await Order.countDocuments(); // -> Total orders

    // Fetch total delivered orders
    const totalDelivered = await Order.countDocuments({ status: 'completed' }); // -> Delieved 

    // Calculate total revenue

    const orders = await Order.find({ status: 'completed' }); // ID  -> Mảng

    // sum là giá trị tích lũy, order là currentValue khi lướt qua mảng, 0 là giá trị khởi tạo, đây là loop
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

    // Send the response
    res.json({
      retailerCount,
      totalOrders,
      totalDelivered,
      totalRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error fetching dashboard data' });
  }
};

// retailer dashboard
exports.getRetailerDashboardData = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).send({ message: "Retailer ID is required." });
    }
    const productCount = await Product.countDocuments({ user_id: id });
    const totalOrders = await Order.countDocuments({ retailer_id: id });
    const totalDelivered = await Order.countDocuments({ retailer_id: id, status: 'completed' });
    const orders = await Order.find({ retailer_id: id, status: 'completed' });
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
    const productList = await Product.find({ user_id: id })
      .select("name size price category_id")
      .populate({
        path: 'category_id',
        select: 'category target',
      });
    res.json({
      productCount,
      totalOrders,
      totalDelivered,
      totalRevenue,
      productList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error fetching dashboard data' });
  }
};

exports.manageRetailer = async (req, res) => {
  try {
    const retailers = await User.getAllRetailer();
    res.status(200).json({ message: "Retailers fetched successfully", retailers });
  } catch (error) {
    console.error('Error managing retailers:', error);
    res.status(500).json({ message: error.message || 'Error fetching retailer data' });
  }
};

exports.getAllRetailer= async (req, res) => {
  try {
    const retailers = await User.getAllRetailer();
    res.status(200).json({ message: "Retailers fetched successfully", retailers });
  } catch (error) {
    console.error('Error managing retailers:', error);
    res.status(500).json({ message: error.message || 'Error fetching retailer data' });
  }
};
