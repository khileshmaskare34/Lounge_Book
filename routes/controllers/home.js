
var express = require('express');
var router = express.Router();

const loungeRegistration = require("../../module/loungeModelSchema");




const hoohome =    async function(req, res, next) {
    let loungess = await loungeRegistration.find();
    let station = [];
    for(let i=0;i<loungess.length;i++){
      let station1 = loungess[i].stationLocation
      station.push(station1); 
    }
    console.log(station);
  
    res.render('index', {station});
  };

  module.exports={
home:hoohome
}