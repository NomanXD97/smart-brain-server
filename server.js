const express = require('express');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'aziz22222222',
    database : 'smart_brain'
  }
});



const app=express();
app.use(bodyParser.json());
app.use(cors());

// const database={
// 	users:[

// 		{
// 			id:"111",
// 			name: "Noman",
// 			email:"noman@infosoft.com",
// 			password: "cookies",
// 			entries:0,
// 			joined: new Date()
// 		},

// 		{
// 			id:"112",
// 			name: "Saad",
// 			email:"saad@infosoft.com",
// 			password: "pie",
// 			entries:0,
// 			joined: new Date()

// 		}


// 	]
// }



app.get('/',(req,res)=>{

// 	res.json(db('users'));
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

//app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



app.listen(3000, ()=>{

	console.log('App is running on porte 3000');
})


/*

/----> res = this is working
/signin ---> POST = success/failure
/register ---> POST = user
/profile/:userID ---> GET =user
/image ---->PUT ---> user

*/
