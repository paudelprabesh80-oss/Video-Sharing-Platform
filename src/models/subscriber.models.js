import mongoose from "mongoose";


const subsciberSchema = new mongoose.Schema({

subscribe: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "User"
},

channel: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "User"
}




})
subsciberSchema.index({subscribe: 1, channel: 1 }, {unique: true})


export const Subsciber = mongoose.model("Subsciber", subsciberSchema)