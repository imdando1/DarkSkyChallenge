"use strict";
var express = require('express');
var moment = require('moment');
var DarkSky = require('dark-sky');
var forecast = new DarkSky('c2d213db2446af41f1a291c2d08d7f15');
var weatherRoute = express.Router();
weatherRoute.get('/', function (req, res) {
    var date = moment(new Date()).format('YYYYMMDD');
    console.log(date);
    forecast
        .latitude('47.3601')
        .longitude('-122.0589')
        .units('auto')
        .language('en')
        .exclude('minutely, daily')
        .time(date)
        .get()
        .then(function (data) {
        console.log(data);
        res.json(data);
    })
        .catch(function (err) {
        console.log(err);
        res.json(err);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = weatherRoute;
