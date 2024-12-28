const Voucher = require("../../models/index").Voucher;
const User = require("../../models/index").User;

exports.postCreateVoucher = async (req, res) => {
  try {
    const retailer_id = req.user.id;
    const { code, description, discount_value, valid_from, valid_to, minimum_order_value, max_uses } = req.body;
    if (!code || !discount_value ||!retailer_id || !description || !valid_from || !valid_to)
      return res.status(400).send({ message: "All required fields must be provided!" });
    const existingRetailer = await User.find({ retailer_id, role: "retailer" });
    if (!existingRetailer)
      return res.status(400).send({ message: "Retailer is not exist." });
    const validFromDate = new Date(valid_from);
    const validToDate = new Date(valid_to);
    if (isNaN(validFromDate.getTime()) || isNaN(validToDate.getTime()))
      return res.status(400).send({ message: "Invalid dates provided!" });
    if (validFromDate >= validToDate)
      return res.status(400).send({ message: "'valid_from' must be before 'valid_to'!" });
    const existingVoucher = await Voucher.findOne({ code });
    if (existingVoucher)
      return res.status(400).send({ message: "Voucher code is already in use!" });
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
    await voucher.save();
    res.status(201).send({ message: "Voucher created successfully!", voucher });
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while creating the voucher.",
    });
  }
};

exports.getVoucherPage = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).send({ message: "Retailer ID is required." });
    }
    const existingRetailer = await User.findOne({ id, role: "retailer" });
    if (!existingRetailer) {
      return res.status(400).send({ message: "Retailer does not exist." });
    }
    const vouchers = await Voucher.find({ retailer_id: id })
      .select("code description discount_value max_uses status");
    if (!vouchers.length) {
      return res.status(404).send({ message: "No vouchers found for this retailer." });
    }
    return res.status(200).json(vouchers);
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while fetching the voucher page."
    });
  }
};


exports.getVouchersByRetailersID = async (req, res) => {
  try {
    const { retailerIDs } = req.body;
    if (!Array.isArray(retailerIDs) || retailerIDs.length === 0) {
      return res.status(400).send({ message: "A list of retailer IDs is required." });
    }
    const retailers = await User.find({ _id: { $in: retailerIDs }, role: "retailer"});
    const validRetailerIDs = retailers.map((retailer) => retailer._id.toString());
    if (validRetailerIDs.length === 0) {
      return res.status(404).send({ message: "No valid retailers found for the provided IDs." });
    }
    const vouchers = await Voucher.find({ retailer_id: { $in: validRetailerIDs } })
      .select("code discount_value");
    if (!vouchers.length) {
      return res.status(404).send({ message: "No vouchers found for the provided retailers." });
    }
    return res.status(200).json({ vouchers });
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while fetching vouchers for the retailers."
    });
  }
};

exports.applyVoucherToProduct = async (req, res) => {
  try {
    const { products, voucherCode } = req.body;
    if (!Array.isArray(products) || products.length === 0 || !voucherCode) {
      return res.status(400).send({ message: "products and voucher code are required." });
    }
    const voucher = await Voucher.findOne({ code: voucherCode });
    if (!voucher) {
      return res.status(404).send({ message: "Voucher not found." });
    }
    const now = new Date();
    if (now < new Date(voucher.valid_from) || now > new Date(voucher.valid_to)) {
      return res.status(400).send({ message: "Voucher is not valid at this time." });
    }
    const updatedCart = products.map((product) => {
      if (product.retailer_id === voucher.retailer_id) {
        const discount = (voucher.discount_value / 100) * product.price;
        return { ...product, discounted_price: product.price - discount };
      }
      return product;
    });
    return res.status(200).json({ products: updatedCart });
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while applying the voucher to the cart."
    });
  }
};
