import { Video } from "../models/video.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import deletefileCloudinary from "../utils/deletefile.js"
import { Apihandler } from "../utils/Errorhandler.js"

const Deletefile = async(req, res)=> {


  const{ video_id}= req.params

const deletevideo = await Video.findById(video_id)

if (!deletevideo)
{
  throw new Apihandler(404, "Didnot found user")
}

if(deletevideo.owner.toString() !== req.user._id.toString())
{
  throw new Apihandler(403, "unauthorized owner to:")
}

if(deletevideo.videofile_id)
{
  await deletefileCloudinary(deletevideo.videofile_id)
}
if(deletevideo.thumbnail_id)
{
    await deletefileCloudinary(deletevideo.thumbnail_id)
}


await Video.findByIdAndDelete( video_id)



res.status(200).
json( new ApiResponse(
  200, 
  null,
  "Successfully delete file"
))

}
export default Deletefile