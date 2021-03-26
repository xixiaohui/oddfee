import { isReachToBottom, isMobile, loadCatagoriesTag } from './global.js';


let startLoading = true;

window.onscroll = function() {
    if (startLoading && isReachToBottom()) {
        console.log("已经到最底部了!");
        // alert("已经到最底部了!");


        if (isMobile()) {
            //不可以加载
            startLoading = false;
            //显示loading
            document.getElementById('loading').setAttribute("style", "visibility:visible");
            // alert("添加数据");
            addLoadingData();
        }
    }
};

window.onload = function() {

    const keyword = window.location.href.split('=')[1];
    console.log(keyword);
    let randomPhotoes = false;
    if (typeof(keyword) == "undefined") {
        randomPhotoes = true;
        console.log("random photo");
    }

    //加载session storage 存储的数据
    //在首页把页面加载的铃声全部在手机加载的时候加入到页面中
    let sessionStoragePhotoes = window.sessionStorage.getItem('photoes');

    //只有在随机的时候才把内容插入记录
    if (sessionStoragePhotoes != null && randomPhotoes) {

        let results = JSON.parse(sessionStoragePhotoes);
        // console.log(results);
        allPhotos = results;

        //把sessionStorage里存的铃声对象全部插入到页面
        insertPhotoesDatatToHtml(allPhotos, randomPhotoes);
    }
}


//存储当前的页数
let currentPage = parseInt(window.sessionStorage.getItem('currentPhotoPage'));
if (!currentPage) {
    console.log("currentPage is not saved.");
    currentPage = 1;
} else {
    console.log("currentPage is saved.");
    console.log(typeof(currentPage));
}

//存储当前页面已经加载的数据
let allPhotos = [];

//处理待保存的铃声
function adjustPhotoDataToSessionStorage(photoes) {

    for (let index = 0; index < photoes.length; index++) {
        const element = photoes[index];

        allPhotos.push(element);
    }
}


//手机上加载更多图片
function addLoadingData() {

    // console.log("Bottom.");
    const http = new XMLHttpRequest();

    // console.log(currentPage);

    const keyword = window.location.href.split('=')[1];

    console.log(keyword);

    let randomPhotoes = false;
    if (typeof(keyword) == "undefined") {
        randomPhotoes = true;
        console.log("random photo");
    }

    //存入session
    window.sessionStorage.setItem('currentPhotoPage', currentPage);

    const requestUrl = `/photoes/data?query=${keyword}&page=` + currentPage.toString();

    console.log(requestUrl);
    http.open("GET", requestUrl);

    http.send();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // alert("获取数据成功");
            const results = JSON.parse(http.responseText);
            // console.log(results);

            //把results各项保存到allPhotoes
            adjustPhotoDataToSessionStorage(results)

            //把allPhotoes保存到sessionStorage
            window.sessionStorage.setItem('photoes', JSON.stringify(allPhotos));

            //增加当前页
            currentPage += 1;
            //插入加载的图片到页面
            insertPhotoesDatatToHtml(results, randomPhotoes);

            //结束显示loading
            document.getElementById('loading').setAttribute("style", "visibility:hidden");

            //允许加载
            startLoading = true;
        }
    }
}

//区别手机和PC 插入从后端加载的数据
function insertPhotoesDatatToHtml(results, isRandom) {
    //把数据添加到页面上去 只有移动端插入数据
    if (isMobile()) {
        // window.location.href="移动端url";
        // alert("mobile");
        insertArrayPhotoes(results, isRandom);
    } else {
        // alert("pc")
    }
}

//插入一组图片
function insertArrayPhotoes(photoes, isRandom) {

    for (let index = 0; index < photoes.length; index++) {
        const element = photoes[index];

        if (isRandom) {
            insertOneRandomPhoto(element);
        } else {
            insertOnePhoto(element);
        }

    }
}

//插入一个图片(没有关键字的)
function insertOneRandomPhoto(photo) {

    let photo_list = document.querySelector('#photolist');
    let des = photo.description;
    if (des === null || typeof(des) == "undefined") {
        des = ""
    }
    let popContent = [
        `<div class="col-sm-6">`,
        `<div class="card">`,
        `<img src="${photo.urls.small}" class="card-img-top" alt="${ photo.alt_description }">`,
        `<div class="card-body">`,
        `<p class="card-text">Photo by`,
        `<a href="https://unsplash.com/@${ photo.user.username }?utm_source=oddfee&utm_medium=referral">`,
        `${ photo.user.name }`,
        `</a> on <a href="https://unsplash.com/?utm_source=oddfee&utm_medium=referral">Unsplash</a>`,
        `</p>`,
        `<div class="card-title">`,
        `<span class="myphotoinfo">`,
        `${ photo.views } views <img src="/lib/bootstrap-icons/icons/eye.svg" alt="" width="14" height="14" title="view photo">`,
        `</span>`,
        `<span class="myphotoinfo">`,
        `${ photo.downloads } <img src="/lib/bootstrap-icons/icons/cloud-arrow-down.svg" alt="" width="14" height="14" title="download photo">`,
        `</span>`,
        `<span class="myphotoinfo">`,
        `${ photo.likes } likes <img src="/lib/bootstrap-icons/icons/heart-fill.svg" alt="" width="14" height="14" title="like photo">`,
        `</span>`,
        `</div>`,
        `<p class="card-text">`,
        `${des }`,
        `</p>`,
        `<a href="/photoes/download?arg=${photo.links.download_location }"><h5 class="card-title text-primary">Download `,
        `<img src='/lib/bootstrap-icons/icons/cloud-arrow-down.svg' alt="" width="12" height="12" title="find photo"></h5>`,
        `</a>`,
        `</div>`,
        `</div>`,
        `</div>`,
    ].join('');

    photo_list.innerHTML += popContent;
}

//插入一个图片(有关键字的)
function insertOnePhoto(photo) {

    let photo_list = document.querySelector('#photolist');
    let des = photo.description
    if (des === null) {
        des = ""
    }

    let popContent = [
        `<div class="col-sm-6">`,
        `<div class="card">`,
        `<img src="${photo.urls.small}" class="card-img-top" alt="${photo.alt_description}">`,
        `<div class="card-body">`,
        `<p class="card-text">Photo by`,
        `<a href="https://unsplash.com/@${ photo.user.username }?utm_source=oddfee&utm_medium=referral">`,
        `${ photo.user.name }`,
        `</a> on <a href="https://unsplash.com/?utm_source=oddfee&utm_medium=referral">Unsplash</a>`,
        `</p>`,
        `<h5 class="card-title">`,
        `${photo.likes} likes <img src="/lib/bootstrap-icons/icons/heart-fill.svg" alt="" width="14" height="14" title="like photo">`,
        `</h5>`,
        `<p class="card-text">`,
        `${des}`,
        `</p>`,
        `<a href="/photoes/download?arg=${photo.links.download_location}"><h5 class="card-title text-primary">Download `,
        `<img src='/lib/bootstrap-icons/icons/cloud-arrow-down.svg' alt="" width="12" height="12" title="find photo"></h5>`,
        `</a>`,
        `</div>`,
        `</div>`,
        `</div>`
    ].join('');

    photo_list.innerHTML += popContent;
}