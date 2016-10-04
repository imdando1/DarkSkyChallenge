import * as express from 'express';
import * as moment from 'moment';
const DarkSky = require('dark-sky');

const DARKSKY_KEY = process.env.DARKSKY_KEY || 'c2d213db2446af41f1a291c2d08d7f15';

let weatherRoute = express.Router();

weatherRoute.put('/', (req, res)=>{
    const forecast = new DarkSky(DARKSKY_KEY);
    forecast
        .latitude(req.body.latitude)
        .longitude(req.body.longitude)
        .units('auto')
        .language('en')
        .exclude('flags')
        .get()
        .then((data)=>{

            res.json(data.daily);
        })
        .catch((err)=>{
            res.json(err);
        });
});

weatherRoute.post('/', (req, res)=>{
    const forecast = new DarkSky(DARKSKY_KEY);
    console.log(req);

    let date = moment(new Date()).format('YYYYMMDD');
    forecast
        .latitude(req.body.latitude)
        .longitude(req.body.longitude)
        .units('auto')
        .language('en')
        .exclude('minutely, flags')
        .time(date)
        .get()
        .then((data)=>{
            res.json(data);
        })
        .catch((err)=>{
            res.json(err);
        });
});





export default weatherRoute;
