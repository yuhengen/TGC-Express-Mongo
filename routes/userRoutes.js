const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId
const userModel = require('../models/userModel')
const passport = require('../passport/setup');

let db = MongoUtil.getDB();

// Display Register Form
router.get('/register', async (req, res) => {
    res.render('users/user_form')
})

router.post('/register', async (req, res) => {
    await userModel.createUser(req.body.user, req.body.email, req.body.password);
    req.flash("New user registered");
    res.redirect('/food');
})

// Display Login Form
router.get('/login', async (req, res) => {
    res.render('users/login_form')
})

// process the login
router.post('/login', async (req, res, next) => {
    // Create authentication function
    // first argument is 'local', means we want to use local
    let authProcess = passport.authenticate('local', async function (err, user, info) {
        // If there is an error 
        if (err) {
            res.send("Error logging in");
        }

        // If user is not found (Email given is not in mongo documents)
        if (!user) {
            res.send("User not found");
        }

        // CAUTION: Below is uppercase
        let loginError = req.logIn(user, (loginError) => {
            if (loginError) {
                res.send("Error logging in");
            } else {
                res.send("User has logged in successfully");
            }
        })
    });
})

module.exports = router;