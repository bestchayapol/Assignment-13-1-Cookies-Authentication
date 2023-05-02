const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: "server2.bsthun.com",
    port: "6105",
    user: "lab_18ocvw",
    password: "JMEwRDqcN0mB6b56",
    database: "lab_todo02_185kolp",
});
  
// Connect to DB
connection.connect();
console.log("DB is connected");

app.use(bodyParser.json({type: "application/json"}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.post("/login", (req, res) => {
    const {username, password} = req.body;
})