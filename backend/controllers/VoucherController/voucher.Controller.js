// controllers/CategoryController/category.js
const Voucher = require("../../models/index").Voucher;
const User = require("../../models/index").User;

exports.postCreateVoucher = async (req, res) => {
  try {
    const { code, description, retailer_id, discount_value, valid_from, valid_to, minimum_order_value, max_uses } = req.body;

    // Validate required fields
    if (!code || !discount_value ||!retailer_id || !description || !valid_from || !valid_to) {
      return res.status(400).send({ message: "All required fields must be provided!" });
    }

    const existingRetailer = await User.find({ retailer_id, role: "retailer" });
    if (!existingRetailer) {
      return res.status(400).send({ message: "Retailer is not exist." });
    }

    // Validate dates
    const validFromDate = new Date(valid_from);
    const validToDate = new Date(valid_to);
    if (isNaN(validFromDate.getTime()) || isNaN(validToDate.getTime())) {
      return res.status(400).send({ message: "Invalid dates provided!" });
    }

    if (validFromDate >= validToDate) {
      return res.status(400).send({ message: "'valid_from' must be before 'valid_to'!" });
    }

    // Check if voucher code already exists
    const existingVoucher = await Voucher.findOne({ code });
    if (existingVoucher) {
      return res.status(400).send({ message: "Voucher code is already in use!" });
    }

    // Create a new voucher
    const voucher = new Voucher({
      code,
      description,
      retailer_id,
      discount_value,
      valid_from: validFromDate,
      valid_to: validToDate,
      minimum_order_value,
      max_uses,
      used_count: 0
    });

    // Save the voucher
    await voucher.save();

    // Send a success response
    res.status(201).send({ message: "Voucher created successfully!", voucher });
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while creating the voucher.",
    });
  }
};

exports.getVoucherPage = async (req, res) => {
  try {
    const { id } = req.query;

    // Check if ID is provided
    if (!id) {
      return res.status(400).send({ message: "Retailer ID is required." });
    }

    // Check if retailer exists
    const existingRetailer = await User.findOne({ id, role: "retailer" });
    if (!existingRetailer) {
      return res.status(400).send({ message: "Retailer does not exist." });
    }

    // Fetch vouchers for the retailer
    const vouchers = await Voucher.find({ retailer_id: id })
      .select("code description discount_value max_uses status"); // Chỉ lấy các trường cần thiết

    if (!vouchers.length) {
      return res.status(404).send({ message: "No vouchers found for this retailer." });
    }

    // Return list of vouchers
    return res.status(200).json(vouchers);
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while fetching the voucher page."
    });
  }
};
