import mongoose from "mongoose";

const dislikeSchema = new mongoose.Schema({

user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
video: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Video"
}




})
dislikeSchema.index({user: 1, video: 1}, {unique: true})

export const Dislike = mongoose.model("Dislike", dislikeSchema)