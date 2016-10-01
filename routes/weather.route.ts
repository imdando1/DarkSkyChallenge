import * as express from 'express';
import * as moment from 'moment';

const DarkSky = require('dark-sky');
const forecast = new DarkSky('c2d213db2446af41f1a291c2d08d7f15');


let weatherRoute = express.Router();

weatherRoute.post('/', (req, res)=>{
    console.log(req);

    let date = moment(new Date()).format('YYYYMMDD');
    forecast
        .latitude(req.body.latitude)
        .longitude(req.body.longitude)
        .units('auto')
        .language('en')
        .exclude('minutely')
        .time(date)
        .get()
        .then((data)=>{
            res.json(data);
        })
        .catch((err)=>{
            res.json(err);
        });
});

weatherRoute.post('/:weekly', (req, res)=>{

});



export default weatherRoute;
