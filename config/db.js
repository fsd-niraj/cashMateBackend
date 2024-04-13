require("dotenv").config();
const mongoose = require("mongoose"),
    MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z9axgg8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    logger = require("../services/logger");

const connectDB = async () => {
    await mongoose.connect(MONGO_URL, {
        dbName: process.env.DB_NAME
    })
        .then(() => logger.info(`Successfully connected to ${process.env.DB_NAME}`))
        .catch((error) => {
            logger.error('Failed to connect to the database::>>', error)
            process.exit(-1)
        })
}

module.exports = connectDB;