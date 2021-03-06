const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')


router.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all details" });
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User Already Exist" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name,
                        pic
                    })
                    user.save()
                        .then(user => {

                            res.json({ message: "Saved Successfully" })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })

        })
        .catch(error => {
            console.log(error);
        })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please provide all details" });
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.status(200).json({message:"successfully signned in"});
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email, followers, following, pic } = savedUser
                        res.json({ token: token, user: { _id, name, email, followers, following, pic } });
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or Password" });
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
})



module.exports = router;