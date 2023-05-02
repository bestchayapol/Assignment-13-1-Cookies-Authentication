const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

// Configure the MySQL connection
const connection = mysql.createConnection({
  host: "server2.bsthun.com",
  port: "6105",
  user: "lab_18ocvw",
  password: "JMEwRDqcN0mB6b56",
  database: "lab_todo02_185kolp",
});

// Middleware to parse JSON request body
app.use(express.json());

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});

// Define the login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Retrieve the hashed password for the given username from the database
  const sql = mysql.format(
    "SELECT hashed_password FROM users WHERE username = ?",
    [username]
  );
  connection.query(sql, (err, rows) => {
    if (err) {
      return res.json({
        success: false,
        data: null,
        error: err.message,
      });
    }

    numRows = rows.length;
    if (numRows > 0) {
      //Verify the password
      const hashedPassword = rows[0].hashed_password;
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        }
        if (result) {
          // If the password is correct, respond with a success message
          res.json({
            success: true,
            message: "Login Successful",
          });
        } else {
          // If the password is incorrect, respond with a error message
          res.json({
            success: false,
            message: "Invalid username or password",
          });
        }
      });
    } else {
      // If the username does not exist in the database, respond with an error message
      res.json({
        success: false,
        message: "Invalid username or password",
      });
    }
  });
});
