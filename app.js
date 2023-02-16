const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid')


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

app.get('/restaurants/:id',(req,res)=>{
    const shopID = req.params.id;
    const shopDataPath = path.join(__dirname,'data','restaurants.json');
    const fileData = fs.readFileSync(shopDataPath);
    const storedShop = JSON.parse(fileData);

    for (const shop of storedShop){
        if(shop.id === shopID){
           return res.render('restaurants-details',{restaurant:shop}); //use return for tell program to stop looping for more cuz we already found the result
        }else{
        }}
        console.log("check shop.id");
        res.status(404);
        return res.render('404');
});

app.get('/recommend',(req,res)=>{
    res.render('recommend');
    });

app.post('/recommend',(req,res)=>{
    const shopName = req.body; //all input details after user submit the form as an object
    shopName.id = uuid.v4();  // shopName.id // in javascipt if we access to the new property that's not in the object yet JS will create for you unlike the other programming lang
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

app.use((req,res)=>{  //for handling wrong link
    res.status(404);
    res.render('404')
});

app.use((error,req,res,next)=>{
    res.status(500)
    res.render('500');
})

app.listen(3000);