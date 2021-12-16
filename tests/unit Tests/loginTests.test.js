const app = require("../../server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const dotenv = require('dotenv');
const {userProfile} = require('../../models/userProfile');
const { getMaxListeners } = require("superagent");
dotenv.config();
const test = process.env.DB
const bodyParser = require('body-parser');







//Connect The Database Before the working of all test
beforeAll((done)=>
{
  //body parser configurations 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

  mongoose.connect(test, ()=>
  {
    console.log('Connected DB');
    done();
  })
  

})
// After all the tests are finished then disconnect the Database
afterAll((done)=>
{
    mongoose.connection.close();
    done();
})


it('This to be this', ()=>
{
  expect(true).toBe(true)
})


//Testing the profile Route in the backend

describe('Checking the profile GET apis for the app', ()=>
{
  //checking the api for all Users Profiles (GET v1/profile/getALLProfiles/1/1)
  
  it('GET /v1/profile/GetProfile', async ()=>
  {
    await supertest(app).get('/v1/profile/getAllProfiles/1/2').then((response)=>
    {
      
      expect(response.body.status).toBe(true)

    })

  })


  //checking the api for get profile by user ID
  it('GET /v1/profile/profileGet/61a8e2b25e34ccab82003764', async ()=>
  {
    try {
      const checkAPI = await supertest(app).get('/v1/profile/profileGet/61a8e2b25e34ccab82003764');

      if(!checkAPI)
      {
        console.log(error);
      }
      else
      {
        
        expect(checkAPI.body.status).toBe(true);
      }
      
    } catch (error) {
      
      console.log(error);
    }
  })
})


//checking the user profile post apis
describe('POST APIS for the user Profile',  ()=>
{
  // //creating the user profile
  // it('POST v1/addProfile/:userID', async()=>
  // {
  //   let data = 
  //   {
  //     name: "Sidharth",
  //     mobileNumber: "7838777716",
  //     facebookID: "This is the facebook",
  //     instagramID: "This is the instagram",
  //     whatsappNumber: "9711599446"
  //   }
  //   try {
  //     const checkTest = await supertest(app).post('/v1/addProfile/61a8e2b25e34ccab82003764').send(data).attach('profileImage', 'images\1638529672283---WhatsApp Image 2021-10-20 at 22.09.31.jpeg');

  //     if(!checkTest)
  //     {
  //       throw new Error('Cannot Post to the add profile api');
  //     }
  //     else 
  //     {
  //       console.log(checkTest.body);
  //       expect(checkTest.body.status).toBe(true);
  //     }

      
  //   } catch (error) {
      
  //     console.log(error);
  //   }
  // })
  //editing the user profile
  it('PUT v1/addProfile/:userID', async()=>
  {
    let data = 
    {
      name: "Sidharth",
      mobileNumber: "7838777716",
      facebookID: "This is the facebook",
      instagramID: "This is the instagram",
      whatsappNumber: "9711599446"
    }
    try {
      console.log(data);
      const checkTest = await supertest(app).put('/v1/profile/editProfile/61a8e2b25e34ccab82003764').send(data);

      if(!checkTest)
      {
        throw new Error('Cannot Post to the add profile api');
      }
      else 
      {
        
        expect(checkTest.body.status).toEqual(true);
      }

      
    } catch (error) {
      
      console.log(error);
    }
  })

})

it('GET Invalid Api data (should give an error)', async()=>
{
  try {
    await supertest(app).get('/v1/profile/getAllProfile/1/0').
    then((res)=>
    {
      console.log(res.body);
    }).catch((error)=>
    {
      console.log(error);
    })


  
    
  } catch (error) {
    
    console.log(error);
  }
})


it('GET v1/profile/profileGet/61a8e2b25e34ccab82003763', async()=>
{
  try {
    const getUser = await supertest(app).get('/v1/profile/profileGet/61a8e2b25e34ccab82003763');

    if(!getUser)
    {
      console.log("User Not Found");

    }
    else 
    {
      
      expect(getUser.body.status).toBe(false);

    }
    
  } catch (error) {
    
    console.log(error);
  }
})

it('Checking the failure of the Edit API with wrong User ID', async()=>
{
  try {
    const data = {
      name: 'Sidharth'
    }
    

    const editUser = await supertest(app).put('/v1/profile/editProfile/61a8e2b25e34ccab82003763').send(data);

    if(!editUser)
    {
      console.log("Api not Worked")
    }
    else
    {
      
      expect(editUser.body.status).toBe(false);
    }
  } catch (error) {
    
    
    console.log(error);
  }
})



it('Checking the User with Invalid Credentials', async ()=>
{
  try {
    const data = 
    {
      name: "Sidharth"
    }
    const editUser = await supertest(app).put('/v1/editProfile/61a8e2b25e34ccab82003763').send(data);

    if(!editUser)
    {
      console.log("Api is not Working")
    }
    else 
    {
      
      expect(editUser.body.status).toBe(false);

    }
    
  } catch (error) {
    
    console.log(error);
  }
})



// // describe('Testing the post apis for the server', ()=>
// // {
// //   beforeEach((done)=>
// //   {
// //     mongoose.connect('mongodb+srv://Admin:rtWHkM4nac7qmdT8@cluster0.hgylf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', ()=>
// //     {
// //       console.log('Test DB Connected')
// //       done()
// //     })
// //   })

// //   let data = {
// //     name: "Sidharth",
// //     mobileNumber: "7838777716",
// //     facebookID: "https://facebook.com",
// //     instagramID: "https://instagram.com",
// //     whatsappNumber: "7838888816",
// //     profileImage: "jnkjnjvdjkv"
// // }

// // it('POST /v1/profile/addProfile/wrong url', async ()=>
// // {
// //   await supertest(app)
// //   .post("/v1/profile/addProfile/61766e443744277f906d8024")
// //   .send(data)
// //   .expect(200)
// //   .then(async (response) => {
// //     // Check the response
// //     console.log(response.body);
// //     expect(response.body.status).toBe(false)
    
// //   })

// // })

// // })
