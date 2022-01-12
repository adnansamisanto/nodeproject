const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchima = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, email: {
        type: String,
        required: true,
    }, adress: {
        required: true,
        type: String,
    }, password: {
        required: true,
        type: String,
    }, cpassword: {
        required: true,
        type: String,
    }, Tokens: [{
        token: {
            required: true,
            type: String,
        }
    }]
})

userSchima.methods.generatAuthToken = async function () {
    try {
        const MyToken = jwt.sign({ _id: this._id }, "adnansamisantoinclassten");
        this.Tokens = this.Tokens.concat({ token: MyToken });
        await this.save();
        return MyToken;
    } catch (error) {
        console.log(error);
    }
};

const user = mongoose.model('mywebsite', userSchima);
module.exports = user;