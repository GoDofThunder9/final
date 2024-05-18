const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createsession = async function(req,res)
{
     try {
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password)
        {
            return res.status(422).json(
                {
                   message: "invalid input by user and password" 
                }
                 );
        }
        return res.status(200).json(
            {
               message: "sign in succesfully and session is on ",
               Date : {
                  token : jwt.sign(user.toJSON(),'codeial',{expiresIn: '100000'})
               }
            }
             );
     } 
     catch (error) {
        console.log('*****',err);
      return res.status(500).json(
     {
        message: "internal server error" 
     }
      );
    }
    
}