import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const uploadOnCloudinary = async (localfilepath) =>
{
  try {
  
  if(!localfilepath) return null

  const response = await cloudinary.uploader.upload(localfilepath,
    {
      resource_type: "auto"
    }
  )
  fs.unlinkSync(localfilepath)

  console.log(response)


return { secure_url: response.secure_url, public_id: response.public_id };

// return response

  } catch (error) {
    fs.unlinkSync(localfilepath)
    return null
  }
}





export default uploadOnCloudinary
