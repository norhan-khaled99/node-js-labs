const mongoose =require('mongoose')
const userschema = new mongoose.Schema({
    firstname:{type:String,minlength:4,require:true},
    lastname : String,
    email:{type:String,unique:true,match:/.+@.+\..+/},
    password :{ type: String },
    token:{ type: String }
})
const usermodel = mongoose.model('user',userschema)
module.exports = usermodel



