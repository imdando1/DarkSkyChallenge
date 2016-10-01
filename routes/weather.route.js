"use strict";
var express = require('express');
var moment = require('moment');
var DarkSky = require('dark-sky');
var forecast = new DarkSky('c2d213db2446af41f1a291c2d08d7f15');
var weatherRoute = express.Router();
weatherRoute.post('/', function (req, res) {
    console.log(req);
    var date = moment(new Date()).format('YYYYMMDD');
    forecast
        .latitude(req.body.latitude)
        .longitude(req.body.longitude)
        .units('auto')
        .language('en')
        .exclude('minutely, daily')
        .time(date)
        .get()
        .then(function (data) {
        res.json(data);
    })
        .catch(function (err) {
        res.json(err);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = weatherRoute;
