import * as express from 'express';
import * as moment from 'moment';

const DarkSky = require('dark-sky');
const forecast = new DarkSky('c2d213db2446af41f1a291c2d08d7f15');


let weatherRoute = express.Router();

weatherRoute.get('/', (req, res)=>{
    let date = moment(new Date()).format('YYYYMMDD');
    console.log(date);
    forecast
        .latitude('47.3601')
        .longitude('-122.0589')
        .units('auto')
        .language('en')
        .exclude('minutely, daily')
        .time(date)
        .get()
        .then((data)=>{
            console.log(data);
            res.json(data);
        })
        .catch((err)=>{
            console.log(err);
            res.json(err);
        });
});



export default weatherRoute;
