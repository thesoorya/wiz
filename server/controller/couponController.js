const Coupon = require("../models/couponModel");

exports.getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No active coupon found for this user",
        });
    }

    res.status(200).json({ success: true, coupon });
  } catch (error) {
    console.error("Error in getCoupon controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
exports.validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res
        .status(400)
        .json({ success: false, message: "Coupon expired" });
    }

    res.status(200).json({
      success: true,
      message: "Coupon is valid",
      coupon: {
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
      },
    });
  } catch (error) {
    console.error("Error in validateCoupon controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
