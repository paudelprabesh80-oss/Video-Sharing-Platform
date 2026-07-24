
import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({
// likevideo: {




// },
user: {
   type: mongoose.Schema.Types.ObjectId,
        ref: "User"
},
video: {
   type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
}






})
likeSchema.index({ user: 1, video: 1 }, { unique: true })


export const Like = mongoose.model("Like", likeSchema)