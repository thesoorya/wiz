const { getCoupon, validateCoupon } = require('../controller/couponController');
const express = require('express')
const { protect } = require('../middleware/protect');

const router = express.Router();

router.get("/", protect, getCoupon);
router.post("/validate", protect, validateCoupon);

module.exports = router;