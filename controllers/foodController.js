const fs = require('fs');



//获取当前食谱
exports.foodToday = (req, res) => {
    let rawdata = fs.readFileSync('./public/menu/day1.json');
    let todayMenu = JSON.parse(rawdata);
    // console.log(todayMenu);


    res.send(todayMenu);
}