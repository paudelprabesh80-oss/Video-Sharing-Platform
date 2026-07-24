import { User } from "../models/users.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import deletefileCloudinary from "../utils/deletefile.js"



import { Apihandler } from "../utils/Errorhandler.js"

const changeCover = async(req, res)=> {

  const coverimage = req.file?.path

if(!coverimage)
{
  throw new Apihandler(400, "Required of cover image to change the cover image field")
}
const coverpath = await uploadOnCloudinary(coverimage)

if(!coverpath.secure_url)
{
   throw new Apihandler(400, "Doesnot contain of coverpath")
}



// deletefileCloudinary(coverpath.url)
const user = await User.findById(req.user._id).select("-password")

  if (!user) {
    throw new Apihandler(404, "user not found")
  }

 if (user.coverimageid) {
    await deletefileCloudinary(user.coverimageid)
  }



user.coverimage = coverpath.secure_url;
user.coverimageid = coverpath.public_id;

await user.save({ validateBeforeSave: false })

// const user = await User.findByIdAndUpdate(req.user.id,
//   {
//     $set: {
//    coverimage: coverpath.url,
//    coverimageid: coverpath.id
//     }
//   },
// {
//   new: true
// }
  
// ).select("-password")


// if(!user)
// {
//     throw new Apihandler(400,user, "user didnot found")
// }




res.status(200)
.json(
  new ApiResponse(200, user, "succesfully change cover image file")
)
}
export default changeCover