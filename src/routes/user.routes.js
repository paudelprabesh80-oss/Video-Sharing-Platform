import { Router } from "express";
import registeruser from "../controllers/register.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import Login from "../controllers/login.controller.js";
import verifyJWT from "../middlewares/verify.auth.middleware.js";
import Logout from "../controllers/logout.controller.js";
import refreshToken from "../controllers/refreshtoken.controller.js";
import changePassword from "../controllers/changepassword.controller.js";
import changeDetail from "../controllers/changedetails.controller.js";
import changeCover from "../controllers/changecover.controller.js";
import changeAvatar from "../controllers/changeavatar.controller.js";
import Userdetails from "../controllers/getuserprofiledetail.controller.js";
import Getwatchhistory from "../controllers/getwatchhistory.controller.js";
import Postvideo from "../controllers/postvideo.controller.js";
import Getvideo from "../controllers/getvideo.controller.js";
import Getsinglevideo from "../controllers/getsinglevideo.controller.js";
import Updatevideo from "../controllers/updatevideo.controller.js";
import Postcomment from "../controllers/postcomment.controller.js";
import Getallcomment from "../controllers/getallcoment.controller.js";
import Getallreply from "../controllers/getallreply.controller.js";
import Getreplywithcomment from "../controllers/getreplycomment.controller.js";
import Togglelike from "../controllers/togglelike.controller.js";
import Toggledislike from "../controllers/toggle.dislike.js";
import ToggleSubscriber from "../controllers/togglesubscriber.model.js";
const router = Router()

router.post("/register",
  upload.fields([
    {
name: "avatar",
maxCount: 1
  },
  {
    name: "coverimage",
    maxCount: 1
  }
]),
  
  registeruser)


router.post("/videos",
  verifyJWT,
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1
    },
    {
      name: "videofile",
      maxCount: 1
    }
  ]),
  Postvideo
)





//in register it required of multiple field so it has .field of avatar and coveriamge
  
router.post("/login", 
  Login
)

// router.post("/addtocomment", verifyJWT, (req, res)=>
// {
//   const userId = req.user.id
// res.json({
//   message: "you can comment", userId
// })



// })


router.post("/logout", verifyJWT, Logout)


router.post("/refreshtoken", refreshToken)

router.patch("/changepassword", verifyJWT,
  changePassword
)
router.patch("/changedetails", verifyJWT,
  changeDetail
)

router.patch("/changecover", verifyJWT,
   upload.single("coverimage"), 
  changeCover
)
//in these .single because it has send only coverimage 
router.patch("/changeavatar", verifyJWT,
  upload.single("avatar"), 
  changeAvatar
)
router.get("/users/:username", verifyJWT,
  Userdetails
)
//with : you can pass anything

router.get("/watchhistory", verifyJWT,
  Getwatchhistory
)

router.get("/videos", 
  Getvideo
)

router.get("/videos/:id", Getsinglevideo)

router.patch(
  "/updatevideos/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "videofile", maxCount: 1 }
  ]),
  verifyJWT,
  Updatevideo
)


router.post("/videos/:id/comments", verifyJWT,
  Postcomment
)

router.get("/videos/:id/comments", 
  Getallcomment
)
router.get("/comments/:id",
  Getreplywithcomment
)
router.get("/comments/:id/replies", 
  Getallreply
)

router.patch("/videos/:id/like", verifyJWT, Togglelike)
router.patch("/videos/:id/dislike", verifyJWT, Toggledislike)

router.patch("/channel/:id/subscribe", verifyJWT, ToggleSubscriber)



export default router