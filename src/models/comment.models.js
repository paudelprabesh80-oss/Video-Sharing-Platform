import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
video: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Video"
},
text: {
type: String
},

parent: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Comment"
}




}, {timestamps: true})

 export const Comment = mongoose.model("Comment", commentSchema)