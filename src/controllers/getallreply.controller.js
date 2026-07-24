import { Comment } from "../models/comment.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { Apihandler } from "../utils/Errorhandler.js"

const Getallreply = async(req, res)=> {

  const {comment_id}= req.body

  if(!comment_id)
  {
    throw new Apihandler(404, "didnot found coment to reply")
  }

const allreply = await Comment.find({parent: comment_id})
 

// if(allreply.length === 0)
// {
//   throw new Apihandler(404, "didnot array of reply")
// }
//reply naaauna sakyo nii

return res.status(200).
json(new ApiResponse(
  200, allreply,
  "successfully getting all reply of parent comment"
))


}
export default Getallreply