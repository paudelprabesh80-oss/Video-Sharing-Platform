import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { Apihandler } from "../utils/Errorhandler.js";

const Userdetails = async(req, res)=>
{
const {username} = req.params;

if(!username)
{
  throw new Apihandler(404, "Couldnot found user" )
}
const channel =await User.aggregate([
{
$match: {
  username: username
}
},
{
$lookup: {
from: "subscribers",
  localField: "_id",
foreignField: "channel",
as: "subscriber"
}
},
{
$lookup: {
from: "subscribers",
  localField: "_id",
foreignField: "subscribe",
as: "tosubscribe"
}
},
{
$addFields: {

subscibercount: {
  $size: "$subscriber"
},

tosubscribecount: {
$size: "$tosubscribe"
},

issubscribedto: {
  $cond: {
    if: { $in: [
     { $toObjectId: req.user._id }, "$subscriber.subscribe"]},
    then: true,
    else: false
  }
}
}
},
{
  $project: {
    fullname: 1,
    username: 1,
    issubscribedto: 1,
    subscibercount: 1,
    tosubscribecount: 1,
    avatar: 1,
    cover: 1,
  }
}




])
if(!channel.length)
{
  throw new Apihandler(404, "doesnot match user id")
}






res.status(200)
.json(
  new ApiResponse(200,
    channel[0],
    "user channel fetch successfully"
  )
)


}
export default Userdetails