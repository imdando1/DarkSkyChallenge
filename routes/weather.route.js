"use strict";
var express = require('express');
var moment = require('moment');
var DarkSky = require('dark-sky');
var DARKSKY_KEY = process.env.DARKSKY_KEY;
var weatherRoute = express.Router();
weatherRoute.put('/', function (req, res) {
    var forecast = new DarkSky(DARKSKY_KEY);
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
    var forecast = new DarkSky(DARKSKY_KEY);
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
