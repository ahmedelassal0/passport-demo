const router = require("express").Router();

const { isAuthenticated } = require("../middlewares");

router.get("/me", isAuthenticated, (req, res) => {
    res.render("profile.ejs", { user: req.user });
});

module.exports = router;
