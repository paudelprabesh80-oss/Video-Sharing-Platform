import mongoose  from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema =  new mongoose.Schema({

username: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  index: true,
},
email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
},
fullName: {
  type: String,
  required: true,
},
avatar: {
  type: String,
  required: true,
},
 avatarPublicId: 
 {
  type: String,
},
coverimage: {
  type: String,
},
 coverimageid: 
 {
  type: String,
},


watchhistory: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  }
],
password: {
  type: String,
  required: true,
  
},
refreshtoken: {
  type: String
}


}, {timestamps: true})


userSchema.pre("save",  async function(next)
{
if(!this.isModified("password"))
  return next();

this.password = await bcrypt.hash(this.password, 10)
next()
})

userSchema.methods.comparePassword = async function (plainpassword) 
{
  return await bcrypt.compare(plainpassword, this.password)
}

userSchema.methods.generateAccessToken = function()
{
  return jwt.sign( {
    _id: this._id,
username: this.username,
email: this.email
  },
  process.env.ACCESS_TOKEN,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
  )
}
userSchema.methods.generateRefreshToken = function()
{
    return jwt.sign( {
    _id: this._id,

  },
  process.env.REFRESH_TOKEN,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
  )
}


export const User = mongoose.model("User", userSchema)
