// controllers/CategoryController/category.js
const Voucher = require("../../models/index").Voucher;

exports.createVoucher = async (req, res) => {
    try {
        const { code, discount_value, description, valid_from, valid_to, minimum_order_value, max_uses } = req.body;
  
        // Validate required fields
        if (!code || !discount_value || !description || !valid_from || !valid_to) {
          return res.status(400).send({ message: "All required fields must be provided!" });
        }
  
        // Check if voucher code already exists
        const existingVoucher = await this.findOne({ code });
        if (existingVoucher) {
          return res.status(400).send({ message: "Voucher code is already in use!" });
        }
  
        // Create a new voucher
        const voucher = new this({
          code,
          discount_value,
          description,
          valid_from,
          valid_to,
          minimum_order_value,
          max_uses
        });
  
        // Save the voucher
        const savedVoucher = await voucher.save();
        res.status(201).send({
          message: "Voucher created successfully!",
          voucher: savedVoucher
        });
      } catch (err) {
        res.status(500).send({
          message: err.message || "An error occurred while creating the voucher."
        });
      }
};
