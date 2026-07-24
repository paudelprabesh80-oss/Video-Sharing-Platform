import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
  videofileurl:{
    type: String,
  },
  videofile_id: {
     type: String,
  },
   thumbnailurl:{
    type: String,
  },
  thubnail_id:{
     type: String,
  },
  title: {
        type: String,
        required: true,
  },
  des: {
      type: String,
        required: true,
  },
   duration: {
      type: Number,
      default: 0,
 
  },
  view: {
     type: Number,
      default: 0,
  },
  ispublished: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  }
},{})


videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)