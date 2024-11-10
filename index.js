const express = require("express");
const app = express();
const port = 3000;

const { mongoDB, fetchData } = require('./db');

(async () => {
    await mongoDB(); // Connect to the database first
    await fetchData(); // Fetch data after the connection is established
})();

app.get('/', (req, res) => {
    res.send("Hello Kumar");
});

app.use(express.json())

app.use('/api', require('./routers/createuser.router'))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log(`http://localhost:${port}/`);
});
