const Ringtone = require('../models/Ringtone')

exports.ringtone_list = (req, res) => {
    console.log('ringtone_list');

    Ringtone.countDocuments({}, (err, count) => {

        console.log(count);
        getData(req, res, count);
    })


};

function getData(req, res, count) {

    let currentPage = 0;

    if (req.query.page == undefined) {
        currentPage = 0;
    } else {
        currentPage = req.query.page - 1;
        console.log(req.query.page);
    }


    const limit = 10;
    const onePageCount = 10;
    const allpages = Math.floor(count / onePageCount);

    console.log('allpages= ' + allpages);

    Ringtone.find()
        .sort([
            ['title', 'ascending']
        ])
        .skip(onePageCount * currentPage)
        .limit(limit)
        .exec(function(err, list_ringtones) {
            if (err) { return next(err); }

            // console.log(list_ringtones);

            res.render('ringtone_list', {
                title: 'Ringtone List',
                ringtones: list_ringtones,
                currentPage: currentPage + 1,
                allpages: allpages
            })
        });
};

exports.ringtone_description = (req, res) => {
    console.log('ringtone_description');

    let rintoneID = req.query.id;
    console.log(rintoneID);
    console.log(typeof(rintoneID));

    Ringtone.find({ '_id': rintoneID })
        .exec(function(err, ringtones) {
            if (err) { return next(err); }

            console.log(ringtones);

            res.render("ringtone_des", { title: 'Welcome to ringtone description page.', ringtone: ringtones[0] });
        });

}