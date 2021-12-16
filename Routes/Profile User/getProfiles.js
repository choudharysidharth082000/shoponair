const express = require('express');
const router = express.Router();


//mongoose models 

const {userProfile} = require('../../models/userProfile');
const {user} = require('../../models/Auth');


//getting all the profiles

router.get('/getAllProfiles/:offset/:limit', async(req, res)=>
{
    console.log(parseInt(req.params.offset))
    console.log(parseInt(req.params.limit))
    
    if(parseInt(req.params.offset) <= 0 || parseInt(req.params.limit) <= 0)
    {
        res.status(403).json(
            {
                status: false,
                message: "Invalid Offset or Limit"
            }
        )
    }
       
    else{
        const limit = parseInt(req.params.limit);
    const offset = (parseInt(req.params.offset)-1)* limit;

        try {
            const users = await userProfile.find({},{},{sort:
            {
                'createdAt': -1
            }}).limit(limit).skip(offset);
            if(!user)
            {
                res.status(200).json(
                    {
                        status: false,
                        message: "User Not Found"
                    }
                )
            }
            else 
            {
                res.status(200).json(
                    {
                        status: true,
                        users: users
                    }
                )
            }
            
        } catch (error) {
            
            console.log(error);
        }

    }
    
})

//getting the progile by user id
router.get('/profileGet/:userID', async(req, res)=>
{
    try {
        const user = await userProfile.findOne({userID: req.params.userID});
        if(!user)
        {
            res.status(200).json(
                {
                    status: false,
                    message: "User not found"
                }
            )
        }
        else 
        {
            res.status(200).json(
                {
                    status: true,
                    user: user
                }
            )
        }
        
    } catch (error) {
        
        console.log(error);
    }
})




module.exports = router;