import { Video } from "../models/video.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { Apihandler } from "../utils/Errorhandler.js"
import mongoose from "mongoose"

const Getsinglevideo = async(req, res)=> {
console.log(req.params)

const video_id = req.params

if(!video_id)
{
  throw new Apihandler(400,
    "Doesnot get id to load the video"
  )
}
const singlevideo = await Video.aggregate([

{
  $match: {
_id: new mongoose.Types.ObjectId(video_id)
  }
},
  {
    $lookup: {
      from: "users",
      localField: "owner",
      foreignField: "_id",
      as: "ownersingleinfo"
    }
  },
  {
    $unwind: "$ownersingleinfo"
  },
  {
    $project: {
      title: 1,
      des: 1,
       duration: 1,
       videofileurl: 1,
    thumbnailurl: 1,
ownersingleinfo: {
  username: "$ownersingleinfo.username"
  , profile: "$ownersingleinfo.profile"
}
    }
  }
])
if(!singlevideo.length)
{
  throw new Apihandler(404,
    "video didnot found"
  )
}
res.status(200)
.json(new
  ApiResponse(200,
    singlevideo[0],
    "Successfully fetched single video"
  )
)

}
export default Getsinglevideo