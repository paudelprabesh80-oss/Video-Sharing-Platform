import { asynhandler } from "../utils/requesthandle.js"

import {Apihandler as ApiError} from "../utils/Errorhandler.js"
import { User }  from "../models/users.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const registeruser = asynhandler(async (req, res) => {

console.log("FILES:", req.files);

 const body = req.body || {} 

console.log(body)

//if section has number .trim() will error.


const fullName = (body?.fullName ?? "").toString().trim();
const username = (body?.username ?? "").toString().trim();
const email = (body?.email ?? "").toString().trim();
const password = (body?.password ?? "").toString().trim();

if (!fullName) throw new ApiError(400, "Please enter full name");
if (!username) throw new ApiError(400, "Please enter username");
if (!email) throw new ApiError(400, "Please enter email");
if (!password) throw new ApiError(400, "Please enter password");






const existuser = await User.findOne({ $or: [{username},{email}] })

if(existuser)
{
 return res.status(409).json({
    message:"Already exist of email and username"
  })
}
 const avatarlocalpath= req.files?.avatar?.[0]?.path;

console.log(avatarlocalpath)

 const coverimagepath = req.files?.coverimage?.[0]?.path

if (!avatarlocalpath) {
  throw new ApiError(400, "Avatar file is required")
}

const avatar = await uploadOnCloudinary(avatarlocalpath)

console.log(avatar)

const coverimage = coverimagepath
  ? await uploadOnCloudinary(coverimagepath)
  : null;

 
if (!avatar) {
    throw new ApiError(409, "Avatar file is required")
}



const user = await User.create({
  fullName,
  username,
  email,
  avatar: avatar.secure_url,
  coverimage: coverimage.secure_url || "",
  coverimageid: coverimage?.public_id,
  avatarPublicId: avatar?.public_id,
 password
})

const accesstoken = await user.generateAccessToken()

const refreshtoken = await user.generateRefreshToken()




 const createddata = await User.findById(user._id).select("-password  -refreshtoken")

if(!createddata)
{
  throw new ApiError(409, "File didnot reached to database")
}



//if in any model other then this field has required:true then this is error.

//we should not send password to frontend

 return res.status(201).json( new ApiResponse(201,
    createddata,  
     {
    accessToken: accesstoken,
    refreshToken: refreshtoken
  },
   "Succesfully done to frontend"))
})

//it is just an object to show all data.

export default registeruser
 