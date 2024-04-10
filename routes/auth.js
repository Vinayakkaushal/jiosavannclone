const express = require('express');

const router = express.Router();

const mongoose = require('mongoose')

const bcrypt = require('bcrypt')


const USER = mongoose.model('USER')
router.get('/', (req, res) => {
    res.send('hello world')
})

router.post('/signup', (req, res) => {
    const { email, password, confirmPassword } = req.body
    if (!email || !password || !confirmPassword) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    if (password !== confirmPassword) {
        return res.status(422).json({ error: "passwords do not match" })
    }
    if (password.length < 6) {
        return res.status(422).json({ error: "password should be atleast 6 characters" })
    }
    USER.findOne({ email: email }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "user already exists with that email" })
        }
        bcrypt.hash(password, 12).then((hashedpassword) => {
            const user = new USER({
                email,
                password: hashedpassword,
                confirmPassword: hashedpassword
            })
            user.save().then(user => {
                res.json("success")
            })
                .catch(err => {
                    console.log(err)
                })
        })

        
    })

})
module.exports = router