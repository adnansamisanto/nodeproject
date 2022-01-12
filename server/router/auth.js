const express = require("express");
const router = express.Router();
const user = require("../models/schima")
require("../db/conn")

router.get("/",(req,res)=>{
    res.status(200).send("hello")
})

router.post("/registation", (req, res) => {
    const { name, adress, email, password, cpassword } = req.body;
    if (!name || !email || !adress || !password || !cpassword) {
        return res.status(400).send("fill the data !!");
    }

    user.findOne({ email: email })
        .then((userExit) => {
            if (userExit) {
                return res.status(400).send("email is valid");
            } else if (password != cpassword) {
                return res.status(400).send("password not match !");
            } else {
                const User = new user({ name, adress, email, password, cpassword });
                User.save().then(() => {
                    return res.status(200).json({ massage: "succes" });
                }).catch((e) => {
                    console.log(e);
                })
            }
        }).catch(() => {
            return res.status(400).json({ massage: "not send" });
        })
})

// login 

router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ massage: "email not match" })
        }
        const userLogin = await user.findOne({ email: email });
        if (userLogin) {
            const passMatch = userLogin.password === password;
            const token = await userLogin.generatAuthToken();
            res.cookie("jwt",token,{
                expires: new Date(Date.now()+25892000000),
                httpOnly:true,
            })
            if (!passMatch) {
                return res.status(404).json({ massage: "email not match" })
            } else {
                return res.status(201).json({massage:"login succes"});
            }
        } else {
            return res.status(404).json({ massage: "email not match" })
        }
    } catch (error) {
        console.log(error);
    }
})

// logout 



module.exports = router
