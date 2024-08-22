const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();

// Convert data into JSON format
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

// Use EJS as the view engine
app.set("view engine", "ejs");

// Route to serve your HTML file as the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to render the login page
app.get("/login", (req, res) => {
    res.render("login");
});

// Route to render the signup page
app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
app.post("/signup", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists in the database
        const existingUser = await collection.findOne({ name: username });

        if (existingUser) {
            res.send('User already exists. Please choose a different username.');
        } else {
            // Hash the password using bcrypt
            const saltRounds = 10; // Number of salt rounds for bcrypt
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Save the new user with the hashed password
            const userdata = await collection.insertOne({ name: username, password: hashedPassword });
            console.log(userdata);

            // Redirect to login page after successful signup
            res.redirect("/login");
        }
    } catch (error) {
        res.send("An error occurred during signup. Please try again.");
    }
});

// Login user 
app.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await collection.findOne({ name: username });
        if (!user) {
            res.send("Username not found. Please sign up.");
            return;
        }

        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.send("Incorrect password. Please try again.");
            return;
        }

        // Render the home page on successful login
        res.render("home");
    } catch (error) {
        res.send("An error occurred during login. Please try again.");
    }
});

// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
