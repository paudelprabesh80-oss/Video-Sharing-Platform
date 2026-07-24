import { Video } from "../models/video.models.js"
import { ApiResponse } from "../utils/apiresponse.js"

const Getvideo = async(_, res)=> {



const getvideo = await Video.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "owner",
      foreignField: "_id",
      as: "ownerinfo"
    }
  },
  {
$unwind: 
  "$ownerinfo"

  },

 {
  $project: {
    title: 1,
    des: 1,
    duration: 1,
    videofileurl: 1,
    thumbnailurl: 1,
 videofile_id: 1,
 thumbnail_id: 1,

    ownerinfo: { username: "$ownerinfo.username",
       profile: "$ownerinfo.profile" }
  }
  
 },
 { $sort: { createdAt: -1 } }
])

res.status(200)
.json(
  new ApiResponse(
    200, getvideo,
    "Successfully getting the video"
  )
)





}
export default Getvideo