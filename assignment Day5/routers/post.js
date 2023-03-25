const express=require('express')
const { populate } = require('../models/Post')
const router =express.Router()
const PostModel=require('../models/Post')

router.post('/',(req,res)=>{
   const Post={
    ...req.body
   }
   PostModel.create(Post,(err,createdPost)=>
   {
   if(!err) return res.json(createdPost)
      res.send( "adding Post")
   
   }
   
   )
   })
   router.get('/', (req, res)=>{
       PostModel.find ({},(err,Post)=>{
           if(!err){return res.json(Post)}
           res.status(500).json(err)
       })
   })
   router.get('/:id', (req, res)=>{
   const id=req.params.id
   PostModel.find ({_id:id},(err,Post)=>{
   if(!err)
   {
   return res.json(Post)
   }
   res.status(500).json(err)
   })
   
   })
   
   router.put('/:id',(req, res) => {
       const id = req.params.id
       const updates = req.body
       PostModel.findByIdAndUpdate(id,updates,(err,Post)=>{
               if(!err) return res.json(Post)
               res.status(500).send(err)
           })
   })
   router.delete('/:id',(req,res) => {
       const id = req.params.id
       PostModel.findByIdAndDelete({_id:id},(err,Post)=>{
           if(!err) return res.json(Post)
           res.status(500).send(err)
       })
   })
   
   module.exports = router;