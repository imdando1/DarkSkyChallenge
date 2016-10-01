import * as express from 'express';
import * as moment from 'moment';
const DarkSky = require('dark-sky');




let weatherRoute = express.Router();

weatherRoute.put('/', (req, res)=>{
    const forecast = new DarkSky('c2d213db2446af41f1a291c2d08d7f15');
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
    const forecast = new DarkSky('c2d213db2446af41f1a291c2d08d7f15');
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
