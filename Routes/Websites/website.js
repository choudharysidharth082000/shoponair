const express = require('express');
const router = express.Router();

//validators 
const websiteValidator = require('../../validators/websiteValidator');

//mongoose models
const {user} = require('../../models/Auth');  //auth route
const {website} = require('../../models/Website'); //this it the website model for the mongoose
const upload = require('../../multer Configurations/multer')


//files 
const getWebsite = require('./getWebsite');


//adding the website
router.post('/addWebsite/:userID',upload.single('photo'), async(req, res)=>
{
    console.log(req.params.userID);
    
    console.log(req.file);
    try {
        //getting details from the request body
        const {siteName, siteURL, consumerKey, consumerSecret, discription} = req.body;
        console.log(req.body);

        const data = { siteName, siteURL, consumerKey, consumerSecret, discription};
        console.log(data);

        //validating through joi

        const resultFromJoi = websiteValidator('siteName siteURL consumerKey consumerSecret discription', data);

        if(!resultFromJoi)
        {
            console.log('Validation error');
            res.status(400).json(
                {
                    status: false,
                    message: "Validation Error"
                }
            )
        }
        else 
        {
            //cheching the user 
            const checkUser = user.find({_id: req.params.userID});
            if(!checkUser)
            {
                console.log("This is the error");
                res.status(404).json({
                    status: false,
                    message: "User not Found"
                })
            }
            else 
            {
                //creating the new website credentials
                const websiteCreate = await new website(
                    {
                        userID: req.params.userID,
                        siteName: siteName,
                        siteURL: siteURL,
                        consumerKey: consumerKey,
                        consumerSecret: consumerSecret,
                        discription: discription,
                        websiteImage: req.file.path
                    }
                )


                if(!websiteCreate)
                {
                    res.status(500).json(
                        {
                            status: false,
                            message: "Website is not Created"
                        }
                    )
                }
                else 
                {
                    
                    await websiteCreate.save();
                    console.log(websiteCreate);
                    res.status(200).json(
                        {
                            status: true,
                            message: "Website Created!!",
                            _id: websiteCreate._id
                            
                        }
                    )
                }


                
            }
            

            
        }

        
        
    } catch (error) {
        
        res.status(400).json(
            {
                status: false,
                error: error
            }
        )
        console.log(error);
    }
})


//editing the website

router.put('/editWebsite/:userID/:websiteID', async(req, res)=>
{
    try {

          //getting details from the request body
          const {siteName, siteURL, consumerKey, consumerSecret, discription} = req.body;
          console.log(req.body);
  
          const data = { siteName, siteURL, consumerKey, consumerSecret, discription};
          console.log(data);
  
          //validating through joi
  
          const resultFromJoi = websiteValidator('siteName siteURL consumerKey consumerSecret discription', data);
  
          if(!resultFromJoi)
          {
              res.status(400).json(
                  {
                      status: false,
                      message: "Validation Error"
                  }
              )
          }
          else 
          {
              //cheching the user 
              const checkUser = user.find({_id: req.params.userID});
              if(!checkUser)
              {
                  res.status(404).json({
                      status: false,
                      message: "User not Found"
                  })
              }
              else 
              {
                  //editing the new website credentials
                  const websiteCreate = await website.updateMany({userID: req.params.userID},
                      {
                          
                          siteName: siteName,
                          siteURL: siteURL,
                          consumerKey: consumerKey,
                          consumerSecret: consumerSecret,
                          discription: discription
                      }
                  )
  
  
                  if(!websiteCreate)
                  {
                      res.status(500).json(
                          {
                              status: false,
                              message: "Website is not Created"
                          }
                      )
                  }
                  else 
                  {
                      
                      await websiteCreate.save();
                      res.status(200).json(
                          {
                              status: true,
                              message: "Website Created!",
                              _id: "the is id jvnjknvre"
                              
                          }
                      )
                  }
  
  
                  
              }
            }
              
  
        

        
    } catch (error) {
        
        res.status(200).json(
            {
                status: false,
                message: "Error Occurred", 
                error: error
            }
        )
    }
})


//deleting the website (SHould be used Carefully)


router.delete('/deleteWebsite/:websiteID', async (req, res)=>
{
    try {

        const deleteWebsite = await website.findOneAndDelete({_id: req.params.websiteID});

        if(!deleteWebsite)
        {
            res.status(500).json(
                {
                    status: false,
                    message: "NOt Deleted"
                }
            )
        }
        else 
        {
            res.status(200).json(
                {
                    status: true,
                    message: "Website is deleted Successfully!!"
                }
            )
        }
        
    } catch (error) {
        
        res.status(200).json(
            {
                status: false,
                message: "Error!!",
                error: error
            }
        )
    }
})



//Getting Website Routes

router.use(getWebsite);

module.exports = router;