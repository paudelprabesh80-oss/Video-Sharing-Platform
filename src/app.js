import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
 const app=  express()

 app.use(cors())
 app.use(cookieParser())

 app.use(express.json({limit: "16kb"}))

 app.use(express.urlencoded({extended: true,
  limit: "16kb"
 }))
 app.use(express.static("public"))
import userRouter from "./routes/user.routes.js"


app.use("/api", userRouter)

app.use((err, req, res, next) => {
   console.error(err);
  res.status(err.statuscode || 500).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
    data: err.data || null
  })
})


 export default app