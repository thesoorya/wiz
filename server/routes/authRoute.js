const express = require('express');
const { signup, login, logout, getProfile } = require('../controller/userController');
const {protect} = require('../middleware/protect'); 

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);

module.exports = router;
