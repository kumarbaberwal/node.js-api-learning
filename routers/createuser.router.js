const express = require('express')

const router = express.Router()

const user = require('../models/user.model')

const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')

dotenv.config();


const { body, validationResult } = require('express-validator')

router.post('/createuser', body('email').isEmail(), body('password', 'Incorrect Password').isLength({ min: 5 }), async (req, res) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);


    try {


        await user.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
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

        const pswCompare = await bcryptjs.compare(req.body.password, userdata.password);
        const userid = userdata._id;

        const token = jwt.sign({userid}, process.env.jwtSecret );

        if (pswCompare) {
            return res.json({
                message: "login successful",
                token: token
            })
        } else {
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