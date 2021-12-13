const express = require('express');
const router = express.Router();

//mongosoe models
const {user} = require('../../models/Auth');
const {website} = require('../../models/Website');

//getting alll the datas ,from the website

router.get('/getWebsites/:offset/:limit', async(req, res)=>
{
    const limit = parseInt(req.params.limit);
    const offset = (parseInt(req.params.offset)-1)* limit
    try {

        const websites = await website.find({},{},{sort:
        {
            'createdAt' : -1
        }}).limit(limit).skip(offset);

        if(!websites)
        {
            res.status(404).json(
                {
                    status: false.valueOf,
                    message: "Website Not Found"
                }
            )
        }
        else 
        {
            res.status(200).json(
                {
                    status: true,
                    data: websites
                }
            )
        }
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json(
            {
                
                status: false,
                message: "Error!!",
                error: error
            }
        )
    }
})


//getting all the websites by the particular auth id

router.get('/getWebsiteByUser/:userID/:offset/:limit', async(req, res)=>
{
    try {
        const limit = parseInt(req.params.limit); //limyit
        const offset = (parseInt(req.params.offset)-1) * limit //offset

        const findWebsites = await website.find({userID: req.params.userID}, {}, {sort:
        {
            'createdAt': -1
        }}).limit(limit).skip(offset);

        if(!findWebsites)
        {
            res.status(404).json(
                {
                    status: false,
                    message: "Website Not Found"
                }
            )

        }
        else
        {
            res.status(200).json(
                {
                    status: true,
                    data: findWebsites
                }
            )
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

//getting website by website ID
router.get('/getWebsiteByID/:websiteID', async(req, res)=>
{
    try {
        const findWebsite = await website.findOne({_id: req.params.websiteID});
        if(!findWebsite)
        {
            res.status(404).json(
                {
                    status: false,
                    message: "Website Not Found"
                }
            )
        }
        else 
        {
            res.status(200).json(
                {
                    status: true,
                    data: findWebsite
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


module.exports = router;