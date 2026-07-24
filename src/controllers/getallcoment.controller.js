import { Comment } from "../models/comment.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { Apihandler } from "../utils/Errorhandler.js"

const Getallcomment = async(req,res)=> {

const video = req.params.video_id


if(!video)
{
  throw new Apihandler(404, "Not found video id to get the comment")
}

const getcomment = await Comment.find({video})

if(getcomment.length === 0)
{
  throw new Apihandler(400, "didnot found comment to get")
}

return res.status(200).
json(new 
  ApiResponse(
    200,
    getcomment,
    "Successfully getting all comments"
  )
)




}
export default Getallcomment