const http = require('https');
const querystring = require('querystring')

//随机获取一张照片
//https://api.unsplash.com/photos/random?client_id=N_KJgUFKI94Gadt6yOoT1yzvJxv2YxzlJrNN-IGwpc0
exports.photos = (req, res) => {


    const getData = querystring.stringify({
        'count': 30,
        'client_id': 'N_KJgUFKI94Gadt6yOoT1yzvJxv2YxzlJrNN-IGwpc0'
    })

    const url = `https://api.unsplash.com/photos/random?${getData}`;

    console.log(url);

    // let url = "https://api.unsplash.com/photos/random?client_id=N_KJgUFKI94Gadt6yOoT1yzvJxv2YxzlJrNN-IGwpc0";

    getUnsplashData(res, url);

    // res.render('photos', {});
}

function getUnsplashData(myres, url) {
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

                myres.render('photos', { datas: parsedData });
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}