const express = require('express');
const app = express();
require("./db/conn")
const user = require("./models/schima")
app.use(express.json());
app.use(require("./router/auth"));
const cookieparser = require("cookie-parser");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const path = require('path') 
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));

const authencation = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const veriFiedtoken = jwt.verify(token, "adnansamisantoinclassten");
        const rootUser = await user.findOne({ _id: veriFiedtoken._id, "Token.token": token });
        if (!rootUser) { throw new error("user not authencate !") };
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next()
    } catch (error) {
        res.status(404).send("some error !")
        console.log(error);
    }
};


app.get("/home", authencation, (req, res) => {
    res.send(req.rootUser)
})
app.get("/nav", authencation, (req, res) => {
    res.send(req.rootUser)
})
app.get("/logout", authencation, (req, res) => {
    res.clearCookie("jwt", { path: '/' });
    res.status(200).send("logout succes")
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"/client/build"))); 
}


app.listen(port, (e) => {
    console.log(port);
})