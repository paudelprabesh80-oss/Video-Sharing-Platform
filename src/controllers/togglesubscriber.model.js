import { Subsciber } from "../models/subscriber.models.js"


const ToggleSubscriber = async(req, res)=> {

const subscribe = req.user._id  

const channel = req.params.channel_id

const issubscribe = await Subsciber.findOne({
  subscribe, channel
})

if(issubscribe)
{
  await Subsciber.findByIdAndDelete(issubscribe._id)
}
else 
{
  await Subsciber.create({
    subscribe,
    channel
  })
}


return res.status(200).json({
  success: true,
  message: issubscribe ? "already subscribe" : "successfully subscribed",
    
})

}
export default ToggleSubscriber