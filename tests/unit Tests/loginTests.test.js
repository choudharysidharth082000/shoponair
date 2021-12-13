// const app = require("../../server");
// const mongoose = require("mongoose");
// const supertest = require("supertest");
// const dotenv = require('dotenv');
// const {userProfile} = require('../../models/userProfile');
// const { getMaxListeners } = require("superagent");
// dotenv.config();
// const test = process.env.DB





// beforeAll((done)=>
// {
//   mongoose.connect(test, ()=>
//   {
//     console.log('Connected DB');
//     done();
//   })
  

// })


// it('This to be this', ()=>
// {
//   expect('this').toBe('this')
// })


// describe('Checking the profile section of the Backend ', ()=>
// {
//   it('GET v1/profile/getAllProfiles/1/1', async ()=>
//   {
//     try {
//       await supertest(app).get('/v1/profile/getAllProfile/1/1').then((res)=>
//       {
//         expect(res.body.status).toBe(true)
//       }).catch((err)=>
//       {
//         console.log(err)
//       })
      
//     } catch (error) {
      
//       console.log(error);
//     }
    
//   })
// })


// // describe('Checking the profile GET apis for the app', ()=>
// // {
// //   beforeEach((done)=>
// //   {
// //     mongoose.connect('mongodb+srv://Admin:rtWHkM4nac7qmdT8@cluster0.hgylf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', ()=>
// //     {
// //       console.log('Test DB Connected')
// //       done()
// //     })
// //   })
// //   // afterEach(async (done)=>
// //   // {
// //   //   try {
// //   //     const deleteUser = await userProfile.findOneAndDelete({email: 'samplemail@getMaxListeners.com'})
      
// //   //   } catch (error) {
      
// //   //     console.log(error);
// //   //   }
// //   // })
// //   it('GET /v1/profile/GetProfile', async ()=>
// //   {
// //     await supertest(app).get('/v1/profile/getAllProfiles').then((response)=>
// //     {
// //       console.log(response.body);
// //       expect(response.body.status).toBe(true)

// //     })

// //   })
// // })


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
