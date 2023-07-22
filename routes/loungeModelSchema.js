const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
var loungeSchema = mongoose.Schema({
    loungename : {
        type : String,
        required : true
    },
    loungePhoneNo : {
        type : String
    },
    loungeEmail :{
        type : String
    },
    loungeProviderId :{
        type : String,
        required: true
    }
})

module.exports = mongoose.model("loungeRegistration", loungeSchema);