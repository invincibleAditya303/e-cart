const mongoose = require('mongoose')
require('dotenv').config()

//Connecting to Server
const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is missing in environment variables')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch(error) {
        console.error('Connection Falied', error)
        process.exit(1)
    }  
}

module.exports = connectDB