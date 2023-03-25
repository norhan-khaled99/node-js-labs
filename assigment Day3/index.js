const express=require('express')
const { mongoose } = require("mongoose");
const PORT=process.env.PORT ||5000
const app = express();
const userRouter=require('./routers/user')
const postRouter=require('./routers/post')
app.use(express.json())

app.use('/user', userRouter)
app.use('/post', postRouter)

mongoose.connect("mongodb://127.0.0.1:27017/iti",(err)=>{
  if(!err) return console.log("DB connected successfully");
  return console.log(err)
  }
)

app.listen(PORT, (err)=>{
if(!err) return console.log(`server start at port ${PORT}`);
console.log(err);
})