const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
var foodItemSchema = mongoose.Schema({
    foodName : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    price :{
        type : Number,
        required: true
    },
    shop_id:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("foodItemSchema", foodItemSchema);