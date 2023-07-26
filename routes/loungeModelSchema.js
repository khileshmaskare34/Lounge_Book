const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
var loungeSchema = mongoose.Schema({
    loungeName : {
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

module.exports = mongoose.model("loungeModelSchema", loungeSchema);