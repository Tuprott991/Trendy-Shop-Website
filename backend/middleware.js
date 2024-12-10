const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

    if (!token) {
        return res.status(401).send({ message: "Token missing or unauthorized" });
    }

    try {
        // Giải mã token
        const decoded = jwt.verify(token, "secret_key"); // Đảm bảo "secret_key" khớp với key tạo token
        req.user = decoded; // Lưu thông tin giải mã vào req để sử dụng sau
        next(); // Tiếp tục xử lý các route khác
    } catch (err) {
        return res.status(403).send({ message: "Invalid or expired token" });
    }
};

module.exports = authenticateToken;