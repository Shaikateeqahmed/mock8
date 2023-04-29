const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req,res,next)=>{
    let token = req.headers.authorization;
    jwt.verify(token,process.env.key,(err,decode)=>{
        if(err){
            res.send({"err":err.message});
        }else{
            let UserID = decode.UserID;
            req.body.UserID = UserID;
            next();
        }
    })
}

module.exports={authentication};