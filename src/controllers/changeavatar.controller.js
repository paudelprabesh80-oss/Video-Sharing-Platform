import { User } from "../models/users.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import { Apihandler } from "../utils/Errorhandler.js"

const changeAvatar = async(req, res)=> {

  const avatar = req.file?.path

if(!avatar)
{
  throw new Apihandler(400, "Required of avatar to change the avatar field")
}
const avatarpath = await uploadOnCloudinary(avatar)

if(!avatarpath.secure_url)
{
   throw new Apihandler(400, "Doesnot contain of avatarpath")
}

const user = await User.findById(req.user._id).select("-password")

  if (!user) {
    throw new Apihandler(404, "user not found")
  }

 if (user.avatarPublicId) {
    await deletefileCloudinary(user.avatarPublicId)
  }



user.avatar = avatarpath.secure_url;
user.avatarPublicId = avatarpath.public_id;

await user.save({ validateBeforeSave: false })







// const user = await User.findByIdAndUpdate(req.user.id,
//   {
//     $set: {
//       avatar: avatarpath.url
//     }
//   },
// {
//   new: true
// }
  
// ).select("-password")

// if(!user)
// {
//     throw new Apihandler(400, "user didnot found")
// }
res.status(200)
.json(
  new ApiResponse(200, user, "succesfully change avatar file")
)
}
export default changeAvatar