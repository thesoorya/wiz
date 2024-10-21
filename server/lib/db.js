const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI) //connection
        console.log(`MongoDB connected: ${( conn).connection.host}`);
    }
    catch (error) {
        throw error
        process.exit(1) //exit
    }
}

module.exports = connectDB