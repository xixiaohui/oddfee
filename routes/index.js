var express = require('express');
let MongoClient = require('mongodb').MongoClient;

let url = "mongodb://boss:ivy,123456@8.136.154.237:27017/admin?authSource=admin&w=1";

var router = express.Router();


const ringtones = [

    {
        "title": "Airtel Kannada 2020",
        "des": "Airtel ringtone",
        "url": "https://www.tonesmp3.com/ringtones/airtel-kannada-2020.mp3"
    },
    {
        "title": "Airtel 4g Tone",
        "des": "Airtel ringtone",
        "url": "https://www.tonesmp3.com/ringtones/airtel-4g-tone.mp3"
    },
    {
        "title": "Airtel Caller Tune",
        "des": "Airtel ringtone",
        "url": "https://www.tonesmp3.com/ringtones/airtel-caller-tune.mp3"
    },
    {
        "title": "Best Romantic Airtel",
        "des": "Airtel ringtone",
        "url": "https://www.tonesmp3.com/ringtones/best-romantic-airtel.mp3"
    },
];


function getDataFromMongodb(res) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("oddfee");
        dbo.collection("Ringtone").find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;

            // console.log(result);

            res.render('index', { title: 'Express', data: result });

            db.close();
        });
    });
};


/* GET home page. */
router.get('/', function(req, res, next) {

    // getDataFromMongodb(res);
    res.render('index', {});
    // res.redirect('/ringtone');
});
// getDataFromMongodb();

router.get('/searching', function(req, res) {

    console.log('/searching');

    res.send("WHEEE");
});



module.exports = router;