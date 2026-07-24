import mongoose from "mongoose"
import { Comment } from "../models/comment.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { Apihandler } from "../utils/Errorhandler.js"

const Getreplywithcomment = async(req, res)=> {

const video = req.params.video_id

if(!video)
{
  throw new Apihandler(404, "Not found video id to get the comment")
}

const replycomment = await Comment.aggregate([
  {
    $match: {
      video: new mongoose.Types.ObjectId(video),
      parent: null
    }
  },

   {
      $sort: { createdAt: -1 }
    },


  {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "parent",
      as: "replycomments",
      pipeline: [
{
    $sort: {
      createdAt: -1
    }
  },
  {
    $limit: 2
  }
      ]
    }
  },
 {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "parent",
      as: "allreplycomments",
    }

 },
 {
  $addFields: {
    totalsizereply: 
 {
  $size: "$allreplycomments"
 },
  }

 },

 {
  $project: {
allreplycomments: 0
  }
 }
  




])


return res.status(200).
json(new ApiResponse(
  200,
  replycomment,
  "Successfully getting reply comment"
))



}
export default Getreplywithcomment