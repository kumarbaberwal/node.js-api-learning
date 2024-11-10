const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://Kumar:kumar@cluster0.4owns.mongodb.net/food?retryWrites=true&w=majority&appName=Cluster0';

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
