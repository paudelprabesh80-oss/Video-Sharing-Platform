import mongoose from "mongoose"
import { User } from "../models/users.models.js"
import { ApiResponse } from "../utils/apiresponse.js"

const Getwatchhistory = async(req, res)=> {

const user = await User.aggregate([
  {
    $match: {
      _id: new mongoose.Types.ObjectId(req.user._id)
    }
  },
{
  $lookup: {
    from: "videos",
    localField: "watchhistory",
    foreignField: "_id",
    as: "watchhistory",
    pipeline: [
      {
  $lookup: {
    from: "users",
    localField: "owner",
    foreignField: "_id",
    as: "owner",
pipeline: [
  {
    $project: {
      fullName: 1,
      username: 1,
      avatar: 1,
    }
  }
]

  }
      }
    ]
  }
  
},

{
  $addFields: {
    owner: {
      $first: "$owner"
    }
  }
}
])
return res.status(200)
.json(
new  ApiResponse(
    200,
    user[0].watchhistory,
    "Successfully getting the data"
  )
)

}
export default Getwatchhistory