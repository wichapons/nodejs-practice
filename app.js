const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs'); // setting the view engine to ejs
app.use(express.urlencoded({extended:false}));
app.use(express.static('public')); //make html can access static file like css and js

app.get('/',(req,res)=>{
    res.render('index');
    });

app.get('/restaurants',(req,res)=>{
    const shopDataPath = path.join(__dirname,'data','restaurants.json');
    const fileData = fs.readFileSync(shopDataPath);
    const storedShop = JSON.parse(fileData);

    res.render('restaurants',{numerOfShop:storedShop.length,restaurants:storedShop});
});

app.get('/recommend',(req,res)=>{
    res.render('recommend');
    });

app.post('/recommend',(req,res)=>{
    const shopName = req.body; //all input details after user submit the form
    console.log(shopName);
    const shopDataPath = path.join(__dirname,'data','restaurants.json');
    const fileData = fs.readFileSync(shopDataPath);
    const storedShop = JSON.parse(fileData);
    storedShop.push(shopName);
    fs.writeFileSync(shopDataPath,JSON.stringify(storedShop))
    res.redirect('/confirm');

    /*
    for (const shopList of storedShop){
        const displayShopList = '<ul>';
        displayShopList += '<li>' + shopList + '</li>';
        
    }
    res.send(shopList)
    */

})

app.get('/about',(req,res)=>{
    res.render('about');
    });
app.get('/confirm',(req,res)=>{
    res.render('confirm');
    });



app.listen(3000);