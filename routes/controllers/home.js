var express = require('express');
var router = express.Router();

const loungeRegistration = require("../../module/loungeModelSchema");

const hoohome = async function(req, res, next) {
    try {
        let loungess = await loungeRegistration.find();
        let station = [];
        for (let i = 0; i < loungess.length; i++) {
            let station1 = loungess[i].stationLocation;
            station.push(station1);
        }
        console.log(station);

        res.render('index', { station });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
};

module.exports = {
    home: hoohome
};
