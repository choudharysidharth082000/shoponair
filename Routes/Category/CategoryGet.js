const express = require('express');
const router = express.Router();

//models 
const {category} = require('../../models/Category');



router.get('/getAllCategory/:offset/:limit', async(req, res)=>
{
    const limit = parseInt(req.params.limit);
    const offset = (parseInt(req.params.offset)-1)* limit;
    try {
        const users = await category.find({},{},{sort:
        {
            'createdAt': -1
        }}).limit(limit).skip(offset);
        if(!users)
        {
            res.status(200).json(
                {
                    status: false,
                    message: "Category Not Found"
                }
            )
        }
        else 
        {
            res.status(200).json(
                {
                    status: true,
                    data: users
                }
            )
        }
        
    } catch (error) {
        
        console.log(error);
    }
})

//getting the progile by user id
router.get('/categoryGet/:categoryID', async(req, res)=>
{
    try {
        const user = await category.findOne({userID: req.params.categoryID});
        if(!user)
        {
            res.status(200).json(
                {
                    status: false,
                    message: "Category not found"
                }
            )
        }
        else 
        {
            res.status(200).json(
                {
                    status: true,
                    data: user
                }
            )
        }
        
    } catch (error) {
        
        console.log(error);
    }
})











module.exports = router;