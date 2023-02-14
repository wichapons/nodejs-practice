const express = require('express');
const path = require('path')

const app = express();

app.get('/',(req,res)=>{
    const FilePath = path.join(__dirname,'views','index.html')
       res.sendFile(FilePath)
    });

app.get('/restaurants',(req,res)=>{
    let FilePath = path.join(__dirname,'views','restaurants.html')
   res.sendFile(FilePath)
});

app.get('/recommend',(req,res)=>{
    let FilePath = path.join(__dirname,'views','recommend.html')
       res.sendFile(FilePath)
    });
app.get('/about',(req,res)=>{
    let FilePath = path.join(__dirname,'views','about.html')
       res.sendFile(FilePath)
    });
app.get('/confirm',(req,res)=>{
    let FilePath = path.join(__dirname,'views','confirm.html')
           res.sendFile(FilePath)
        });







app.listen(3000);