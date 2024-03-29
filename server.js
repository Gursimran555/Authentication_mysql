const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path'); // this is needed to link css and other fies . so that we can run our ptoject in port 3000 rather then live server 

const app = express();
const port = 3000;

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root3600',
    database: 'db1'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID ' + connection.threadId);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
// made by GURSIMRAN SINGH 
// link css files 
app.use('/files', express.static(path.join(__dirname, 'files')));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/files/index.html');
});

// Route for handleing login form submission
app.post('/login', (req, res) => {
    const loginId = req.body.loginId;
    const password = req.body.password;

    const query = "SELECT * FROM table1 WHERE loginId = ? AND password = ?";
    connection.query(query, [loginId, password], (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.send('Login successful!');
        } else {
            res.send('Invalid login credentials!');
        }
    });
});

// Route forr handle signup form submission
app.post('/signup', (req, res) => {
    const loginId = req.body.signupLoginId;
    const password = req.body.signupPassword;

    const query = "INSERT INTO table1 (loginId, password) VALUES (?, ?)";
    connection.query(query, [loginId, password], (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Sign up successful!');
    });
});

// Start serveer
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
