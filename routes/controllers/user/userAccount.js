// var express = require('express');
const users = require('../../../module/users');
const loungeOrders = require('./../../../module/LoungeOrders');

const get_user_account = async function (req, res, next) {
    try {
        let email = req.cookies.user_email;
        let user = await users.findOne({ email: email });

        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }

        let orders = await loungeOrders.find({ userId: user._id })
        console.log("Orders: ", orders);

        res.render('userAccountPage', { user, orders });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    account: get_user_account
}
