const express = require('express');
const Router = express.Router();
const homeSchema= require('../models/homeSchema')

Router.get('/register',(err, res)=>{
  res.render('register',{title :'Fill Form', password:'', email:''})
})

Router.post('/register', async(req,res)=>{
  try{
      const {
        name,
        number,
        email,
        password,
        cpassword
      } = req.body;

      // console.log(name)
    if(password === cpassword ){
      const userData = new homeSchema({
        name,
        number,
        email,
        password
      })
      userData.save(err=>{
        if(err){
          console.log('err')
        }else{
          res.render('register',{title :'Done', password:'', email:''})
        }
      })
    
      const useremail = await homeSchema.findOne({email:email});
      // console.log(useremail.email)
      if(email === useremail.email){
        res.render('register',{title :'', password:'', email:'Email is already used pls choose different one'})
      }else{
        console.log('err')
      }

    }else{
      res.render('register',{title :'', password:'Password is not matching', email:''})
    }

  }catch(error){

    res.render('register',{title :'Error in code', password:'', email:''})
  }
})

// signin
Router.post('/login',(req,res)=>{
  const {
    email,
    password
  } = req.body;

  homeSchema.findOne({email:email},(err, result)=>{
    console.log(result)
    // if(email === result.email && password === result.password){
    //   res.render('chat', {name: result.name})
    // }else{
    //   console.log(err)
    // }
  })
}) 

module.exports = Router;