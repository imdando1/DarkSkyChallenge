"use strict";
var express = require('express');
var apiKeyRoute = express.Router();
apiKeyRoute.get('/darkskykey', getKey);
function getKey(req, res, next) {
    var darkskyKey = process.env.DARKSKY_KEY;
    if (!darkskyKey)
        res.sendStatus(404);
    res.send(darkskyKey);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = apiKeyRoute;
