const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);



var loungeproviderSchema = mongoose.Schema({
 name:{
    type :String,
    required: true
 },
 email:{
   type :String,

    required: true
 },
 password:{
    type : String,
    required: true
 },
 phoneNo : {
    type : Number,
    required: true
 }
})


module.exports = mongoose.model("providerModel",loungeproviderSchema)