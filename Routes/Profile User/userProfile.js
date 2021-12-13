const express = require('express');

const router = express.Router();
const upload = require('../../multer Configurations/multer');
const validateProfile = require('../../validators/profileValidator');
const {userProfile} = require('../../models/userProfile');
const {user} = require('../../models/Auth');
const fs = require('fs');

//files from the other folder 
const getProfiles = require('./getProfiles');

//adding the profiles of the user
router.post('/addProfile/:userID',upload.fields([
    {
        name: 'profileImage', maxCount: 1
    }
]), async(req, res)=>
{
    console.log(req.body);
    console.log(req.params.userID);

    console.log(req.files); //checking the request
    const {name, mobileNumber, facebookID, instagramID, whatsappNumber} = req.body; //data destructuring javascript
    //putting the values in the data field for the Joi Validtion
    const data = {name, mobileNumber, facebookID, instagramID, whatsappNumber};
    console.log(data);
    

    const resultFromJoi = validateProfile('name mobileNumber facebookID instagramID whatsappNumber', data);
    if(!resultFromJoi)
    {
        res.status(400).json(
            {
                status: false,
                message: "Invalid Credential Details"
            }
        )
    }
    else 
    {
        if(!req.files)
    {
        res.status(404).json(
            {
                status: false,
                messgage: "Profile Image is not given"
            }
        )
    }
    else 
    {
        try {

            const findUser = await user.findOne({_id: req.params.userID});
            const findProfile = await userProfile.findOne({userID: req.params.userID});
            
            if(!findUser)
            {
                res.status(404).json(
                    {
                        status: false,
                        message: "User Not Found"
                    }
                )
                try {
                    fs.unlinkSync(req.files.profileImage[0].path)
                    console.log(findUser);
                    
                } catch (error) {
                    
                    res.send(500).json(
                        {
                            status: false,
                            message: "Not Deleted",
                            error: error
                        }
                    )
                }
               
            }
            else if(findProfile)
            {
                res.status(400).json(
                    {
                        status: false,
                        message: "User Profile Already Present",
                        data: findProfile
                    }
                )
            }
            else 
            {
                const uploadProfile = await new userProfile(
                    {
                        userID: req.params.userID,
                        name: name,
                        mobileNumber: mobileNumber ,
                        whatsappNumber: whatsappNumber,
                        facebookID: facebookID,
                        instagramID: instagramID,
                        profilePhoto: req.files.profileImage[0].path

                    }
                )
                if(!uploadProfile)
                {
                    res.status(200).json(
                        {
                            status: false,
                            message: "User Not Created"
                        }
                    )
                }
                else 
                {
                    await uploadProfile.save();
                    res.status(200).json(
                        {
                            status: true,
                            message: "User Profile is Created",
                            data: uploadProfile
                        }
                    )
                }
            }
            
            
        } catch (error) {
            
            console.log(error);
        }

    }

    }

    
})



//edit profile for the user 
router.put('/editProfile/:userID', async(req, res)=>
{
    console.log(req.params.userID);
    console.log(req.body);
    //getting the data from the body
    const {name, mobileNumber, facebookID, instagramID, whatsappNumber} = req.body; //data destructuring javascript
    //putting the values in the data field for the Joi Validtion
    const data = {name, mobileNumber, facebookID, instagramID, whatsappNumber};
    console.log(data);
    

    const resultFromJoi = validateProfile('name mobileNumber facebookID instagramID whatsappNumber', data);
    if(!resultFromJoi)
    {
        res.status(400).json(
            {
                status: false,
                message: "Invalid Credential Details"
            }
        )
    }
    else 
    {
        try {

            //checking the user
            const findUser = await userProfile.findOne({_id: req.params.userID});
            if(!findUser)
            {
                res.status(404).json(
                    {
                        status: false,
                        message: "Profile Not Found For the User"
                    }
                )
            }
            else 
            {
                //edit the user profile
                const editProfile = await userProfile.updateMany({_id: req.params.userID}, 
                    {
                        name: name,
                        mobileNumber: mobileNumber,
                        facebookID: facebookID,
                        instagramID: instagramID,
                        whatsappNumber: whatsappNumber
                        
                    })

                    res.status(200).json(
                        {
                            status: true,
                            message: "User is Updated Successfully",
                            data: req.params.userID
                        }
                    )
            }
            
        } catch (error) {
            
            res.send(error);
        }

    }

    
})

//adding the profile og the user
router.put('/testAddProfile/:userID',upload.single('testProfileImage'), async(req, res)=>
{
    try {
        //destructuring the data from the request body
        const {name, mobileNumber, facebookID, instagramID, whatsappNumber} = req.body;
        


        //adding the fields to an obkect for the validation 
        const data = {name, mobileNumber, facebookID, instagramID, whatsappNumber}
        const resultFromJoi = validateProfile('name mobileNumber facebookID instagramID whatsappNumber', data);
        if(!resultFromJoi)
        {
            res.status(400).json(
                {
                    status: false,
                    message: "Validation Error",
                    
                }
            )
        }
        else 
        {
            //checking the user
            const findAuth = await userProfile.findOne({userID: req.params.userID});
            if(!findAuth)
            {
                console.log("Hello world")
                res.status(404).json(
                    {
                        status: false,
                        message: "User Not Found"
                    }
                )
            }
            else 
            {
                console.log(findAuth);
                //updating the profile of the user

                const updateUser = await userProfile.updateMany({userID: req.params.userID}, 
                    {
                        name: name,
                        mobileNumber: mobileNumber,
                        facebookID: facebookID,
                        instagramID: instagramID,
                        whatsappNumber: whatsappNumber

                    })
                    console.log(updateUser);



                    res.status(200).json(
                        {
                            status: true,
                            message: `Profile Updated for the User: ${findAuth.name}`,
                            
                        }
                    )
            }
            
        }

        
    } catch (error) {
        
        res.status(500).json(
            {
                status: false,
                error: error
            }
        )
    }

})






//delete the user Profile (Should be Used Carefully)

router.delete('/deleteProfile/:userID', async(req, res)=>
{
    try {
        const user = await userProfile.findOne({_id: req.params.userID});
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
            const deleteUser = await userProfile.findOneAndDelete({_id: req.params.userID});
            if(!deleteUser)
            {
                res.status(200).json(
                    {
                        status: false,
                        message : "User is not deleted"
                    }
                )
            }
            else 
            {
                res.status(200).json(
                    {
                        status: true,
                        message: "User is deleted Successfuly",
                        id: user._id
                    }
                )
            }
        }
        
        
    } catch (error) {

        console.log(error);
        
    }
})

//using the other folder routes

router.use(getProfiles);


module.exports = router
