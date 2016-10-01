"use strict";
var express = require('express');
var moment = require('moment');
var DarkSky = require('dark-sky');
var weatherRoute = express.Router();
weatherRoute.put('/', function (req, res) {
    var forecast = new DarkSky('c2d213db2446af41f1a291c2d08d7f15');
    forecast
        .latitude(req.body.latitude)
        .longitude(req.body.longitude)
        .units('auto')
        .language('en')
        .exclude('flags')
        .get()
        .then(function (data) {
        res.json(data.daily);
    })
        .catch(function (err) {
        res.json(err);
    });
});
weatherRoute.post('/', function (req, res) {
    var forecast = new DarkSky('c2d213db2446af41f1a291c2d08d7f15');
    console.log(req);
    var date = moment(new Date()).format('YYYYMMDD');
    forecast
        .latitude(req.body.latitude)
        .longitude(req.body.longitude)
        .units('auto')
        .language('en')
        .exclude('minutely, flags')
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
