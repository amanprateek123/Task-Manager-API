const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Task = require('./tasks')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    age:{
        type:Number,
        default:0,
        validate(val){
            if(val<0){
                throw new Error("Age should be positive")
            }
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(val){
           if(! validator.isEmail(val)){
               throw new Error("Invalid Email address")
           }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(val){
            if(val.toLowerCase().includes('password')){
                throw new Error("Invalid Password")
            }
        }
    },
    tokens: [{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function(){
      const user = this
      const userObj = user.toObject()   //raw data files
      delete userObj.password
      delete userObj.tokens
      return userObj
}

userSchema.methods.generateAuthToken = async function(){
          const user = this
          const token = jwt.sign({_id: user._id.toString()},process.env.JWT)
          user.tokens = user.tokens.concat({token})
          await user.save()
          return token 
}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Unable to login")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
          user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.pre('save', async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User',userSchema) 

module.exports = User