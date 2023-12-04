const { promisify } = require("util");

const passport = require("passport");

const router = require("express").Router();

// login page
router.get("/login", (req, res) => {
    res.render("login.ejs", { user: req.user });
});

// auth logout
router.get("/logout", async (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

// auth with google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/users/me");
});
module.exports = router;
