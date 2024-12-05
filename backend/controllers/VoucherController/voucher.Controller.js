// controllers/CategoryController/category.js
const Voucher = require("../../models/index").Voucher;
const User = require("../../models/index").User;

exports.createVoucher = async (req, res) => {
    try {
        const { code, discount_value, description, valid_from, valid_to, minimum_order_value, max_uses } = req.body;
  
        // Validate required fields
        if (!code || !discount_value || !description || !valid_from || !valid_to) {
          return res.status(400).send({ message: "All required fields must be provided!" });
        }
  
        // Check if voucher code already exists
        const existingVoucher = await Voucher.findOne({ code });
        if (existingVoucher) {
          return res.status(400).send({ message: "Voucher code is already in use!" });
        }
  
        // Create a new voucher
        const voucher = new Voucher({
          code,
          discount_value,
          description,
          valid_from,
          valid_to,
          minimum_order_value,
          max_uses
        });
  
        // Save the voucher
        return res.status(200).json({
          vouchers: vouchers.map(voucher => ({
            code: voucher.code,
            description: voucher.description,
            max_uses: voucher.max_uses,
            status: voucher.status
          }))
        });
      } catch (err) {
        res.status(500).send({
          message: err.message || "An error occurred while creating the voucher."
        });
      }
};

exports.getVoucherpage = async (req, res) => {
  try {
      const { id } = req.query;

      // Check if voucher code already exists
      const existingRetailer = await User.findOne({ id, role: "retailer" });
      if (!existingRetailer) {
        return res.status(400).send({ message: "Retailer is not exist." });
      }
      
      const vouchers = await Voucher.find({ retailer_id: id });
      if (!vouchers.length) {
        return res.status(404).send({ message: "No vouchers found for this retailer." });
      }

      return res.status(200).json({ 
        code: vouchers 

      });

    } catch (err) {
      res.status(500).send({
        message: err.message || "An error occurred while post voucher page."
      });
    }
};
