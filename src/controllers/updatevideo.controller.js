import { Video } from "../models/video.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import deletefileCloudinary from "../utils/deletefile.js"
import { Apihandler } from "../utils/Errorhandler.js"
import { asynhandler } from "../utils/requesthandle.js"

const Updatevideo = asynhandler( async(req, res)=> {

  // const {videoid} = req.params
 



 const  {id: video_id}  = req.params

const {title, des, duration} = req.body 




const videolink = await Video.findById(video_id)

if(!videolink){
  throw new Apihandler(404, "Video not found")
}



if(videolink.owner.toString() !== req.user._id.toString())
{
  throw new Apihandler(403, "Unauthorized to change details of video")
}





const videofile = req.files?.videofile?.[0]?.path
const thumbnail = req.files?.thumbnail?.[0]?.path

// console.log(videofile)
// console.log
// if(!videofile || !thumbnail)
// {
//   throw new Apihandler(400, "Doesnot get of file")
// }
let videofileurl, thumbnailurl

if(videofile)
{
 videofileurl = await uploadOnCloudinary(videofile)

if(!videofileurl )
{
  throw new Apihandler(500, "Doesnot get url of video of url")
}
if(videolink.videofile_id)
{
  await deletefileCloudinary(videolink.videofile_id)
}
console.log(videofileurl)

videolink.videofileurl = videofileurl.secure_url
videolink.videofile_id = videofileurl.public_id


}

if(thumbnail)
{
 thumbnailurl = await uploadOnCloudinary(thumbnail)

if( !thumbnailurl)
{
 throw new Apihandler(500, "Doesnot get url of file of thumbnail") 
}

if(videolink.thumbnail_id)
{
  await deletefileCloudinary(videolink.thumbnail_id)
}

console.log(thumbnailurl)


videolink.thumbnailurl = thumbnailurl.secure_url

videolink.thumbnail_id = thumbnailurl.public_id

}



if(title !== undefined) videolink.title = title
if(des !== undefined) videolink.des = des
if(duration !== undefined) videolink.duration = duration



await videolink.save({validateBeforeSave: false})

console.log(videolink)

return res.status(200).json(
  new ApiResponse(200, videolink, "Successfully updated video")
)

})
export default Updatevideo