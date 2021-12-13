const express = require('express');
const router = express.Router();

//models 
const {subCategory} = require('../../models/subCategory');


//get apis
const getSubCategory = require('./SubCategoryGet');

//creatinf category
router.post('/createSubCategory', async (req, res)=>
{
    try {
        const createCategory = await new subCategory(req.body);
        if(!createCategory)
        {
            res.status(500).json(
                {
                    status: false,
                    message: "Sub Category Not  Created"
                }
            )
        }
        else 
        {
            await createCategory.save();
            res.status(200).json(
                {
                    status: true,
                    message: "Sub Category Created!!",
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
//update  category
router.put('/updateSubCategory/:subCategoryID', async (req, res)=>
{
    try {
        const createCategory = await category.findOneAndUpdate(req.params.subCategoryID,
            {
                nameCategory: req.body.nameCategory,
                descriptionCategory: req.body.descriptionCategory,
            });
        if(!createCategory)
        {
            res.status(500).json(
                {
                    status: false,
                    message: "Sub Category Not  Updated"
                }
            )
        }
        else 
        {
        
            res.status(200).json(
                {
                    status: true,
                    message: "Sub Category Updated!!",
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
router.delete('/deleteSubCategory/:subCategoryID', async (req, res)=>
{
    try {
        const createCategory = await category.findOneAndDelete(req.params.subCategoryID);
        if(!createCategory)
        {
            res.status(500).json(
                {
                    status: false,
                    message: "Sub Category Not  Deleted"
                }
            )
        }
        else 
        {
        
            res.status(200).json(
                {
                    status: true,
                    message: "Sub Category Deleted!!",
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