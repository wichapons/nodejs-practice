const express = require('express');
const path = require('path');
const defaultRoute = require('./routes/default');
const shopRoute = require('./routes/shop');

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs'); // setting the view engine to ejs
app.use(express.urlencoded({extended:false}));
app.use(express.static('public')); //make html can access static file like css and js

app.use('/',defaultRoute);  //this app.use command will filter only the link starting with '/' so it  will active for all incoming request
app.use('/',shopRoute);  

app.use((req,res)=>{  //for handling wrong link
    res.status(404);
    res.render('404')
});

app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500)
    res.render('500');
})

app.listen(3000);