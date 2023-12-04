const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");

dotenv.config({
    path: path.join(__dirname, "./config/config.env"),
});

const passportSetup = require("./config/passport-setup");

// importing routes
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");

// mongoose connection
mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("connecting to mongoose");
    })
    .catch((err) => {
        console.log(`Error connecting to mongoose ${err}`);
    });

const app = express();

// set view engine
app.set("view engine", "ejs");

// middlewares
app.use(
    session({
        //express-session
        secret: process.env.COOKIE_ENCRYPT_KEY,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// using routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// home view
app.get("/", (req, res) => {
    res.render("home.ejs");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
