const mongoose = require('mongoose');

const {Schema} = mongoose;

const userProfiles = new Schema(
    {
        userID:
        {
            type: String,
            required: true

        },
        name: {
            required: false,
            type: String,
            min:3
        },

        mobileNumber: 
        {
            required: false,
            type: String,
            min: 10,
            max: 10
        },

        profilePhoto:{

            required:false,
            type:String

        },
        facebookID:
        {
            type: String,
            default:''
        },
        instagramID:
        {
            type: String,
            default: ""
        },
        whatsappNumber:
        {
            type: String,
            default :""
        }
        ,
        isActive: 
        {
            type: Boolean,
            default: true
        }
       
       

    },{timestamps: true}
)

const userProfile = mongoose.model("userProfile", userProfiles);

exports.userProfile = userProfile;



