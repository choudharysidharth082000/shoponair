const mongoose = require('mongoose');

const {Schema} = mongoose;

const subcategories = new Schema(
    {
        categoryID:
        {
            type: String,
            required: true
        },
        nameSubCategory:
        {
            type: String,
            default: ''
        }       ,
        descsiptionSubCategory:
        {
            type: String,
            default: ''
        }
       

    },{timestamps: true}
)

const  subCategory = mongoose.model("subCategory", subcategories);

exports.subCategory = subCategory;



