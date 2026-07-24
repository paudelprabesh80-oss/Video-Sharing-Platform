import { User } from "../models/users.models.js";

import { ApiResponse } from "../utils/apiresponse.js"
import crypto from "crypto"
import { Apihandler } from "../utils/Errorhandler.js";

const Login = async(req, res)=>
{

const body = req.body;

const email = (body?.email ?? "").toString().trim();
const password = (body?.password ?? "").toString().trim();

console.log(email)
console.log(password)

if (!email) {
  throw new Apihandler(400, "Email and password required");
}
const user = await User.findOne({ email })
if (!user) {
  throw new Apihandler(404, "User not found");
}


const ismatchpassword = await user.comparePassword(password)

if(!ismatchpassword)
{
    // return res.json({message: "Incorrect password:"})

   
   throw new Apihandler(400, "Incorrect password:") 
}



const accesstoken = await user.generateAccessToken()

const refreshtoken = await user.generateRefreshToken()

const hashedtoken = crypto
.createHash("sha256")
  .update(refreshtoken)
.digest("hex")



user.refreshtoken = hashedtoken
await user.save({ validateBeforeSave: false })
//it skip validation when save called other field say it required only update refreshtoken field we skip validation.

const loginuser = await User.findById(user._id).select("-password -refreshtoken")

const options = {
  httpOnly: true,
  secure: false
}


return res.status(200)
.cookie("accesstoken", accesstoken, options)
.cookie("refreshtoken", refreshtoken, options)

.json(
  new ApiResponse(200,
{
  user: loginuser,
   accesstoken,
    refreshtoken
},
"Successfully login in"
  )
)
  




}
export default Login