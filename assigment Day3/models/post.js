const mongoose =require('mongoose')

const postSchema =new mongoose.Schema(
{
 tiltle:String,
 body:String,
 author :{type:mongoose.Schema.Types.ObjectId ,ref:"user"}
}
)
const PostModel=mongoose.model('post',postSchema)
module.exports=PostModel