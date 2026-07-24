import { User } from "../models/users.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { Apihandler } from "../utils/Errorhandler.js"

const changePassword = async(req, res)=> {

  const {oldpassword, newpassword} = req.body

if(!oldpassword || !newpassword)
{
  throw new Apihandler(400, "old password and new password are required to change the password")
}



const user = await User.findById(req.user._id)

console.log(user)

if(!user)
{
    throw new Apihandler(400, "user didnot found")
}
const ispasswordmatch = await user.comparePassword(oldpassword)

if(!ispasswordmatch)
{
  throw new Apihandler(400, "Password didnot match")
}
user.password = newpassword

await user.save({ validateBeforeSave: false })


res.status(200)
.json(
  new ApiResponse(200, {}, "succesfully change password")
)
}
export default changePassword