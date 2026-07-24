import { Comment } from "../models/comment.models.js"
import { Video } from "../models/video.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { Apihandler } from "../utils/Errorhandler.js"

const Postcomment = async(req, res)=> {

  
const user = req.user._id
const {id: video} = req.params

console.log(video)

const { text, reply, comment_id } = req.body;

console.log(text)

const foundvideo = await Video.findById(video)

if(!foundvideo)
{
  throw new Apihandler(404, "Didnot found video to post comment section")
}


if(!text && (!reply || !comment_id))
{
  throw new Apihandler(400, "Nothing to post (comment or reply missing)")
}






if(text && !comment_id)
{
 const newcomment = await Comment.create({
  user,
  video,
  text
})

return res.status(200).json(
  new ApiResponse(
    200, 
    newcomment,
    "successfully comment on the post"
  )
)

}

if(reply && comment_id)
{

  
const incomment = await Comment.findById(comment_id)


if(!incomment)
{
throw new Apihandler(404, "Not found comment to reply")
}


 const replycomment= await Comment.create({
  user,
  video,
text: reply,
parent: comment_id
})




return res.status(200).json(
  new ApiResponse(
    200,
    replycomment, 
    "success reply comment"

  )
)

}
throw new Apihandler(400, "Invalid request format")
}
export default Postcomment