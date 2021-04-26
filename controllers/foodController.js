const fs = require('fs');
const http = require('https');


//获取当前食谱
exports.foodToday = (req, res) => {
    let rawdata = fs.readFileSync('./public/menu/day1.json');
    let todayMenu = JSON.parse(rawdata);
    // console.log(todayMenu);


    res.send(todayMenu);
}

//登录
exports.login = (req, myres) => {
    let js_code = req.query.code;
    const getData = querystring.stringify({
        'appid': 'wx6a37da79d109ef5e',
        'secret': '08b722d4805d613ffc88960d1f2257b2',
        'js_code': js_code,
        'grant_type': 'authorization_code'

    })

    const url = `https://api.weixin.qq.com/sns/jscode2session?${getData}`;

    http.get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        // Any 2xx status code signals a successful response but
        // here we're only checking for 200.
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                // console.log(parsedData);

                myres.send(parsedData)
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}