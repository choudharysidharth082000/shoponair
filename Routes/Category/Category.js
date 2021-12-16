const express = require('express');
const router = express.Router();

//models 
const {category} = require('../../models/Category');


//get apis
const getCategory = require('./CategoryGet');

//creatinf category
router.post('/createCategory', async (req, res)=>
{
    console.log(req.body);
    try {
        const createCategory = await new category(
            {
                nameCategory: req.body.nameCategory,
                descriptionCategory:req.body.descriptionCategory
            }
        );
        if(!createCategory)
        {
            res.status(500).json(
                {
                    status: false,
                    message: "Category Not  Created"
                }
            )
        }
        else 
        {
            await createCategory.save();
            res.status(200).json(
                {
                    status: true,
                    message: "Category Created!!",
                    data: createCategory
                }
            )
        }
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json(
            {
                status: false,
                message: "Error",
                error: error
            }
        )
    }
})
//update  category
router.put('/updateCategory/:categoryID', async (req, res)=>
{
    try {
        const createCategory = await category.findOneAndUpdate(req.params.categoryID,
            {
                nameCategory: req.body.nameCategory,
                descriptionCategory: req.body.descriptionCategory,
            });
        if(!createCategory)
        {
            res.status(500).json(
                {
                    status: false,
                    message: "Category Not  Updated"
                }
            )
        }
        else 
        {
        
            res.status(200).json(
                {
                    status: true,
                    message: "Category Updated!!",
                    data: createCategory
                }
            )
        }
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json(
            {
                status: false,
                message: "Error",
                error: error
            }
        )
    }
})
//delete  category
router.delete('/deleteCategory/:categoryID', async (req, res)=>
{
    try {
        const createCategory = await category.findOneAndDelete(req.params.categoryID);
        if(!createCategory)
        {
            res.status(500).json(
                {
                    status: false,
                    message: "Category Not  Deleted"
                }
            )
        }
        else 
        {
        
            res.status(200).json(
                {
                    status: true,
                    message: "Category Deleted!!",
                    data: createCategory
                }
            )
        }
        
    } catch (error) {
        
        res.status(500).json(
            {
                status: false,
                message: "Error",
                error: error
            }
        )
    }
})

//get apis for the category
router.use(getCategory);



module.exports = router;