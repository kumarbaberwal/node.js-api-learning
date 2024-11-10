const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({path: "./process.env"});
// dotenv.config();
const mongoURI = process.env.mongoURI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Database Connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

const fetchData = async () => {
    try {
        const db = mongoose.connection.db;
        const returnedData = await db.collection('user').find({}).toArray();
        // console.log("Fetched Data:", returnedData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


module.exports = { mongoDB, fetchData };
