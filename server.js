const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port= process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname + '/views/partial');
app.set('View Engine', 'hbs')
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
next();
});

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

app.get('/',(req, res)=>{
  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name:'Deepak',
  //   likes:[
  //     'biking',
  //     'cities'
  //   ]
  // });
  res.render('home.hbs',{
    pageTitle:'Home Page',

  });
});

app.get('/about',(req,res)=>{
  // res.send("About Page");
  res.render('about.hbs',{
    pageTitle:'About Page',

  });
});

app.get('/bad',(req,res)=>{
  res.send({
    ErrorMEssage: 'somethinf=g went wrong'
  });
});
app.listen(port,()=>{
  console.log(`Server is started on port ${port}`);
});
