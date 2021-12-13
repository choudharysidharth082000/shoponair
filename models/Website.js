const mongoose = require('mongoose');

const {Schema} = mongoose;

const websiteSchema = new Schema(
    {
        userID:
        {
            type: String,
            required: true

        },

        siteName:{
            type:String,
            required:true
        },

        siteURL:{

            type:String,
            required:true

        },
        consumerKey:{
            type:String,
            required:true

        },

        consumerSecret:{
            type:String,
            required:true

        },
        websiteImage:
        {
            type: String,
            default: ''
        }
        
       

    },{timestamps: true}
)

const website = mongoose.model("website", websiteSchema);

exports.website=website;



