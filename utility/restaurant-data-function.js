const path = require('path');
const fs = require('fs');

const shopDataPath = path.join(__dirname,'..','data','restaurants.json');

function getShopeData(){
    const fileData = fs.readFileSync(shopDataPath);
    const storedShop = JSON.parse(fileData);
    return storedShop;
};

function addShop(shopData){
    fs.writeFileSync(shopDataPath,JSON.stringify(shopData));
};

module.exports = {
    getShopeData:getShopeData,
    addShop:addShop
};
