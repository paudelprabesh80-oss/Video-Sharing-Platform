import jwt from "jsonwebtoken"
const verifyJWT = (req, res, next)=>
{
console.log(req.cookies.accesstoken)
const token =   req.cookies?.accesstoken
// req.header?.authorization ||

if(!token)
{
   return res.status(401).json({ message: "Invalid token" });
 
}
// const actualtoken = token.replace("Bearer ", " ")

 try {
    const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN);
    
    console.log(decodedtoken)

    req.user = decodedtoken; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

}


export default verifyJWT