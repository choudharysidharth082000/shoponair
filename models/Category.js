const mongoose = require('mongoose');

const {Schema} = mongoose;

const categories = new Schema(
    {
        nameCategory:

        {
            type: String,
            default: ''
        },
        descriptionCategory:
        {
            type: String,
            default: ''
        }
       
       

    },{timestamps: true}
)

const category = mongoose.model("category", categories);

exports.category = category;



