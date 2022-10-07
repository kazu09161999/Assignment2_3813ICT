const express = require('express');
const Router = express.Router();

Router.get('/register',(err, res)=>{
  res.render('register',{title :'Fill Form'})
})

module.exports = Router;