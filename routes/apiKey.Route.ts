import * as express from 'express';

let apiKeyRoute = express.Router();

apiKeyRoute.get('/darkskykey', getKey)


function getKey(req, res, next){
    let darkskyKey = process.env.DARKSKY_KEY;
    if(!darkskyKey) res.sendStatus(404);
    res.send(darkskyKey);
}

export default apiKeyRoute;
