const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth')
const {sendWelcomeEmail} = require('../emails/account')

const router = new express.Router()

//signup

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }
    catch(e){
       res.status(400).send(e)
    }
})
//login
router.post('/users/login',async (req,res)=>{
    try{
       const user = await User.findByCredentials(req.body.email,req.body.password)
       const token = await user.generateAuthToken()
       res.status(200).send({user,token})
    }
    catch(e){
        res.status(404).send('Login Failed')
    }
})

//logout
router.post('/users/logout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter(itm=>{
            return itm.token != req.token
        })
        await req.user.save()
        res.send("Logout Successeful")
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/me',auth,async (req,res)=>{
     res.send(req.user)
})

router.patch('/users/me',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({error:'Invalid Update!'})
    }
    try{
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
        res.send(req.user)
    }
    catch(e){
        res.status(400).send(e)
    }
})
router.delete('/users/me',auth, async (req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router