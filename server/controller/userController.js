const User = require("../models/userModel")

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already Exists' })
        }

        const user = await User.create({ username, email, password })

        res.status(200).json({ success: true, message: user })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' })

    }
}
exports.login = async (req, res) => {

}
exports.logout = async (req, res) => {

}
exports.refreshToken = async (req, res) => {

}
exports.getProfile = async (req, res) => {

}