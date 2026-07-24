
import { Video } from "../models/video.models.js"
import { ApiResponse } from "../utils/apiresponse.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import { Apihandler } from "../utils/Errorhandler.js"

const Postvideo = async(req, res)=> {

const {des, title, duration } = req.body


if (!des || !title)
{
  throw new Apihandler(400, "validation error ")
}

const videofile = req.files?.videofile?.[0]?.path

const thumbnail = req.files?.thumbnail?.[0]?.path

console.log(videofile)
console.log(thumbnail)


if(!videofile)
{
  throw new Apihandler(400, "Doesnot contain of video to upload")
}
if(!thumbnail)
{
  throw new Apihandler(400, "Doesnot contain of thumbnail to upload")
}


const videofileurl = await uploadOnCloudinary(videofile)


const thumbnailurl = await uploadOnCloudinary(thumbnail)

// console.log(videofileurl.public_id)



// const  videofile_id = videofileurl.public_id

// const thubnail_id = thumbnailurl.public_id

 if (!videofileurl || !thumbnailurl) {
    throw new Apihandler(500, "File upload failed")
  }

const video = await Video.create({

des,
title,
duration,
videofileurl: videofileurl.secure_url,
videofile_id: videofileurl?.public_id,
thumbnailurl: thumbnailurl.secure_url,
thumbnail_id: thumbnailurl?.public_id,
owner:req.user._id,
}

)


return res.status(201)
.json(
  new ApiResponse(
    201, video,
    "Successfully posted the video"
  )
)

}
export default Postvideo