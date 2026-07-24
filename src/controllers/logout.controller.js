import { User } from "../models/users.models.js";
import { Apihandler } from "../utils/Errorhandler.js";
const Logout = (req, res)=> {

const userid = req.user._id;

const user = User.findByIdAndUpdate(userid, {
  $set: {
refreshtoken: undefined
  }
},
  {
    new: true
  }

)


if(!user)
{
  throw new Apihandler(404, "user didnot found")
}

const options = {
  httpOnly: true,
  secure: false
}
  res.status(200)
  .clearCookie("accesstoken", options)
  .clearCookie("refreshtoken", options)
  .json({
    message: "Logout successful"
  });

}




export default Logout