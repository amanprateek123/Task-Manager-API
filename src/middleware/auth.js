const jwt = require('jsonwebtoken')
const User = require('../models/users')


const auth = async (req,res,next)=>{
   try{
      const token = req.header('Authorization').replace('Bearer ','')
      const decode = jwt.verify(token, process.env.JWT)
      console.log(decode)
      const user = await User.findOne({_id:decode._id, 'tokens.token':token})
      if(!user){
          throw new Error()
      }
      req.token = token   ///storing token
      req.user = user    //storing value of user in request
      next()
   }
   catch(e){
       res.status(401).send({error:'Aunthetication failed.Please login!'})
   }
}

module.exports = auth