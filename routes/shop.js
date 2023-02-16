const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid')
const storeShopData = require("../utility/restaurant-data-function");
const router = express.Router();

router.get('/restaurants',(req,res)=>{
    let shopOrder = req.query.order;
    let nextOrder ='descending'
    if (shopOrder !== 'ascending'&& shopOrder !== 'descending'){
        shopOrder === 'ascending';
    };
    if (shopOrder==='descending'){
        nextOrder = 'ascending';
    };

    const storedShop = storeShopData.getShopeData();
    storedShop.sort((shopA,shopB)=>{
        if((shopOrder ==='ascending' && shopA.name>shopB.name)){
            return 1;
        } else if (shopA.name<shopB.name && shopOrder === 'descending') {
            return -1;
        }
    });
    
    res.render('restaurants',{numerOfShop:storedShop.length,
        restaurants:storedShop,
        nextOrder:nextOrder});
});

router.get('/restaurants/:id',(req,res)=>{
    const shopID = req.params.id;
    const storedShop = storeShopData.getShopeData();

    for (const shop of storedShop){
        if(shop.id === shopID){
           return res.render('restaurants-details',{restaurant:shop}); //use return for tell program to stop looping for more cuz we already found the result
        }else{
        }}
        console.log("check shop.id");
        res.status(404);
        return res.render('404');
});

router.post('/recommend',(req,res)=>{
    const shopData = req.body; //all input details after user submit the form as an object
    shopData.id = uuid.v4();  // shopName.id // in javascipt if we access to the new property that's not in the object yet JS will create for you unlike the other programming lang
    console.log('hello world');
    const   storedShop = storeShopData.getShopeData();
            storedShop.push(shopData);
            storeShopData.addShop(storedShop);
            res.redirect('/confirm');
        });
    /*
    const shopDataP ath = path.join(__dirname,'data','restaurants.json');
    const fileData = fs.readFileSync(shopDataPath);
    const storedShop = JSON.parse(fileData);
    storedShop.push(shopName);
    fs.writeFileSync(shopDataPath,JSON.stringify(storedShop));

    /*
    for (const shopList of storedShop){
        const displayShopList = '<ul>';
        displayShopList += '<li>' + shopList + '</li>';
        
    }
    res.send(shopList)
    */
module.exports = router;