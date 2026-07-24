import { User } from "../models/users.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { Apihandler } from "../utils/Errorhandler.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"


const refreshToken = async (req, res) => {

const token =  req.cookies.refreshtoken
// {
//     "oldpassword": "12345678",
//     "newpassword": "ganesharyal"
// }

if(!token)
{
  throw new Apihandler(404, "unauthorized token ")
}

try {
  const decodedtoken = jwt.verify(token, process.env.REFRESH_TOKEN)
  
  if(!decodedtoken)
  {
    throw new Apihandler(404, "Notmatched token ")
  }
  
  const user = await User.findById(decodedtoken._id)
  
  if (!user) {
    throw new Apihandler(404, "Not found of user ")
  }
  
  const hashedtoken = crypto
  .createHash("sha256")
    .update(token)
  .digest("hex")
  
  
  if (user.refreshtoken !== hashedtoken) {
    throw new Apihandler(404, "Notmatched token ")
  }
  
     const newAccessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1h" }
      );
  
      const options = {
    httpOnly: true,
    secure: false
  }
  
  return res.status(200)
  .cookie("accesstoken", newAccessToken, options)
  
  
  .json(
    new ApiResponse(200,
  {
     newAccessToken
    
  },
  "Successfully install accesstoken"
    )
  )
  
} catch (error) {
   return res.status(401).json({ message: "Invalid refresh token" });
}

}
export default refreshToken