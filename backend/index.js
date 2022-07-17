const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const port = 3000
app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://127.0.0.1:8080'
}));

let pots = 6;
let money = 0;
let inshoregood = 3
let inshorebad=5;
let offshoregood=5
var tomorrow = new Date('03/01/2015');

app.post('/', (req, res) => {
    tomorrow.setDate(tomorrow.getDate()+1);
    console.log(req.body)
    const input = req.body;
    let randWeather = Math.floor(Math.random() * 6) + 1;
    if(tomorrow.getDay() === 6) {
        tomorrow.setDate(tomorrow.getDate()+2);
        money = money - 80;
    }
    let weather = "good";
    let inshoretotal = 0;
    let offshoretotal = 0;
    if (randWeather === 6) {
        weather = "bad";
        inshoretotal = +input.inshore * inshorebad;
        pots = pots - +input.offshore;

    } else {
        inshoretotal = +input.inshore * +inshoregood;
        offshoretotal = +input.offshore * +offshoregood;
    }

    const costofadditionalpots = +input.additionalpots * 6;

    money = money + inshoretotal + offshoretotal - costofadditionalpots;
    pots = pots + +input.additionalpots;
    result = {
        money,
        pots,
        randWeather,
        weather,
        day: tomorrow.toLocaleString(
            'default', {weekday: 'long'}
          )
    };
    console.log(result)
    res.json(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})