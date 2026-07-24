
import { Dislike } from "../models/dislike.models.js"
import { Like } from "../models/liking.models.js"

const Togglelike = async(req, res)=> {

  const user = req.user._id
  const video = req.params.video_id

  const isliked = await Like.findOne({ user, video})
const isdislike = await Dislike.findOne({ user, video})

// if(isdislike)
// {

// }


if(isliked)
{
await Like.findByIdAndDelete(isliked._id)
}
else
{
  if(isdislike)
  {
 await Dislike.findByIdAndDelete(isdislike._id)
  }
await Like.create({
  user: user,
  video: video,
})
 

}

const likeCount = await Like.countDocuments({ video });



return res.status(200).json({
  success: true,
  message: isliked ? "Like removed" : "Like added",
    likeCount

})




}





export default Togglelike