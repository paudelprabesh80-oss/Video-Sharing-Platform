import { Dislike } from "../models/dislike.models.js"
import { Like } from "../models/liking.models.js"

const Toggledislike = async(req, res)=> {

const user = req.user._id
const video = req.params.video_id

const isdislike = await Dislike.findOne({user, video})

const isliked = await Like.findOne({user, video})


if(isdislike)
{
await Dislike.findByIdAndDelete(isdislike._id)
}
else
{

if (isliked) {
  await Like.findByIdAndDelete(isliked._id)
}

await Dislike.create({
user,
video
})

}
const dislikeCount = await Dislike.countDocuments({ video })

return res.status(200).json({
  success: true,
  message: isdislike ? "Dislike removed" : "Dislike added",
  dislikeCount
})


}
export default Toggledislike