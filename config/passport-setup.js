const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const User = require("../models/userModel");

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            // google options
            clientID: process.env.GOOGLE_API_CLIENT_ID,
            clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
            callbackURL: "/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            // callback function

            // check if user exists
            const user = await User.findOne({ googleId: profile.id });
            if (user) return done(null, user);

            console.log(profile);
            // if user does not exist
            const newUser = await User.create({
                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.picture,
            });
            done(null, newUser);
        }
    )
);
