const express = require('express');
const router = express.Router();


//models 
const {user} = require('../../models/Auth');



//blocking the user
router.put('/blockUser/:userID', async(req, res)=>
{
    try {

        const {status} = req.body; //getting the status from the body

        const findUser = await user.findOne({_id: req.params.userID});
        if(!user)
        {
            res.status(404).json(
                {
                    status: false,
                    message: "User Not Found"
                }
            )
        }
        else{
            const updateStatus = await user.updateOne({isActive: status});

            res.status(200).json(
                {
                    status: true,
                    message: ` Status Updated for the User: ${findUser._id}`
                }
            )
    

        }

       

        
    } catch (error) {
        
        res.status(200).json(
            {
                status: false,
                message: "Error !!",
                error: error
            }
        )
    }
})

//delete User 
router.delete('/deleteUser/:userID', async (req, res)=>

{
    try {

        const userCheck = await user.findOne({_id: req.params.userID});
        if(!userCheck)
        {
            res.status(404).json(
                {
                    status: false,
                    message: "User Not Found"
                }
            )
        }
        else 
        {
            //deleting the user
            const deleteUser = await user.findOneAndDelete({_id: req.params.userID});
            if(!deleteUser)
            {
                res.status(200).json(
                    {
                        status: false,
                        message: "User Not Deleted"
                    }
                )
            }
            else{
                res.status(200).json(
                    {
                        status: true,
                        message: "User Deleted",
                        User: userCheck
                    }
                )
            }
        }
        
    } catch (error) {
        
        res.status(200).json(
            {
                status: false,
                message: "Error!!!",
                error: error
            }
        )
    }
})


module.exports = router;