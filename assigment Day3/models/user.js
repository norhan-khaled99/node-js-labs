const  mongoose =require("mongoose");

const UserSchema=new mongoose.Schema({
firstName:{type:String,minlength:4,require:true},
lastName:String,
email:{type:String,unique:true,match:/.+@.+\..+/},
age:Number
})

const UserModel=mongoose.model('user',UserSchema)

module.exports=UserModel