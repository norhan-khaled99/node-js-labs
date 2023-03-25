const express = require('express');
const router = express.Router();
const UserModel= require('../models/user')
// const mongoose= require('mongoose')

router.post('/',(req,res)=>{
const user={
 ...req.body
}
UserModel.create(user,(err,createdUSer)=>
{
if(!err) return res.json(createdUSer)
   res.send( "adding user")

}

)
})
router.get('/', (req, res)=>{
    UserModel.find ({},(err,user)=>{
        if(!err){return res.json(user)}
        res.status(500).json(err)
    })
})
router.get('/:id', (req, res)=>{
const id=req.params.id
UserModel.find ({_id:id},(err,user)=>{
if(!err)
{
return res.json(user)
}
res.status(500).json(err)
})

})

router.put('/:id',(req, res) => {
    const id = req.params.id
    const updates = req.body
    UserModel.findByIdAndUpdate(id,updates,(err,user)=>{
            if(!err) return res.json(user)
            res.status(500).send(err)
        })
})
router.delete('/:id',(req,res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({_id:id},(err,user)=>{
        if(!err) return res.json(user)
        res.status(500).send(err)
    })
})

module.exports = router;