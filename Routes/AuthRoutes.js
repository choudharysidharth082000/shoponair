const express = require('express');
//models
const {user} = require('../models/Auth');
const {userProfile} = require('../models/userProfile');
const generateJWT = require('../utils/generateJWT')

const multer = require('multer');
const upload = multer()



const router = express.Router();


router.post('/login',async (req, res)=>
{
  console.log("Login IS Running");

  console.log("login ka data");
  console.log(req.body);
  // console.log(req.body);

  let arr=Object.keys(req.body);
  let k=arr[arr.length-1]
  console.log(req.body[k]);
  let obj=req.body[k];

  let brr=Object.keys(req.body[k]);

  // 1 index--> Name    4 index--> image 5 index--> email
  let uemail=obj[brr[5]];
  let uname=obj[brr[1]];
  let uphoto=obj[brr[4]];

  console.log(uemail+" "+uname+" "+uphoto);
  
 
   //* Initially checking if we have the user in our DB or not and if not then only er are pushing into DB */

  try {
    const userCheck = await user.findOne({email:uemail});

    const accessToken = generateJWT(userCheck);
    console.log(accessToken);
    if(userCheck)
    {
      res.status(200).json(
        {
          status: true,
          message: "Login In Success",
          _id: userCheck._id,
          data:userCheck,
          
          accessToken: accessToken
        }
      )
    }
    else 
    {
      console.log(req.body);
    const name=uname;
    
    const email=uemail // initiallly there was "it" instaed of Au
    const photo=uphoto
    const ip = req.socket.remoteAddress;

    const newUser= await new user({ name:name,email:email,photo:photo,ip:ip });


    if(!newUser)
    {
      res.status(200).json(
        {
          status: false,
          message: "User Not Added!!"
        }
      )
    }
    else 
    {
      console.log(newUser);

      try {
        const userProfileAdd = await new userProfile({userID: newUser._id, name: name, profilePhoto: photo });



        if(!userProfileAdd)
        {
          console.log("Internal Error");
          res.status(500).json(
            {
              status: false,
              message: "Profile Not Created!!"
            }
          )
        }
        else

        {
          await userProfileAdd.save();

        }
        
      } catch (error) {
        
        res.status(500).status(500).json(
          {
            status: false,
            message: "Error!",
            error: error
          }
        )
      }
      await newUser.save((err,data)=>{
        if(err)
        {
          console.log(err);
          
  
        }
  
        else{
          console.log(data);
          res.status(200).json(
            {
              status: false,
              message: "Signup Success!!",
              accessToken: generateJWT(newUser._id)
            }
          );
        }
  
      })

    }

    


  }

    
 } catch (error) {
    console.log(error);
    
  }
     
    
})


// getting user by id 
router.get('/getUserByID/:userID', async (req, res)=>
{
  try {
    const getUsers = await user.findOne({_id: req.params.userID});

    if(!getUsers)
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
      console.log(getUsers);
      res.status(200).json(
        {
          status: true,
          data: getUsers
        }
      )
    }
  } catch (error) {
    
    res.json(
      {
        status: false,
        message: "Error!!",
        error: error
      }
    )
  }
})


//getting users loggrf in

router.get('/getUsers/:offset/:limit', async(req, res)=>
{
  const limit = parseInt(req.params.limit);
  const offset = (parseInt(req.params.offset)-1)* limit
  try {

    const getUsers = await user.find().limit(limit).skip(offset);

    if(!getUsers)
    {
      res.status(404).json(
        {
          status: false,
          message: "Users Not Found"
        }
      )
    }
    else 
    {
      res.status(200).json(
        {
          status: true,
          data: getUsers
        }
      )
    }
    
  } catch (error) {
    
    res.status(500).json(
      {
        status: false,
        message: "Promise Not Resolved",
        error: error
      }
    )
  }
})

router.post('/testSample',upload.fields([]) ,(req, res)=>
{
  console.log(req.body.name);
  console.log(req.files);
  res.status(200).json(
    {
      status: true,
      message: "OK"
    }
  )
})


module.exports = router;