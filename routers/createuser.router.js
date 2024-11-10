const express = require('express')

const router = express.Router()

const user = require('../models/user.model')

const { body, validationResult } = require('express-validator')

router.post('/createuser', body('email').isEmail(), body('password', 'Incorrect Password').isLength({ min: 5 }), async (req, res) => {
    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        await user.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        res.json({
            sucess: true
        })
    } catch (error) {
        console.log(error)
        res.json({
            sucess: false
        })
    }
})

router.post('/loginuser', async (req, res) => {
    var email = req.body.email;
    try {
        const userdata = await user.findOne({ email })

        if (!userdata) {
            return res.status(400).json({
                error: "No User Found"
            })
        }
        if (req.body.password === userdata.password) {
            return res.json({
                message: "login successful"
            })
        } else{
            return res.status(400).json({
                error: "password is incorrect"
            })
        }
    } catch (error) {
        res.json({
            sucess: false
        })
        console.log(error)
    }
})

module.exports = router;