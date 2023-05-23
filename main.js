const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');


// Enable CORS for all origins
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'wahab',
    password: 'Redzone23',
    database: 'formdata',
});

// Parse URL-encoded bodies (as sent by the form)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (if needed)
app.use(bodyParser.json());

// Handle POST request for formData
app.post('/formdata', (req, res) => {
    // Access the form data
    const { name, email, message } = req.body;

    // Execute the INSERT query
    const query = 'INSERT INTO fromdata (name, email, message) VALUES (?, ?, ?)';
    const values = [name, email, message];

    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting MySQL connection:', error);
            res.sendStatus(500);
            return;
        }

        connection.query(query, values, (error, results) => {
            connection.release(); // Release the connection

            if (error) {
                console.error('Error executing MySQL query:', error);
                res.sendStatus(500);
                return;
            }

            console.log('Form data saved to MySQL');

            res.sendStatus(200); // Send a success response
        });
    });
});

// Handle POST request for HBL
app.post('/hbl', (req, res) => {
    // Access the form data
    const { Order_ID, Receipt_No } = req.body;

    // Execute the INSERT query
    const query = 'INSERT INTO hbl (Order_ID, Receipt_No) VALUES (?, ?)';
    const values = [Order_ID, Receipt_No];

    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting MySQL connection:', error);
            res.sendStatus(500);
            return;
        }

        connection.query(query, values, (error, results) => {
            connection.release(); // Release the connection

            if (error) {
                console.error('Error executing MySQL query:', error);
                res.sendStatus(500);
                return;
            }

            console.log('Form data saved to MySQL');

            res.sendStatus(200); // Send a success response
        });
    });
});

// Handle Get request for HBL
app.get('/hbl', (req, res) => {
    // Access the form data
    const sql = 'SELECT * FROM `hbl`';
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting MySQL connection:', error);
            res.sendStatus(500);
            return;
        }
        connection.query(sql, (error, results) => {
            if (error) {
                console.error('Error executing MySQL query:', error);
                res.sendStatus(500);
                return;
            }
            console.log('Form data saved to MySQL');
            res.send(results);
        });
    });
});


// Start the server
app.listen(3001, () => {
    console.log('Server listening on port localhost:3001');
});