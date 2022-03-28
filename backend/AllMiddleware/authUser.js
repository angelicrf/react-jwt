const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../Models/userSchema")

const authorizeUser = asyncHandler(async (req,res,next) => {
   
    try {
        let thisToken;
        if(req.headers.authorization || req.headers.authorization.startsWith('Bearer')){
            thisToken = req.headers.authorization.split(' ')[1];
            if(thisToken){
            const verifyJWT = jwt.verify(thisToken, process.env.JWT_SECRET);
            const thisId = verifyJWT.id;
            req.meUser = await User.findOne({thisId}).select('-password');
            next()
        } else{
            res.status(400);
            throw new Error("No Token Found")
        }
        }    
    } catch (error) {
      console.log(error) ;
      res.status(400);
      throw new Error("Not Authorized")
    }

})
module.exports = {authorizeUser}