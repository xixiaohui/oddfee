const http = require('https');
const querystring = require('querystring')


const client_id = '6DeTp_SKWfb8fHBiX8gx-XBdkXxKqWNcjus0GuN2AKg';

//随机获取一张照片
//https://api.unsplash.com/photos/random?client_id=N_KJgUFKI94Gadt6yOoT1yzvJxv2YxzlJrNN-IGwpc0
exports.photos = (req, res) => {

    getUnsplashRandomPhotos(res);

}

function getUnsplashRandomPhotos(res) {
    const getData = querystring.stringify({
        'count': 30,
        'client_id': client_id
    })

    const url = `https://api.unsplash.com/photos/random?${getData}`;

    getUnsplashData(res, url);
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


//搜索商品
exports.photoSearch = (req, res) => {

    let keyword = req.query.query;
    // console.log(keyword);
    let page = req.query.page;

    getPhotoesByKeyWord(res, keyword, page);
}

//根据关键词搜索图片
function getPhotoesByKeyWord(res, keyword, page) {

    //默认没有搜索，没有关键词使用随机图片数据
    if (!keyword) {
        const getData = querystring.stringify({
            'count': 10,
            'client_id': client_id
        })

        const url = `https://api.unsplash.com/photos/random?${getData}`;

        getUnsplashSearchData(res, url, "");
        return;
    }
    //有了关键词，就默认第一页
    if (!page) {
        page = 1;
    }
    const getData = querystring.stringify({
        'query': keyword,
        'page': page,
        'per_page': '10',
        'client_id': client_id
    })

    const url = `https://api.unsplash.com/search/photos?${getData}`;

    getUnsplashSearchData(res, url, keyword);
}


function getUnsplashSearchData(myres, url, keyword) {
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
                if (keyword) {
                    myres.render('photo_search', { title: keyword, total: parsedData.total, datas: parsedData.results });
                } else {
                    myres.render('photo_search', { title: keyword, total: parsedData.total, datas: parsedData });
                }

            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}

//加载下一页图片数据
exports.photo_load_one_page = (req, res) => {

    const page = req.query.page;

    const keyword = req.query.query;

    console.log("page = " + page);
    console.log("keyword = " + keyword);


    if (keyword != "undefined") {
        console.log("have keyword");
        sendPhotoesData(req, res, keyword);
    } else {
        console.log("no keyword");
        sendPhotoesDataNoKeyword(req, res);
    }

}

//有关键词的搜索
function sendPhotoesData(req, myres, keyword) {
    let currentPage = 1;

    if (req.query.page == undefined) {
        currentPage = 1;
    } else {
        currentPage = parseInt(req.query.page) + 1;
        // console.log(currentPage);
    }

    const getData = querystring.stringify({
        'query': keyword.toString(),
        'page': currentPage.toString(),
        'per_page': '10',
        'client_id': client_id
    });

    // console.log(getData);

    const url = `https://api.unsplash.com/search/photos?${getData}`;

    // console.log(url);

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

                myres.send(parsedData.results);

            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });

}

//没有关键词的分页数据
function sendPhotoesDataNoKeyword(req, myres) {

    const getData = querystring.stringify({
        'count': 20,
        'client_id': client_id
    })

    const url = `https://api.unsplash.com/photos/random?${getData}`;

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

                myres.send(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });

}