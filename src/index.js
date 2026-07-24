

import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./dB/server.js";

dotenv.config({
  path: './.env'
});
// const app=  express()
const port = process.env.PORT || 3000;

connectDB()
.then(() =>
{
  app.listen(port, ()=>
  {
    console.log(`Data succesfully loaded on site ${port} `)
  })
})
.catch((err)=>
{
console.log("the data didnot load on server", err.message)
 process.exit(1)
})



// (  async ()=>
// {
//   try {
//    await mongoose.
//     connect(`${process.env.MONGO_URI}/${Db_name}`)

// console.log("succesfully connected")

//  app.listen(port, ()=>
//  {
//  console.log(`the server is running ${port}`)
//  })

//   } catch (error) {
//     console.log("the error is", error)
//   }
// }

// )()






// mongoose.
// connect(process.env.MONGO_URI, {
//      useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(()=> console.log("succesfully connect the database"))
// .catch((err)=>
//   console.log("the error is : ",err)
// )
// app.get("/", (req,res)=>
// {
//   res.send("the file is loaded")
// })

// app.listen(port, ()=>
// {
// console.log(`the server is running ${port}`)
// })