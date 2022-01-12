const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://adnansami:12345aa@cluster0.o0d2y.mongodb.net/newdata?retryWrites=true&w=majority").then(()=>{
    console.log("succes");
}).catch((e)=>{
    console.log(e);
})