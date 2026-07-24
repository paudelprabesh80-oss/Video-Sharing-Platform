import {v2 as cloudinary} from "cloudinary"
import { ApiResponse } from "./apiresponse.js"

const deletefileCloudinary = async(id)=>
{
try {
  if(!id)
  {
    throw new ApiResponse(400, "Couldnot find id to delete the file")
  }

    const result = await cloudinary.uploader.destroy(id)
   return result
  
} catch (error) {
  throw new ApiResponse(400, error.message)
}
}
export default deletefileCloudinary