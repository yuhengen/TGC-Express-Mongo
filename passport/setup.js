const userModel = require('../models/userModel.js')
const passport = require('passport')
const LocalStrategy = require('passport-local');

// 1. How to serialize the user to the session (Save user info to session)
// This happens when user logs in, Express needs to save user document to session
// IE associate session ID with particular user
passport.serializeUser(function (user, done) {
    // NOTE: User argument will be a user document from mongoDB. Passport will somehow pass this info to us
    // first argument for done means there is no error
    // second argument is what data from the user document we want to save to session
    done(null, user._id);
})

// 2. Deserialize user (Given a session ID, retrieve user information from session)
// This is needed on subsequent visits
passport.deserializeUser(async function (id, done) {
    let user = await userModel.findUserById(id);
    // First argument is null means no error
    // second argument is user document
    done(null, user);
})

// 3. How to authenticate
// Two questions to answer
// a) Does user exist? (If provide username and password)
// b) If user exists, is password correct?
passport.use(new LocalStrategy({
    'usernameField': 'email'
}, async function (email, password, done) {
    // To answer a) does user exist, given the email?
    let user = await userModel.findUserByEmail(email);
    // To answer b) does password match with username?
    if (user && user.password == pasword) {
        // All good, user exists and password matches
        done(null, user);
    } else {
        done(null, false, {
            message: "Invalid login"
        })
    }
}))

module.exports = passport;