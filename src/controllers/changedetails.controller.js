import { User } from "../models/users.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { Apihandler } from "../utils/Errorhandler.js"

const changeDetail = async(req, res)=> {

  const {fullName, email} = req.body

  console.log(req.user._id)
if(!fullName?.trim() || !email?.trim())
{
  throw new Apihandler(400, "fullname and email are required to change the field")
}
if (!email.includes("@")) {
  throw new Apihandler(400, "invalid email")
}
const user = await User.findByIdAndUpdate(req.user._id,
  {
    $set: {
    fullName: fullName,
    email: email
    }
  },
{
  new: true
}
  
).select("-password")

if(!user)
{
    throw new Apihandler(400, "user didnot found")
}
res.status(200)
.json(
  new ApiResponse(200, user, "succesfully change details ")
)
}
export default changeDetail