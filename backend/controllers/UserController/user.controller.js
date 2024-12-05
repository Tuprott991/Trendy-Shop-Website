const User = require("../../models/index").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res) => {
  User.create(req, res);
};

exports.postLogin = async (req, res) => {
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
  const token = jwt.sign({ id: user._id, role: user.role }, "secret_key", {
   expiresIn: "1d",
  });

  res.status(200).send({ message: "Login successful", user, token });
 } catch (err) {
  res.status(500).send({ message: "Error during login", error: err.message });
 }
};

exports.getProfile = async (req, res) => {
  try{

    const {userID} = req.query
    // Validate userID format

    // Find user

    userInfo = await User.getInfo(userID)

    // Handle user not found
    if (!userInfo) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Return user info
    res.status(200).json({
      name: userInfo.name,
      email: userInfo.email,
      gender: userInfo.gender,
      birthday: userInfo.birthday,
      region: userInfo.region,
      avatar: userInfo.avatar
    });
    } catch (err) {
      res.status(500).send({ message: err.message || 'Internal server error' });
    }
};


