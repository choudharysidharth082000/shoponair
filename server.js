// Importing Stuff
const { application } = require("express");
const express=require("express");
const mongoose=require("mongoose");
const AuthRoutes=require("./Routes/AuthRoutes");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv = require('dotenv');
const YAML = require('yamljs')
var WooCommerceAPI = require('woocommerce-api');

const userProfile = require('./Routes/Profile User/userProfile')
const website = require('./Routes/Websites/website');
const admin = require('./Routes/admin/adminPanel');
const category = require('./Routes/Category/Category');

// Dotenv Stuff
dotenv.config();
const port = process.env.PORT;
const db = process.env.DB;


//App Stuff
const app=express();



//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



//swagger Configutation


const swaggerUI = require('swagger-ui-express');

const swaggerJsDocs= YAML.load('./api.yaml');



//DB Stuff
const test = process.env.DB
console.log(test);

mongoose.connect(db,()=>
{
    console.log("Database in connected Successfully");
})

var WooCommerce = new WooCommerceAPI({
  url: 'http://localhost:3000',
  consumerKey: 'ck_e54f3092504ceba7148656fb81dc5418b535603a',
  consumerSecret: 'cs_c3c0b4a23f1f099da1636376a5ef3ff9447787dc',
  wpAPI: true,
  version: 'wc/v1'
});


// Routes
app.get("/",(req,res)=>{

 
  
res.send("ok");

});





// WOO Commerce API START


 




// WOO Commerce API ENDS


//static images 

app.use('/images', express.static('images'))


app.get('/testSample',async (req, res)=>
{
  
  res.status(200).json(
    {
      status: true,
      message: "OK"
    }
  )
})


//routes from the router
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use('/v1/auth',AuthRoutes); //Auth Routes
app.use('/v1/profile', userProfile); //Adding the profile Route
app.use('/v1/website', website); //Website Route
app.use('/v1/admin', admin); //Admn Panel Route
app.use('/v1/category', category); //category Panel Route
console.log(port);


//Listeners
module.exports = app;

